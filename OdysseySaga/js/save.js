/**
 * ============================================================
 * ODYSSEY SAGA RPG
 * File: save.js
 * Save / Load system (localStorage)
 * ============================================================
 */

"use strict";

import { Game } from "./game.js";
import { World } from "./world.js";

const SAVE_KEY = "odyssey_saga_save";

/*==========================================================
    SAVE GAME
==========================================================*/

export function saveGame() {

    const data = {

        player: {

            name: Game.player.name,

            level: Game.player.level,

            exp: Game.player.exp,

            gold: Game.player.gold,

            hp: Game.player.hp,

            mp: Game.player.mp,

            baseHP: Game.player.baseHP,

            baseMP: Game.player.baseMP,

            baseAttack: Game.player.baseAttack,

            baseMagic: Game.player.baseMagic,

            baseDefense: Game.player.baseDefense,

            baseSpeed: Game.player.baseSpeed

        },

        inventory: Array.from(Game.inventory.items.entries()),

        world: {

            x: World.playerX,

            y: World.playerY

        }

    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(data));

    console.log("Game Saved!");

}

/*==========================================================
    LOAD GAME
==========================================================*/

export function loadGame() {

    const raw = localStorage.getItem(SAVE_KEY);

    if (!raw) return false;

    const data = JSON.parse(raw);

    if (!data) return false;

    const p = Game.player;

    p.name = data.player.name;

    p.level = data.player.level;

    p.exp = data.player.exp;

    p.gold = data.player.gold;

    p.hp = data.player.hp;

    p.mp = data.player.mp;

    p.baseHP = data.player.baseHP;

    p.baseMP = data.player.baseMP;

    p.baseAttack = data.player.baseAttack;

    p.baseMagic = data.player.baseMagic;

    p.baseDefense = data.player.baseDefense;

    p.baseSpeed = data.player.baseSpeed;

    Game.inventory.items = new Map(data.inventory);

    World.playerX = data.world.x;

    World.playerY = data.world.y;

    console.log("Game Loaded!");

    return true;

}

/*==========================================================
    RESET SAVE
==========================================================*/

export function resetGame() {

    localStorage.removeItem(SAVE_KEY);

    console.log("Save Reset!");

}