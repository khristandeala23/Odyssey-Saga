
/**
 * ============================================================
 * ODYSSEY SAGA RPG ENGINE
 * File: ./items.js
 * Version: 0.1.0
 *
 * Item engine.
 * Handles every item in the game.
 * ============================================================
 */

"use strict";

import {
    GameObject,
    RARITY,
    ELEMENT
} from "./core.js";

import { ITEM_DATA } from "./data/items.js";

/*==========================================================
    ITEM TYPES
==========================================================*/

export const ItemType = Object.freeze({

    CONSUMABLE: "consumable",

    MATERIAL: "material",

    WEAPON: "weapon",

    ARMOR: "armor",

    ACCESSORY: "accessory",

    QUEST: "quest"

});

/*==========================================================
    EQUIPMENT SLOTS
==========================================================*/

export const EquipmentSlot = Object.freeze({

    WEAPON: "weapon",

    HELMET: "helmet",

    ARMOR: "armor",

    GLOVES: "gloves",

    BOOTS: "boots",

    ACCESSORY_1: "accessory1",

    ACCESSORY_2: "accessory2"

});

/*==========================================================
    ITEM
==========================================================*/

export class Items extends GameObject {

    constructor(data = {}) {

        super();

        this.key = data.key ?? "";

        this.name = data.name ?? "Unknown Item";

        this.description = data.description ?? "";

        this.type = data.type ?? ItemType.MATERIAL;

        this.rarity = data.rarity ?? RARITY.COMMON;

        this.value = data.value ?? 0;

        this.stackable = data.stackable ?? true;

        this.maxStack = data.maxStack ?? 99;

        this.icon = data.icon ?? "";

    }

    clone() {

        return new Item(this.toJSON());

    }

    toJSON() {

        return {

            key: this.key,

            name: this.name,

            description: this.description,

            type: this.type,

            rarity: this.rarity,

            value: this.value,

            stackable: this.stackable,

            maxStack: this.maxStack,

            icon: this.icon

        };

    }

}

/*==========================================================
    EQUIPMENT
==========================================================*/

export class Equipment extends Items {

    constructor(data = {}) {

        super(data);

        this.slot = data.slot;

        this.level = data.level ?? 1;

        this.element = data.element ?? ELEMENT.NONE;

        this.attack = data.attack ?? 0;

        this.magic = data.magic ?? 0;

        this.defense = data.defense ?? 0;

        this.speed = data.speed ?? 0;

        this.maxHP = data.maxHP ?? 0;

        this.maxMP = data.maxMP ?? 0;

        this.critical = data.critical ?? 0;

        this.dodge = data.dodge ?? 0;

    }

    clone() {

        return new Equipment(this.toJSON());

    }

    toJSON() {

        return {

            ...super.toJSON(),

            slot: this.slot,

            level: this.level,

            element: this.element,

            attack: this.attack,

            magic: this.magic,

            defense: this.defense,

            speed: this.speed,

            maxHP: this.maxHP,

            maxMP: this.maxMP,

            critical: this.critical,

            dodge: this.dodge

        };

    }

}

/*==========================================================
    WEAPON
==========================================================*/

export class Weapon extends Equipment {

    constructor(data = {}) {

        super({

            ...data,

            type: ItemType.WEAPON,

            slot: EquipmentSlot.WEAPON

        });

        this.minDamage = data.minDamage ?? 1;

        this.maxDamage = data.maxDamage ?? 3;

        this.attackSpeed = data.attackSpeed ?? 1.0;

    }

}

/*==========================================================
    ARMOR
==========================================================*/

export class Armor extends Equipment {

    constructor(data = {}) {

        super(data);

        this.resistance = {

            fire: data.fire ?? 0,

            water: data.water ?? 0,

            wind: data.wind ?? 0,

            earth: data.earth ?? 0,

            light: data.light ?? 0,

            dark: data.dark ?? 0

        };

    }

}

/*==========================================================
    ACCESSORY
==========================================================*/

export class Accessory extends Equipment {

    constructor(data = {}) {

        super({

            ...data,

            type: ItemType.ACCESSORY

        });

        this.specialEffects = data.specialEffects ?? [];

    }

}

/*==========================================================
    CONSUMABLE
==========================================================*/

export class Consumable extends Items {

    constructor(data = {}) {

        super({

            ...data,

            type: ItemType.CONSUMABLE

        });

        this.hpRestore = data.hpRestore ?? 0;

        this.mpRestore = data.mpRestore ?? 0;

        this.revive = data.revive ?? false;

        this.effects = data.effects ?? [];

    }

}

/*==========================================================
    MATERIAL
==========================================================*/

export class Material extends Items {

    constructor(data = {}) {

        super({

            ...data,

            type: ItemType.MATERIAL

        });

        this.category = data.category ?? "misc";

    }

}

/*==========================================================
    QUEST ITEM
==========================================================*/

export class QuestItem extends Items {

    constructor(data = {}) {

        super({

            ...data,

            type: ItemType.QUEST,

            stackable: false

        });

        this.questID = data.questID ?? "";

    }

}

/*==========================================================
    ITEM STACK
==========================================================*/

export class ItemStack {

    constructor(item, amount = 1) {

        this.item = item;

        this.amount = amount;

    }

    add(quantity) {

        this.amount += quantity;

    }

    remove(quantity) {

        this.amount -= quantity;

        if (this.amount < 0) {

            this.amount = 0;

        }

    }

    isEmpty() {

        return this.amount <= 0;

    }

}
/*==========================================================
    ITEM QUALITY
==========================================================*/

