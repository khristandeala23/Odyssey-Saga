"use strict";

import { saveGame, loadGame, resetGame } from "./save.js";
import { UI } from "./ui.js";

export function initSaveControls() {

    document.getElementById("btn-save")?.addEventListener("click", () => {

        saveGame();

        UI.log("Game Saved!");

    });

    document.getElementById("btn-load")?.addEventListener("click", () => {

        loadGame();

        UI.log("Game Loaded!");

        UI.updateHUD();

        if (window.MapUI) window.MapUI.update();

    });

    document.getElementById("btn-reset")?.addEventListener("click", () => {

        resetGame();

        UI.log("Save Reset!");

    });

}