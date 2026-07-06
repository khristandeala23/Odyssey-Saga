/**
 * ============================================================
 * ODYSSEY SAGA RPG ENGINE
 * File: js/game.js
 * Version: 1.0.0
 *
 * Main Game Controller
 * ============================================================
 */

"use strict";

/*==========================================================
    IMPORTS
==========================================================*/

import { ENGINE } from "./core.js";

import { Player } from "./player.js";
import { Inventory } from "./inventory.js";

import { Battle } from "./battle.js";
import { createSlime } from "./enemies.js";

import { loadItemDatabase } from "./items.js";
import { loadSkillDatabase } from "./skillDatabase.js";

import { UI } from "./ui.js";
import { SkillUI } from "./ui-skills.js";
import { InventoryUI } from "./ui-inventory.js";
import { MapUI } from "./map.js";

import { initControls } from "./ui-controls.js";
import { initSaveControls } from "./ui-save-controls.js";

import { loadGame } from "./save.js";

import { QuestSystem } from "./quests.js";
import { StateManager, GameState } from "./state.js";

/*==========================================================
    GAME OBJECT
==========================================================*/

export const Game = {

    player: null,

    inventory: null,

    battle: null,

    world: {},

    running: false,

    initialized: false

};

window.Game = Game;

/*==========================================================
    INITIALIZE GAME
==========================================================*/

export function initGame() {

    if (Game.initialized) return;

    console.log(`${ENGINE.NAME} v${ENGINE.VERSION} starting...`);

    loadItemDatabase();
    loadSkillDatabase();

    Game.player = new Player({

        name: "Hero"

    });

    Game.inventory = new Inventory(Game.player);

    Game.player.inventory = Game.inventory;

    QuestSystem.addQuest("slime_hunt", {

        name: "Slime Hunt",

        goal: 3,

        reward: 50

    });

    UI.refresh();

    Game.running = true;

    Game.initialized = true;

    console.log("Game initialized successfully.");

}

/*==========================================================
    CLASS SELECTION
==========================================================*/

export function chooseClass(className) {

    if (!Game.player) return;

    Game.player.setClass(className);

    UI.log(`Class selected: ${className}`);

    UI.refresh();

}

/*==========================================================
    START BATTLE
==========================================================*/

export function startBattle(enemy) {

    Game.battle = new Battle(Game.player, enemy);

    Game.battle.start();

    UI.refresh();

}

/*==========================================================
    TEST BATTLE
==========================================================*/

export function startTestBattle() {

    startBattle(createSlime());

}

/*==========================================================
    GAME LOOP
==========================================================*/

    export function gameLoop() {

    if (!Game.running) return;

    UI.refresh();

    requestAnimationFrame(gameLoop);

}

/*==========================================================
    WINDOW LOAD
==========================================================*/

    window.addEventListener("load", () => {

    UI.init();

    SkillUI.init();

    InventoryUI.init();

    MapUI.init();

    initGame();

    UI.refresh();

    initControls();

    initSaveControls();

    StateManager.set(GameState.WORLD);

    loadGame();

    gameLoop();

});