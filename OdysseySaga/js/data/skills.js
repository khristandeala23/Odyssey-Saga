/**
 * ============================================================
 * ODYSSEY SAGA RPG
 * DATA FILE: skills.js
 *
 * Pure skill definitions (no logic).
 * ============================================================
 */

import { SkillType, TargetType } from "../skills.js";

export const SKILL_DATA = {

    /*==========================================================
        BASIC PHYSICAL SKILLS
    ==========================================================*/

    slash: {
        key: "slash",
        name: "Slash",
        description: "A basic sword attack dealing physical damage.",
        type: SkillType.DAMAGE,
        target: TargetType.ENEMY,

        mpCost: 0,
        power: 8,
        element: "none",

        critRate: 0.05
    },

    power_strike: {
        key: "power_strike",
        name: "Power Strike",
        description: "A strong attack that deals heavy damage.",
        type: SkillType.DAMAGE,
        target: TargetType.ENEMY,

        mpCost: 5,
        power: 18,
        element: "none",

        critRate: 0.10
    },

    /*==========================================================
        MAGIC SKILLS
    ==========================================================*/

    fireball: {
        key: "fireball",
        name: "Fireball",
        description: "Launches a fireball at the enemy.",
        type: SkillType.DAMAGE,
        target: TargetType.ENEMY,

        mpCost: 8,
        power: 22,
        element: "fire",

        critRate: 0.08,

        statusEffect: "burn",
        statusChance: 0.25,
        statusDuration: 3
    },

    ice_shard: {
        key: "ice_shard",
        name: "Ice Shard",
        description: "A sharp ice attack that may freeze the enemy.",
        type: SkillType.DAMAGE,
        target: TargetType.ENEMY,

        mpCost: 10,
        power: 20,
        element: "water",

        critRate: 0.07,

        statusEffect: "freeze",
        statusChance: 0.20,
        statusDuration: 2
    },

    /*==========================================================
        HEALING SKILLS
    ==========================================================*/

    heal: {
        key: "heal",
        name: "Heal",
        description: "Restores HP to an ally.",
        type: SkillType.HEAL,
        target: TargetType.SELF,

        mpCost: 12,
        power: 25,
        element: "light"
    },

    greater_heal: {
        key: "greater_heal",
        name: "Greater Heal",
        description: "Powerful healing magic.",
        type: SkillType.HEAL,
        target: TargetType.SELF,

        mpCost: 25,
        power: 60,
        element: "light"
    },

    /*==========================================================
        DEBUFF SKILLS
    ==========================================================*/

    poison_stab: {
        key: "poison_stab",
        name: "Poison Stab",
        description: "A dagger attack that poisons the enemy.",
        type: SkillType.DAMAGE,
        target: TargetType.ENEMY,

        mpCost: 6,
        power: 14,
        element: "dark",

        critRate: 0.06,

        statusEffect: "poison",
        statusChance: 0.40,
        statusDuration: 4
    }

};