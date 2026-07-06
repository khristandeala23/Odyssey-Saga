/**
 * ============================================================
 * ODYSSEY SAGA RPG ENGINE
 * File: js/core.js
 * Version: 0.1.0
 *
 * Core engine utilities used by every module.
 * ============================================================
 */

"use strict";

/*==========================================================
    ENGINE INFORMATION
==========================================================*/

export const ENGINE = Object.freeze({
    NAME: "Odyssey Saga RPG",
    VERSION: "0.1.0",
    AUTHOR: "Shawill & ChatGPT"
});

/*==========================================================
    CONSTANTS
==========================================================*/

export const TILE_SIZE = 48;
export const FPS = 60;

export const DIRECTIONS = Object.freeze({
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right"
});

export const ELEMENT = Object.freeze({
    NONE: "none",
    FIRE: "fire",
    WATER: "water",
    WIND: "wind",
    EARTH: "earth",
    LIGHT: "light",
    DARK: "dark"
});

export const RARITY = Object.freeze({
    COMMON: "common",
    UNCOMMON: "uncommon",
    RARE: "rare",
    EPIC: "epic",
    LEGENDARY: "legendary",
    MYTHIC: "mythic"
});

/*==========================================================
    RANDOM
==========================================================*/

export function randomInt(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

export function randomFloat(min, max) {

    return Math.random() * (max - min) + min;

}

export function chance(percent) {

    return Math.random() < percent;

}

export function choose(array) {

    return array[randomInt(0, array.length - 1)];

}

/*==========================================================
    ID GENERATOR
==========================================================*/

let idCounter = 0;

export function generateID(prefix = "id") {

    idCounter++;

    return `${prefix}_${Date.now()}_${idCounter}`;

}

/*==========================================================
    CLONE
==========================================================*/

export function deepClone(object) {

    return structuredClone(object);

}

/*==========================================================
    CLAMP
==========================================================*/

export function clamp(value, min, max) {

    return Math.max(min, Math.min(max, value));

}

/*==========================================================
    EVENT BUS
==========================================================*/

class EventBus {

    constructor() {

        this.events = new Map();

    }

    on(event, callback) {

        if (!this.events.has(event)) {

            this.events.set(event, []);

        }

        this.events.get(event).push(callback);

    }

    emit(event, data = null) {

        if (!this.events.has(event)) {

            return;

        }

        for (const callback of this.events.get(event)) {

            callback(data);

        }

    }

    off(event, callback) {

        if (!this.events.has(event)) {

            return;

        }

        const listeners = this.events.get(event);

        const index = listeners.indexOf(callback);

        if (index >= 0) {

            listeners.splice(index, 1);

        }

    }

}

export const Events = new EventBus();

/*==========================================================
    GAME CLOCK
==========================================================*/

export class GameClock {

    constructor() {

        this.delta = 0;

        this.last = performance.now();

    }

    update() {

        const now = performance.now();

        this.delta = (now - this.last) / 1000;

        this.last = now;

    }

}

/*==========================================================
    LOGGER
==========================================================*/

export class Logger {

    static info(message) {

        console.log("[INFO]", message);

    }

    static warn(message) {

        console.warn("[WARN]", message);

    }

    static error(message) {

        console.error("[ERROR]", message);

    }

}

/*==========================================================
    STORAGE
==========================================================*/

export const Storage = {

    save(key, value) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    load(key) {

        const value = localStorage.getItem(key);

        if (!value) {

            return null;

        }

        return JSON.parse(value);

    },

    remove(key) {

        localStorage.removeItem(key);

    }

};

/*==========================================================
    BASE CLASS
==========================================================*/

export class GameObject {

    constructor() {

        this.id = generateID("obj");

    }

}