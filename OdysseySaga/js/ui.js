/**
 * ============================================================
 * ODYSSEY SAGA RPG ENGINE
 * File: js/ui.js
 * Version: 0.1.0
 *
 * Basic UI system (battle + stats + logs)
 * ============================================================
 */

"use strict";

import { Game } from "./game.js";

/*==========================================================
    UI ELEMENTS
==========================================================*/

export const UI = {

    logBox: null,

    playerHP: null,

    playerMP: null,

    enemyHP: null,

    init() {

    this.logBox = document.getElementById("battle-log");

    },
    showGameOver() {

    this.log("GAME OVER");

    },

    showVictory() {

    this.log("VICTORY!");

    },

    /*======================================================
    UPDATE HUD
    ======================================================*/

    updateHUD() {
    const playerFill=document.getElementById("playerHPFill");

    const playerText=document.getElementById("playerHPText");

    if(playerFill){

    playerFill.style.width=hpPercent+"%";

    }

    if(playerText){

    playerText.textContent=`${p.hp}/${p.maxHP}`;

    }
    const playerFill = document.getElementById("playerFill");

    const playerHP = document.getElementById("playerHP");

    if (playerFill)
    playerFill.style.width = hpPercent + "%";

    if (playerHP)
    playerHP.textContent =
        `${p.hp} / ${p.maxHP}`;
    if (!Game.player) return;

    const p = Game.player;

    // -----------------------
    // HP
    // -----------------------

    const hpPercent = (p.hp / p.maxHP) * 100;

    const hpFill = document.getElementById("hpFill");
    const hpText = document.getElementById("hpText");

    if (hpFill)
        hpFill.style.width = hpPercent + "%";

    if (hpText)
        hpText.textContent = `${p.hp} / ${p.maxHP}`;

    // -----------------------
    // MP
    // -----------------------

    const mpPercent = (p.mp / p.maxMP) * 100;

    const mpFill = document.getElementById("mpFill");
    const mpText = document.getElementById("mpText");

    if (mpFill)
        mpFill.style.width = mpPercent + "%";

    if (mpText)
        mpText.textContent = `${p.mp} / ${p.maxMP}`;

    // -----------------------
    // EXP
    // -----------------------

    const expNeed = p.expToNextLevel();

    const expPercent =
        (p.exp / expNeed) * 100;

    const expFill =
        document.getElementById("expFill");

    const expText =
        document.getElementById("expText");

    if (expFill)
        expFill.style.width =
            expPercent + "%";

    if (expText)
        expText.textContent =
            `${p.exp} / ${expNeed}`;

    // -----------------------
    // Enemy HP
    // -----------------------

    if (Game.battle && Game.battle.enemy) {

        const e = Game.battle.enemy;

        const enemyPercent =
            (e.hp / e.maxHP) * 100;

        const enemyFill =
            document.getElementById("enemyFill");

        const enemyHP =
            document.getElementById("enemyHP");

        const enemyName =
            document.getElementById("enemyName");

        if (enemyFill)
            enemyFill.style.width =
                enemyPercent + "%";

        if (enemyHP)
            enemyHP.textContent =
                `${e.hp} / ${e.maxHP}`;

        if (enemyName)
            enemyName.textContent =
                e.name;

    }

    // -----------------------
    // Player Info
    // -----------------------

    const set = (id, value) => {

        const el = document.getElementById(id);

        if (el)
            el.textContent = value;

    };

    set("playerName", p.name);

    set("playerClass", p.className);

    set("playerLevel", p.level);

    set("playerGold", p.gold);

    set("playerAtk", p.attack);

    set("playerDef", p.defense);

},
    /*======================================================
        ADD LOG MESSAGE
    ======================================================*/

    log(message) {

    if (!this.logBox) return;

    const line = document.createElement("div");

    line.className = "battle-log-line";

    line.textContent = message;

    this.logBox.appendChild(line);

    this.logBox.scrollTop =
        this.logBox.scrollHeight;

    },

    /*======================================================
        CLEAR LOG
    ======================================================*/

    clearLog() {

    if (!this.logBox) return;

    this.logBox.replaceChildren();

    },

    /*======================================================
        REFRESH FUNCTION
    ======================================================*/
    refresh() {

    this.updateHUD();

    }
};

/*==========================================================
    GLOBAL HOOKS
==========================================================*/

window.UI = UI;