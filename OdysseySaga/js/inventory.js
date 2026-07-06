/**
 * ============================================================
 * ODYSSEY SAGA RPG ENGINE
 * File: js/inventory.js
 * Version: 0.1.0
 *
 * Inventory system (items, equipment, usage)
 * ============================================================
 */

"use strict";

import { clamp } from "./core.js";
import { getItem } from "./items.js";

/*==========================================================
    INVENTORY CLASS
==========================================================*/

export class Inventory {

    constructor(player) {

        this.player = player;

        this.items = new Map(); // key -> quantity

    }

    /*======================================================
        ADD ITEM
    ======================================================*/

    add(itemKey, amount = 1) {

        if (!itemKey) return false;

        const item = getItem(itemKey);

        if (!item) return false;

        const current = this.items.get(itemKey) || 0;

        const newAmount = current + amount;

        this.items.set(itemKey, newAmount);

        return true;

    }

    /*======================================================
        REMOVE ITEM
    ======================================================*/

    remove(itemKey, amount = 1) {

        const current = this.items.get(itemKey) || 0;

        if (current <= 0) return false;

        const newAmount = current - amount;

        if (newAmount <= 0) {

            this.items.delete(itemKey);

        } else {

            this.items.set(itemKey, newAmount);

        }

        return true;

    }

    /*======================================================
        GET QUANTITY
    ======================================================*/

    count(itemKey) {

        return this.items.get(itemKey) || 0;

    }

    /*======================================================
        USE ITEM
    ======================================================*/

    use(itemKey) {

        const item = getItem(itemKey);

        if (!item) return null;

        const count = this.count(itemKey);

        if (count <= 0) return null;

        // Consumable logic
        if (item.type === "consumable") {

            if (item.hpRestore) {

                this.player.heal(item.hpRestore);

            }

            if (item.mpRestore) {

                this.player.restoreMP(item.mpRestore);

            }

            this.remove(itemKey, 1);

            return {

                success: true,

                type: "consumable"

            };

        }

        return {

            success: false,

            message: "Cannot use this item."

        };

    }

    /*======================================================
        EQUIP ITEM
    ======================================================*/

    equip(itemKey) {

        const item = getItem(itemKey);

        if (!item) return false;

        if (!item.type.includes("weapon") &&
            !item.type.includes("armor") &&
            !item.type.includes("accessory")) {

            return false;

        }

        const slot = this.getEquipSlot(item);

        if (!slot) return false;

        // Unequip old item
        if (this.player.equipment[slot]) {

            const old = this.player.equipment[slot];

            this.unequip(slot);

            this.add(old.key, 1);

        }

        this.player.equipment[slot] = item;

        this.remove(itemKey, 1);

        this.applyStats(item, true);

        return true;

    }

    /*======================================================
        UNEQUIP ITEM
    ======================================================*/

    unequip(slot) {

        const item = this.player.equipment[slot];

        if (!item) return false;

        this.applyStats(item, false);

        this.player.equipment[slot] = null;

        this.add(item.key, 1);

        return true;

    }

    /*======================================================
        APPLY / REMOVE STATS
    ======================================================*/

    applyStats(item, add = true) {

        const mult = add ? 1 : -1;

        this.player.baseAttack += (item.attack || 0) * mult;

        this.player.baseMagic += (item.magic || 0) * mult;

        this.player.baseDefense += (item.defense || 0) * mult;

        this.player.maxHP += (item.maxHP || 0) * mult;

        this.player.maxMP += (item.maxMP || 0) * mult;

        this.player.baseSpeed += (item.speed || 0) * mult;

        this.player.hp = clamp(this.player.hp, 0, this.player.maxHP);

        this.player.mp = clamp(this.player.mp, 0, this.player.maxMP);

    }

    /*======================================================
        GET EQUIP SLOT
    ======================================================*/

    getEquipSlot(item) {

        if (!item.type) return null;

        if (item.type === "weapon") return "weapon";

        if (item.type === "armor") return "armor";

        if (item.type === "accessory") {

            return !this.player.equipment.accessory1

                ? "accessory1"

                : "accessory2";

        }

        return null;

    }

    /*======================================================
        LIST ITEMS
    ======================================================*/

    list() {

        return Array.from(this.items.entries()).map(([key, qty]) => ({

            key,

            quantity: qty

        }));

    }

}