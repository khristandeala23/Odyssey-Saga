"use strict";

import { Game } from "./game.js";

export const QuestSystem = {

    quests: {},

    active: [],

    addQuest(id, quest) {

        this.quests[id] = quest;

    },

    startQuest(id) {

        if (!this.quests[id]) return;

        this.active.push({

            id,

            progress: 0,

            completed: false

        });

    },

    updateQuest(id, amount = 1) {

        const q = this.active.find(q => q.id === id);

        if (!q || q.completed) return;

        q.progress += amount;

        if (q.progress >= this.quests[id].goal) {

            q.completed = true;

            console.log(`Quest Completed: ${id}`);

        }

    }

};