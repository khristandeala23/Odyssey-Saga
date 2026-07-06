"use strict";

import { Skill } from "./skills.js";
import { SKILL_DATA } from "./data/skills.js";

export const SkillDB = new Map();

function buildSkill(data) {
    return new Skill(data);
}

export function loadSkillDatabase() {

    SkillDB.clear();

    for (const key in SKILL_DATA) {
        SkillDB.set(key, buildSkill(SKILL_DATA[key]));
    }
}

export function getSkill(key) {

    const skill = SkillDB.get(key);

    if (!skill) return null;

    return new Skill(skill);
}

export function hasSkill(key) {
    return SkillDB.has(key);
}

export function listSkills() {
    return [...SkillDB.keys()];
}