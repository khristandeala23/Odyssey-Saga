/**
 * ============================================================
 * ODYSSEY SAGA RPG ENGINE
 * File: js/world.js
 * Version: 0.1.0
 *
 * World system (movement, maps, encounters)
 * ============================================================
 */

"use strict";

import { randomInt, chance } from "./core.js";
import { Game } from "./game.js";
import { Battle } from "./battle.js";
import { UI } from "./ui.js";
import { createSlime, createBossSlime } from "./enemies.js";

/*==========================================================
    WORLD STATE
==========================================================*/

export const World = {

    mapWidth: 10,

    mapHeight: 10,

    playerX: 5,

    playerY: 5,

    currentMap: "green_fields",

    encounterRate: 0.2

};

/*==========================================================
    MOVE PLAYER
==========================================================*/

export function movePlayer(direction) {

    if (!Game.running) return;

    switch (direction) {

        case "up":
            World.playerY = Math.max(0, World.playerY - 1);
            break;

        case "down":
            World.playerY = Math.min(World.mapHeight - 1, World.playerY + 1);
            break;

        case "left":
            World.playerX = Math.max(0, World.playerX - 1);
            break;

        case "right":
            World.playerX = Math.min(World.mapWidth - 1, World.playerX + 1);
            break;

    }

    checkEncounter();

}

/*==========================================================
    RANDOM ENCOUNTER SYSTEM
==========================================================*/

function checkEncounter() {

    if (!Game.player) return;

    if (Game.battle?.active) return;

    if (!chance(World.encounterRate)) return;

    // Boss encounter
    if (World.playerX === 9 && World.playerY === 9) {

        const boss = createBossSlime();

        Game.battle = new Battle(Game.player, boss);

        Game.battle.start();

        UI.clearLog();
        UI.log(`⚠ Boss Encounter! ${boss.name} appeared!`);

        return;
    }

    // Normal encounter
    startRandomBattle();

}

/*==========================================================
    START BATTLE FROM WORLD
==========================================================*/

function startRandomBattle() {

    const enemy = createSlime();

    Game.battle = new Battle(Game.player, enemy);

    Game.battle.start();

    UI.clearLog();
    UI.log(`A wild ${enemy.name} appeared!`);
}

/*==========================================================
    INTERACT (NPC / OBJECT HOOK)
==========================================================*/

export function interact() {

    console.log(`Player interacts at (${World.playerX}, ${World.playerY})`);

}

/*==========================================================
    WORLD UPDATE LOOP
==========================================================*/

export function updateWorld() {

    // Future expansion:
    // - NPC movement
    // - animations
    // - time system
    // - weather

}

/*==========================================================
    DEBUG TELEPORT
==========================================================*/

export function teleport(x, y) {

    World.playerX = x;

    World.playerY = y;

}

