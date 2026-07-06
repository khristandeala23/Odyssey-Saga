/**
 * ============================================================
 * ODYSSEY SAGA RPG ENGINE
 * File: js/skills.js
 * Version: 0.1.0
 *
 * Skill engine (logic only)
 * ============================================================
 */

"use strict";

import { randomInt, chance } from "./core.js";

/*==========================================================
    SKILL TYPES
==========================================================*/

export const SkillType = Object.freeze({

    DAMAGE: "damage",

    HEAL: "heal",

    BUFF: "buff",

    DEBUFF: "debuff",

    UTILITY: "utility"

});

/*==========================================================
    TARGET TYPES
==========================================================*/

export const TargetType = Object.freeze({

    SELF: "self",

    ENEMY: "enemy",

    ALL_ENEMY: "all_enemy",

    ALL_ALLY: "all_ally"

});

/*==========================================================
    SKILL CLASS
==========================================================*/

export class Skill {

    constructor(data = {}) {

        this.key = data.key ?? "";

        this.name = data.name ?? "Unknown Skill";

        this.description = data.description ?? "";

        this.type = data.type ?? SkillType.DAMAGE;

        this.target = data.target ?? TargetType.ENEMY;

        this.mpCost = data.mpCost ?? 0;

        this.power = data.power ?? 0;

        this.element = data.element ?? "none";

        this.critRate = data.critRate ?? 0;

        this.statusEffect = data.statusEffect ?? null;

        this.statusChance = data.statusChance ?? 0;

        this.statusDuration = data.statusDuration ?? 0;

    }

}

/*==========================================================
    DAMAGE CALCULATION
==========================================================*/

export function calculateSkillDamage(user, target, skill) {

    let base = user.magic + skill.power;

    let variance = randomInt(

        Math.floor(base * 0.85),

        Math.floor(base * 1.15)

    );

    let damage = variance - (target.defense * 0.4);

    if (damage < 1) damage = 1;

    return Math.floor(damage);

}

/*==========================================================
    USE SKILL
==========================================================*/

export function useSkill(user, target, skill) {

    if (!user || !skill) return null;

    if (user.mp < skill.mpCost) {

        return {

            success: false,

            message: "Not enough MP."

        };

    }

    user.mp -= skill.mpCost;

    let result = {

        success: true,

        damage: 0,

        healed: 0,

        statusApplied: null,

        critical: false,

        message: ""

    };

    /*==================================================
        DAMAGE SKILL
    ==================================================*/

    if (skill.type === SkillType.DAMAGE) {

        let dmg = calculateSkillDamage(user, target, skill);

        let isCrit = chance(skill.critRate);

        if (isCrit) {

            dmg = Math.floor(dmg * 1.5);

        }

        target.hp -= dmg;

        if (target.hp < 0) target.hp = 0;

        result.damage = dmg;

        result.critical = isCrit;

        result.message = `${user.name} used ${skill.name} for ${dmg} damage.`;

    }

    /*==================================================
        HEAL SKILL
    ==================================================*/

    if (skill.type === SkillType.HEAL) {

        let heal = skill.power + user.magic;

        user.hp += heal;

        if (user.hp > user.maxHP) {

            user.hp = user.maxHP;

        }

        result.healed = heal;

        result.message = `${user.name} healed ${heal} HP.`;

    }

    /*==================================================
        STATUS EFFECT
    ==================================================*/

    if (
        skill.statusEffect &&
        chance(skill.statusChance)
    ) {

        result.statusApplied = {

            type: skill.statusEffect,

            duration: skill.statusDuration

        };

    }

    return result;

}
