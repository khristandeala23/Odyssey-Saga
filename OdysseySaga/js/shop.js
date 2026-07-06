"use strict";

import { Game } from "./game.js";
import { UI } from "./ui.js";

export const Shop = {

    items: {

        potion: 30,

        ether: 50,

        iron_sword: 300

    },

    buy(key) {

        const price = this.items[key];

        if (!price) return;

        if (Game.player.gold < price) {

            UI.log("Not enough gold.");

            return;

        }

        Game.player.gold -= price;

        Game.inventory.add(key, 1);

        UI.log(`Bought ${key}`);

        UI.updateHUD();

    }

};