/**
 * ============================================================
 * ODYSSEY SAGA RPG ENGINE
 * File: js/ui-controls.js
 * Version: 0.1.0
 *
 * UI Controls (buttons -> game actions)
 * ============================================================
 */

"use strict";

import {
    Game,
    chooseClass
} from "./game.js";
import { movePlayer } from "./world.js";
import { UI } from "./ui.js";
import { SkillUI } from "./ui-skills.js";
import { InventoryUI } from "./ui-inventory.js";
/*==========================================================
    INITIALIZE CONTROLS
==========================================================*/

export function initControls() {

    /*======================================================
    CLASS SELECTION
======================================================*/

const assassinBtn = document.getElementById("class-assassin");
const mageBtn = document.getElementById("class-mage");
const tankBtn = document.getElementById("class-tank");

assassinBtn?.addEventListener("click", () => {

    chooseClass("Assassin");

});

mageBtn?.addEventListener("click", () => {

    chooseClass("Mage");

});

tankBtn?.addEventListener("click", () => {

    chooseClass("Tank");

});
    /*======================================================
        COMBAT BUTTONS
    ======================================================*/

    const attackBtn = document.getElementById("btn-attack");

    const skillBtn = document.getElementById("btn-skill");

    const itemBtn = document.getElementById("btn-item");

    /*======================================================
        MOVEMENT BUTTONS
    ======================================================*/

    const upBtn = document.getElementById("btn-up");

    const downBtn = document.getElementById("btn-down");

    const leftBtn = document.getElementById("btn-left");

    const rightBtn = document.getElementById("btn-right");

    /*======================================================
        ATTACK ACTION
    ======================================================*/

    attackBtn?.addEventListener("click", () => {

        if (!Game.battle || !Game.battle.active) return;

        Game.battle.playerAction("attack");

        refreshUI();

    });
    

    /*======================================================
    SKILL ACTION (TEMP: uses first skill)
======================================================*/

skillBtn?.addEventListener("click", () => {

    if (!Game.battle || !Game.battle.active) return;

    SkillUI.open();

    refreshUI();

});

    /*======================================================
        ITEM ACTION (TEMP: uses potion if exists)
    ======================================================*/

    itemBtn?.addEventListener("click", () => {

    if (!Game.inventory) return;

    Game.inventory.use("potion");

    UI.log("Used potion.");

    refreshUI();

});

    /*======================================================
        MOVEMENT
    ======================================================*/

    upBtn?.addEventListener("click", () => {

    movePlayer("up");

    window.MapUI?.update();

});
downBtn?.addEventListener("click", () => {

    movePlayer("down");

    window.MapUI?.update();

});
leftBtn?.addEventListener("click", () => {

    movePlayer("left");

    window.MapUI?.update();

});
rightBtn?.addEventListener("click", () => {

    movePlayer("right");

    window.MapUI?.update();

});
const escapeBtn = document.getElementById("btn-escape");

escapeBtn?.addEventListener("click", () => {

    if (Game.battle && Game.battle.active) {

        Game.battle.runAway();

    }

});
   
}
	

/*==========================================================
    UI REFRESH
==========================================================*/

function refreshUI() {

    UI.updateHUD();

}

/*==========================================================
    GLOBAL EXPORT
==========================================================*/

/*==========================================================
    BATTLE BUTTONS
==========================================================*/

