/**
 * ============================================================
 * ODYSSEY SAGA RPG ENGINE
 * File: js/state.js
 * Version: 1.0.0
 *
 * Central Game State Manager
 * ============================================================
 */

"use strict";

/*==========================================================
    GAME STATES
==========================================================*/

export const GameState = Object.freeze({

    MENU: "menu",

    CLASS_SELECT: "class_select",

    WORLD: "world",

    BATTLE: "battle",

    SHOP: "shop",

    INVENTORY: "inventory",

    QUEST: "quest",

    PAUSE: "pause",

    GAME_OVER: "game_over",

    VICTORY: "victory"

});

/*==========================================================
    STATE MANAGER
==========================================================*/

export const StateManager = {

    current: GameState.MENU,

    previous: null,

    listeners: [],

    /*======================================================
        CHANGE STATE
    ======================================================*/

    set(state) {

        if (this.current === state) return;

        this.previous = this.current;

        this.current = state;

        console.log(
            `STATE: ${this.previous} → ${this.current}`
        );

        this.notify();

    },

    /*======================================================
        CHECK STATE
    ======================================================*/

    is(state) {

        return this.current === state;

    },

    /*======================================================
        PREVIOUS STATE
    ======================================================*/

    was(state) {

        return this.previous === state;

    },

    /*======================================================
        RETURN TO PREVIOUS
    ======================================================*/

    back() {

        if (!this.previous) return;

        this.set(this.previous);

    },

    /*======================================================
        LISTENERS
    ======================================================*/

    subscribe(callback) {

        if (typeof callback !== "function") return;

        this.listeners.push(callback);

    },

    unsubscribe(callback) {

        this.listeners =
            this.listeners.filter(fn => fn !== callback);

    },

    notify() {

        for (const listener of this.listeners) {

            listener(this.current, this.previous);

        }

    }

};