/**
 * ============================================================
 * ODYSSEY SAGA RPG ENGINE
 * File: js/player.js
 * Version: 0.1.0
 *
 * Player core system (stats, level, combat state)
 * ============================================================
 */

"use strict";

import { GameObject, clamp } from "./core.js";

/*==========================================================
    PLAYER CLASS
==========================================================*/

export class Player extends GameObject {

    constructor(data = {}) {

        super();

        /*==================================================
            BASIC INFO
        ==================================================*/

        this.name = data.name ?? "Hero";

        this.level = data.level ?? 1;

        this.exp = data.exp ?? 0;

        this.gold = data.gold ?? 0;

        this.className = data.className ?? "None";

        /*==================================================
            BASE STATS
        ==================================================*/

        this.baseHP = data.baseHP ?? 100;

        this.baseMP = data.baseMP ?? 30;

        this.baseAttack = data.baseAttack ?? 10;

        this.baseMagic = data.baseMagic ?? 5;

        this.baseDefense = data.baseDefense ?? 5;

        this.baseSpeed = data.baseSpeed ?? 5;

        /*==================================================
            CURRENT STATS
        ==================================================*/

        this.hp = this.baseHP;

        this.mp = this.baseMP;

        /*==================================================
            MAX STATS (UPDATED BY EQUIPMENT LATER)
        ==================================================*/

        this.maxHP = this.baseHP;

        this.maxMP = this.baseMP;

        /*==================================================
            BATTLE STATE
        ==================================================*/

        this.alive = true;

        this.defending = false;

        this.statusEffects = [];

        /*==================================================
            INVENTORY & EQUIPMENT PLACEHOLDERS
        ==================================================*/

        this.inventory = [];

        this.equipment = {

            weapon: null,

            helmet: null,

            armor: null,

            gloves: null,

            boots: null,

            accessory1: null,

            accessory2: null

        };

        /*==================================================
            SKILLS
        ==================================================*/

        this.skills = [];

    }

    /*======================================================
        LEVEL SYSTEM
    ======================================================*/

    gainExp(amount) {

        this.exp += amount;

        while (this.exp >= this.expToNextLevel()) {

            this.exp -= this.expToNextLevel();

            this.levelUp();

        }

    }

    expToNextLevel() {

        return Math.floor(100 * Math.pow(this.level, 1.5));

    }

    levelUp() {

        this.level++;

        this.baseHP += 15;

        this.baseMP += 5;

        this.baseAttack += 3;

        this.baseMagic += 2;

        this.baseDefense += 2;

        this.baseSpeed += 1;

        this.hp = this.maxHP = this.baseHP;

        this.mp = this.maxMP = this.baseMP;

        console.log(`${this.name} reached level ${this.level}!`);

    }

    /*======================================================
        DAMAGE SYSTEM
    ======================================================*/

    takeDamage(amount) {

        let dmg = amount;

        if (this.defending) {

            dmg = Math.floor(dmg * 0.6);

        }

        this.hp = clamp(this.hp - dmg, 0, this.maxHP);

        if (this.hp <= 0) {

            this.alive = false;

        }

        return dmg;

    }

    heal(amount) {

        this.hp = clamp(this.hp + amount, 0, this.maxHP);

    }

    restoreMP(amount) {

        this.mp = clamp(this.mp + amount, 0, this.maxMP);

    }

    /*======================================================
        COMBAT HELPERS
    ======================================================*/

    isAlive() {

        return this.hp > 0;

    }

    resetBattleState() {

        this.defending = false;

        this.statusEffects = [];

    }
    /*======================================================
    CLASS SYSTEM
======================================================*/

setClass(className) {

    this.className = className;

    switch (className.toLowerCase()) {

        case "assassin":

            this.baseHP = 90;
            this.baseMP = 40;
            this.baseAttack = 14;
            this.baseMagic = 6;
            this.baseDefense = 4;
            this.baseSpeed = 12;

            this.skills = ["backstab", "poison_strike"];

            break;

        case "mage":

            this.baseHP = 75;
            this.baseMP = 80;
            this.baseAttack = 4;
            this.baseMagic = 16;
            this.baseDefense = 3;
            this.baseSpeed = 7;

            this.skills = ["fireball", "ice_spike"];

            break;

        case "tank":

            this.baseHP = 150;
            this.baseMP = 20;
            this.baseAttack = 10;
            this.baseMagic = 2;
            this.baseDefense = 12;
            this.baseSpeed = 3;

            this.skills = ["shield_bash", "taunt"];

            break;

        default:

            return;

    }

    this.maxHP = this.baseHP;
    this.maxMP = this.baseMP;

    this.hp = this.maxHP;
    this.mp = this.maxMP;
    this.attack = this.baseAttack;
    this.magic = this.baseMagic;
    this.defense = this.baseDefense;
    this.speed = this.baseSpeed;

    console.log(`Class changed to ${this.className}`);

}

}