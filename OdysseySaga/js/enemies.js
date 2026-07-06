/**
 * ============================================================
 * ODYSSEY SAGA RPG ENGINE
 * File: js/enemies.js
 * Version: 1.0.0
 *
 * Enemy Database
 * ============================================================
 */

"use strict";
import { chance } from "./core.js";

/*==========================================================
    ENEMY CLASS
==========================================================*/

export class Enemy {

    constructor(data = {}) {

        this.id = data.id ?? data.key ?? "";

        this.name = data.name ?? "Unknown";

        this.level = data.level ?? 1;

        this.maxHP = data.maxHP ?? 10;
        this.hp = this.maxHP;

        this.attack = data.attack ?? 1;

        this.defense = data.defense ?? 0;

        this.speed = data.speed ?? 1;

        this.expReward = data.expReward ?? 0;

        this.goldReward = data.goldReward ?? 0;

        this.loot = data.loot ?? data.lootTable ?? [];

        this.skills = data.skills ?? [];

    }

    isAlive() {

        return this.hp > 0;

    }

    takeDamage(amount) {

        this.hp = Math.max(0, this.hp - amount);

    }

}
/*==========================================================
    ENEMY DATABASE
==========================================================*/

export const EnemyDatabase = {

    slime: {

        id: "slime",

        name: "Green Slime",

        level: 1,

        maxHP: 25,

        attack: 5,

        defense: 1,

        speed: 3,

        expReward: 10,

        goldReward: 5,

        loot: [

            {
                item: "slime_gel",
                chance: 0.60
            }

        ]

    },

    wolf: {

        id: "wolf",

        name: "Wild Wolf",

        level: 2,

        maxHP: 40,

        attack: 8,

        defense: 2,

        speed: 6,

        expReward: 18,

        goldReward: 10,

        loot: [

            {
                item: "wolf_fang",
                chance: 0.40
            }

        ]

    },

    goblin: {

        id: "goblin",

        name: "Goblin",

        level: 3,

        maxHP: 60,

        attack: 12,

        defense: 4,

        speed: 5,

        expReward: 30,

        goldReward: 18,

        loot: [

            {
                item: "goblin_dagger",
                chance: 0.15
            }

        ]

    }

};

/*==========================================================
    FACTORY
==========================================================*/

export function createEnemy(id) {

    const data = EnemyDatabase[id];

    if (!data) {

        throw new Error(`Enemy '${id}' not found.`);

    }

    return new Enemy(data);

}
export function createBossSlime() {

    return new Enemy({

        key: "boss_slime",

        name: "King Slime",

        level: 5,

        maxHP: 200,

        attack: 15,

        defense: 5,

        speed: 3,

        expReward: 80,

        goldReward: 50,

        lootTable: [

            {
                key: "iron_sword",
                chance: 0.5,
                min: 1,
                max: 1
            }

        ]

    });

}
/*==========================================================
    RANDOM ENCOUNTERS
==========================================================*/

export function randomEncounter() {

    const ids = Object.keys(EnemyDatabase);

    const id = ids[Math.floor(Math.random() * ids.length)];

    return createEnemy(id);

}

/*==========================================================
    LOOT
==========================================================*/

export function generateLoot(enemy) {

    const drops = [];

    for (const loot of enemy.loot) {

        if (Math.random() <= loot.chance) {

            drops.push(loot.item);

        }

    }

    return drops;

}

/*==========================================================
    SIMPLE ENEMY AI
==========================================================*/

export function enemyChooseAction(enemy, player) {

    if (!enemy || !player) return "attack";

    // Basic AI logic (expand later)
    const hpPercent = enemy.hp / enemy.maxHP;

    // If low HP sometimes defend (future mechanic hook)
    if (hpPercent < 0.3 && chance(0.3)) {

        return "defend";

    }

    // Default attack
    return "attack";

}

/*==========================================================
    SAMPLE ENEMY BUILDER
    (temporary until data/enemies.js is added)
==========================================================*/

export function createSlime() {

    return new Enemy({

        key: "slime",

        name: "Slime",

        level: 1,

        maxHP: 30,

        attack: 4,

        defense: 1,

        speed: 2,

        expReward: 8,

        goldReward: 3,

        lootTable: [

            {

                key: "potion",

                chance: 0.25,

                min: 1,

                max: 1

            }

        ]

    });

}