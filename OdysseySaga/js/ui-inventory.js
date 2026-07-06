"use strict";

import { Game } from "./game.js";
import { UI } from "./ui.js";

export const InventoryUI = {

    container: null,

    init() {

        this.container = document.getElementById("inventory-menu");

    },

    open() {

        this.render();

        this.container.style.display = "block";

    },

    close() {

        this.container.style.display = "none";

    },

    render() {

        this.container.innerHTML = "";

        const items = Game.inventory.list();

        items.forEach(item => {

            const btn = document.createElement("button");

            btn.textContent = `${item.key} x${item.quantity}`;

            btn.onclick = () => {

                const result = Game.inventory.use(item.key);

                UI.log(`Used ${item.key}`);

                UI.updateHUD();

                this.render();

            };

            this.container.appendChild(btn);

        });

        const close = document.createElement("button");

        close.textContent = "Close";

        close.onclick = () => this.close();

        this.container.appendChild(close);

    }

};