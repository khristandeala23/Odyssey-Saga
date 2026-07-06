/**
 * ============================================================
 * ODYSSEY SAGA RPG
 * File: map.js
 * World visual renderer (grid-based DOM map)
 * ============================================================
 */

"use strict";

import { World } from "./world.js";
import { Game } from "./game.js";

export const MapUI = {

    container: null,

    tiles: [],

    init() {

        this.container = document.getElementById("world-map");

        this.createGrid();

        this.render();

    },

    /*======================================================
        CREATE GRID
    ======================================================*/

    createGrid() {

        this.container.innerHTML = "";

        this.container.style.display = "grid";

        this.container.style.gridTemplateColumns =
            `repeat(${World.mapWidth}, 30px)`;

        this.container.style.gridTemplateRows =
            `repeat(${World.mapHeight}, 30px)`;

        this.tiles = [];

        for (let y = 0; y < World.mapHeight; y++) {

            for (let x = 0; x < World.mapWidth; x++) {

                const tile = document.createElement("div");

                tile.style.width = "30px";

                tile.style.height = "30px";

                tile.style.border = "1px solid #333";

                tile.style.background = "#1a1a1a";

                tile.dataset.x = x;

                tile.dataset.y = y;

                this.container.appendChild(tile);

                this.tiles.push(tile);

            }

        }

    },

    /*======================================================
        RENDER PLAYER POSITION
    ======================================================*/

    render() {

        this.tiles.forEach(tile => {

            tile.style.background = "#1a1a1a";

        });

        const index =
            World.playerY * World.mapWidth + World.playerX;

        const playerTile = this.tiles[index];

        if (playerTile) {

            playerTile.style.background = "#4caf50";

        }

    },

    /*======================================================
        UPDATE MAP
    ======================================================*/

    update() {

        this.render();

    }

};