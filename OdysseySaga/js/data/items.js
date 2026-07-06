/**
 * ============================================================
 * ODYSSEY SAGA RPG
 * DATA FILE: items.js
 *
 * Pure data only (no logic).
 * Used by ItemFactory in items.js
 * ============================================================
 */

export const ITEM_DATA = {

    /*==========================================================
        WEAPONS
    ==========================================================*/

    wood_sword: {
        key: "wood_sword",
        name: "Wood Sword",
        description: "A simple training sword made of wood.",
        type: "weapon",
        rarity: "common",
        value: 100,

        attack: 5,
        magic: 0,
        defense: 0,
        speed: 0,

        maxHP: 0,
        maxMP: 0,

        maxGemSlots: 0,
        enhancementCap: 5
    },

    iron_sword: {
        key: "iron_sword",
        name: "Iron Sword",
        description: "A sturdy iron blade used by beginners.",
        type: "weapon",
        rarity: "uncommon",
        value: 300,

        attack: 12,
        magic: 0,
        defense: 2,
        speed: 0,

        maxHP: 0,
        maxMP: 0,

        maxGemSlots: 1,
        enhancementCap: 10
    },

    /*==========================================================
        ARMOR
    ==========================================================*/

    cloth_armor: {
        key: "cloth_armor",
        name: "Cloth Armor",
        description: "Light armor offering minimal protection.",
        type: "armor",
        rarity: "common",
        value: 80,

        attack: 0,
        magic: 0,
        defense: 3,
        speed: 2,

        maxHP: 10,
        maxMP: 5,

        maxGemSlots: 0,
        enhancementCap: 5
    },

    iron_armor: {
        key: "iron_armor",
        name: "Iron Armor",
        description: "Heavy armor forged from iron plates.",
        type: "armor",
        rarity: "uncommon",
        value: 350,

        attack: 0,
        magic: 0,
        defense: 10,
        speed: -1,

        maxHP: 25,
        maxMP: 0,

        maxGemSlots: 1,
        enhancementCap: 10
    },

    /*==========================================================
        ACCESSORIES
    ==========================================================*/

    magic_ring: {
        key: "magic_ring",
        name: "Magic Ring",
        description: "A ring that enhances magical energy.",
        type: "accessory",
        rarity: "rare",
        value: 500,

        attack: 0,
        magic: 8,
        defense: 1,
        speed: 1,

        maxHP: 0,
        maxMP: 20,

        maxGemSlots: 2,
        enhancementCap: 15
    },

    /*==========================================================
        CONSUMABLES
    ==========================================================*/

    potion: {
        key: "potion",
        name: "Potion",
        description: "Restores a small amount of HP.",
        type: "consumable",
        rarity: "common",
        value: 30,

        hpRestore: 50,
        mpRestore: 0
    },

    ether: {
        key: "ether",
        name: "Ether",
        description: "Restores a small amount of MP.",
        type: "consumable",
        rarity: "common",
        value: 50,

        hpRestore: 0,
        mpRestore: 30
    }

};