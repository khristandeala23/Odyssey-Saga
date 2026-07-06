/**
 * ============================================================
 * ODYSSEY SAGA RPG ENGINE
 * File: js/battle.js
 * Version: 0.1.0
 *
 * Turn-based battle system
 * ============================================================
 */

"use strict";

import { useSkill } from "./skills.js";
import { StateManager, GameState } from "./state.js";



/*==========================================================
    BATTLE STATE
==========================================================*/
const PLAYER_TURN = "player";
const ENEMY_TURN = "enemy";

export class Battle {

    constructor(player, enemies) {

        this.player = player;
        this.enemies = Array.isArray(enemies) ? enemies : [enemies];
        this.enemy = this.enemies[0];

        this.turn = PLAYER_TURN;
        this.active = true;
        this.log = [];

        StateManager.set(GameState.BATTLE);

    }

/*======================================================
    HELPERS
======================================================*/

getAliveEnemies() {

    return this.enemies.filter(e => e.isAlive());

}
/*======================================================
    PRIMARY TARGET
======================================================*/

getPrimaryEnemy() {

    return this.getAliveEnemies()[0] ?? null;

}
/*======================================================
    END BATTLE
======================================================*/

endBattle() {

    this.addLog("Returning to world...");

    this.active = false;
    this.enemy = null;

    if (this.player.resetBattleState) {
        this.player.resetBattleState();
    }

    StateManager.set(GameState.WORLD);

    window.UI?.refresh();

}




    /*======================================================
        START BATTLE
    ======================================================*/

        start() {

        const enemy = this.getPrimaryEnemy();

        if (!enemy) {

        this.addLog("No enemies found.");

        this.endBattle();

        return;

        }

        this.addLog(`A wild ${enemy.name} appears!`);

        window.UI?.refresh();

 }

    /*======================================================
        PLAYER ACTION
    ======================================================*/

        playerAction(type, skill = null) {

        if (!this.active) return;

        if (this.turn !== PLAYER_TURN) return;

        let result = null;

        if (type === "attack") {

        const target = this.getPrimaryEnemy();

        if (!target) return;

       const attack =
        this.player.attack ??
        this.player.baseAttack ??
       1;

        const defense =
        target.defense ??
        target.baseDefense ??
        0;

        const dmg =
     Math.max(1, attack - defense);

        target.takeDamage(dmg);

        this.showDamage("enemyImage", dmg);
        const img = document.getElementById("playerImage");

        img?.classList.add("hit");

        setTimeout(() => {

        img?.classList.remove("hit");

        }, 180);
        
        const img = document.getElementById("enemyImage");

        img?.classList.add("hit");

        setTimeout(() => {

         img?.classList.remove("hit");

        }, 180);

        result = `${this.player.name} attacks ${target.name} for ${dmg}`;

window.UI?.refresh();

        }
       else if (type === "skill" && skill) {

     const target = this.getPrimaryEnemy();

     if (!target) return;

     result = useSkill(this.player, target, skill);

        } 

        if (result) {

        this.addLog(result.message ?? result);

        }

        this.checkEnemyDeath();

        if (this.active) {

        this.nextTurn();

        }

    }

    /*======================================================
        ENEMY TURN
    ======================================================*/

   enemyAction() {

    if (!this.active) return;

    const enemy = this.getPrimaryEnemy();

    if (!enemy) return;

    const defense =
        this.player.defense ??
        this.player.baseDefense ??
        0;

    const dmg = Math.max(
        1,
        (enemy.attack ?? enemy.baseAttack ?? 1) - defense
    );

    const finalDamage = this.player.takeDamage(dmg);
    this.showDamage("playerImage", dmg);

    this.addLog(
    `${enemy.name} hits ${this.player.name} for ${finalDamage} damage.`
    );

    this.checkPlayerDeath();

    if (!this.active) return;

    window.UI?.refresh();

    this.nextTurn();

   }
    /*======================================================
        TURN HANDLER
    ======================================================*/

        nextTurn() {

        if (!this.active) return;

        this.turn =
        this.turn === PLAYER_TURN
        ? ENEMY_TURN
        : PLAYER_TURN;

        window.UI?.refresh();

     if (this.turn === ENEMY_TURN) {

        setTimeout(() => {

            this.enemyAction();

         }, 500);

        }

        }

    

    /*======================================================
        CHECK DEATH CONDITIONS
    ======================================================*/

        checkEnemyDeath() {

    if (this.getAliveEnemies().length === 0) {

        this.active = false;

        this.addLog("Victory!");

        let totalExp = 0;
        let totalGold = 0;

        this.enemies.forEach(e => {

            totalExp += e.expReward ?? 0;
            totalGold += e.goldReward ?? 0;

        });

        this.player.gainExp(totalExp);
        this.player.gold += totalGold;

        window.UI?.refresh();

        this.addLog(`Gained ${totalExp} EXP`);
        window.UI?.showVictory();

        this.endBattle();

     }

    }


	

        checkPlayerDeath() {

    if (!this.player.isAlive()) {

        this.active = false;

        window.UI?.showGameOver();
        window.UI?.refresh();

        StateManager.set(GameState.GAME_OVER);

    }

    }

    
    /*======================================================
    FLOATING DAMAGE
    ======================================================*/

    showDamage(id, amount) {

    const target = document.getElementById(id);

    if (!target) return;

    const div = document.createElement("div");

    div.className = "damage";

    div.textContent = "-" + amount;

    target.parentElement.appendChild(div);

    setTimeout(() => {

        div.remove();

    }, 800);

    }
    /*======================================================
    BATTLE LOG
    ======================================================*/

    
    addLog(message) {

    if (!message) return;

    this.log.push(message);

    window.UI?.log(message);

    }
}

	