export const ItemQuality = Object.freeze({

    NORMAL: "normal",

    FINE: "fine",

    SUPERIOR: "superior",

    ELITE: "elite",

    MASTERWORK: "masterwork"

});

/*==========================================================
    DURABILITY
==========================================================*/

export class Durability {

    constructor(max = 100) {

        this.max = max;

        this.current = max;

    }

    damage(amount = 1) {

        this.current = Math.max(

            0,

            this.current - amount

        );

    }

    repair() {

        this.current = this.max;

    }

    get percentage() {

        return this.current / this.max;

    }

    get broken() {

        return this.current <= 0;

    }

}

/*==========================================================
    GEMS
==========================================================*/

export class Gem {

    constructor({

        name = "",

        attack = 0,

        defense = 0,

        magic = 0,

        speed = 0

    } = {}) {

        this.name = name;

        this.attack = attack;

        this.defense = defense;

        this.magic = magic;

        this.speed = speed;

    }

}

/*==========================================================
    EQUIPMENT EXTENSIONS
==========================================================*/

Equipment.prototype.enhancement = 0;

Equipment.prototype.quality = ItemQuality.NORMAL;

Equipment.prototype.gemSlots = [];

Equipment.prototype.maxGemSlots = 0;

Equipment.prototype.durability = new Durability();

/*==========================================================
    ENHANCEMENT
==========================================================*/

export function enhanceEquipment(item) {

    if (!(item instanceof Equipment)) {

        return false;

    }

    if (item.enhancement >= 15) {

        return false;

    }

    item.enhancement++;

    item.attack += 2;

    item.magic += 2;

    item.defense += 2;

    item.maxHP += 5;

    item.maxMP += 3;

    return true;

}

/*==========================================================
    GEMS
==========================================================*/

export function socketGem(item, gem) {

    if (!(item instanceof Equipment)) {

        return false;

    }

    if (

        item.gemSlots.length >=

        item.maxGemSlots

    ) {

        return false;

    }

    item.gemSlots.push(gem);

    item.attack += gem.attack;

    item.defense += gem.defense;

    item.magic += gem.magic;

    item.speed += gem.speed;

    return true;

}

/*==========================================================
    SCORE
==========================================================*/

export function calculateEquipmentScore(item) {

    if (!(item instanceof Equipment)) {

        return 0;

    }

    return (

        item.attack * 2 +

        item.magic * 2 +

        item.defense * 1.5 +

        item.speed * 1.2 +

        item.maxHP * 0.25 +

        item.maxMP * 0.20 +

        item.enhancement * 8

    );

}

/*==========================================================
    COMPARISON
==========================================================*/

export function compareEquipment(a, b) {

    return (

        calculateEquipmentScore(a) -

        calculateEquipmentScore(b)

    );

}

/*==========================================================
    VALIDATION
==========================================================*/

export function isEquipment(item) {

    return item instanceof Equipment;

}

export function isWeapon(item) {

    return item instanceof Weapon;

}

export function isArmor(item) {

    return item instanceof Armor;

}

export function isAccessory(item) {

    return item instanceof Accessory;

}

export function isConsumable(item) {

    return item instanceof Consumable;

}

/*==========================================================
    ITEM FACTORY
==========================================================*/

export class ItemFactory {

    static create(type, data) {

        switch (type) {

            case ItemType.WEAPON:

                return new Weapon(data);

            case ItemType.ARMOR:

                return new Armor(data);

            case ItemType.ACCESSORY:

                return new Accessory(data);

            case ItemType.CONSUMABLE:

                return new Consumable(data);

            case ItemType.MATERIAL:

                return new Material(data);

            case ItemType.QUEST:

                return new QuestItem(data);

            default:

                return new Item(data);

        }

    }

}
/*==========================================================
    ITEM DATABASE BRIDGE
    Connects DATA -> ENGINE
==========================================================*/


/*==========================================================
    GLOBAL ITEM REGISTRY
==========================================================*/

export const ItemDB = new Map();

/*==========================================================
    CREATE ITEM FROM DATA
==========================================================*/

function buildItemFromData(data) {

    switch (data.type) {

        case ItemType.WEAPON:
            return new Weapon(data);

        case ItemType.ARMOR:
            return new Armor(data);

        case ItemType.ACCESSORY:
            return new Accessory(data);

        case ItemType.CONSUMABLE:
            return new Consumable(data);

        case ItemType.MATERIAL:
            return new Material(data);

        case ItemType.QUEST:
            return new QuestItem(data);

        default:
            return new Item(data);

    }

}

/*==========================================================
    LOAD ALL ITEMS INTO MEMORY
==========================================================*/

export function loadItemDatabase() {

    ItemDB.clear();

    for (const key in ITEM_DATA) {

        const data = ITEM_DATA[key];

        const item = buildItemFromData(data);

        ItemDB.set(key, item);

    }

}

/*==========================================================
    GET ITEM (CLONED SAFE INSTANCE)
==========================================================*/

export function getItem(key) {

    const item = ItemDB.get(key);

    if (!item) {

        console.warn(`Item not found: ${key}`);

        return null;

    }

    return item.clone();

}

/*==========================================================
    CREATE ITEM DIRECTLY
==========================================================*/

export function createItem(key) {

    return getItem(key);

}

/*==========================================================
    CHECK ITEM EXISTS
==========================================================*/

export function hasItem(key) {

    return ItemDB.has(key);

}

/*==========================================================
    DEBUG LIST
==========================================================*/

export function listAllItems() {

    return Array.from(ItemDB.keys());

}