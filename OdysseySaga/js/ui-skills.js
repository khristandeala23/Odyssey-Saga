/**
 * ============================================================
 * ODYSSEY SAGA RPG
 * File: ui-skills.js
 * Skill selection interface
 * ============================================================
 */

"use strict";

import { Game } from "./game.js";
import { getSkill } from "./skillDatabase.js";
import { UI } from "./ui.js";

export const SkillUI = {

    container: null,

    init() {

        this.container = document.getElementById("skill-menu");

    },

    open() {

        if (!Game.player) return;

        if (!Game.battle || !Game.battle.active) return;

        this.render();

        this.container.style.display = "block";

    },

    close() {

        if (this.container) {

            this.container.style.display = "none";

        }

    },

    render() {

        this.container.innerHTML = "";

        Game.player.skills.forEach(skillKey => {

            const skill = getSkill(skillKey);

            if (!skill) return;

            const btn = document.createElement("button");

            btn.textContent = `${skill.name} (MP: ${skill.mpCost})`;

            btn.onclick = () => {

                Game.battle.playerAction("skill", skill);

                UI.updateHUD();

                UI.log(`Used ${skill.name}`);

                this.close();

            };

            this.container.appendChild(btn);

        });

        const cancel = document.createElement("button");

        cancel.textContent = "Cancel";

        cancel.onclick = () => this.close();

        this.container.appendChild(cancel);

    }

};