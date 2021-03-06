let isModalVisible = false
const showModal = () => {
    const modal = document.querySelector('.modal')
    if (!isModalVisible) {
        isModalVisible = true
        modal.classList.add('modal--visible')
        setTimeout(() => {
            isModalVisible = false
            modal.classList.remove('modal--visible')
        }, 3500);
    }
}

// 

class Player {
    constructor(name, password, email, id, hitpoints, maxHitpoints, level, gold, defense, attack, minDamage, maxDamage, strength, dexterity, isPremium) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.id = id;
        this.hitpoints = hitpoints;
        this.maxHitpoints = maxHitpoints;
        this.level = level;
        this.gold = gold;
        this.defense = defense;
        this.attack = attack;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.strength = strength;
        this.dexterity = dexterity;
        this.isPremium = isPremium;
    }
    heal() {
        this.hitpoints = this.maxHitpoints
    }
}


class Monster {
    constructor(name, level, hitpoints, maxHitpoints, defense, attack, minDamage, maxDamage, strength, dexterity, drop) {
        this.name = name;
        this.level = level;
        this.hitpoints = hitpoints;
        this.maxHitpoints = maxHitpoints;
        this.defense = defense;
        this.attack = attack;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.strength = strength;
        this.dexterity = dexterity;
        this.drop = drop;
    }

    roar() {
        console.log(`${this.name} says Ssshhh...`);
    }

    heal() {
        this.hitpoints = this.maxHitpoints;
    }
}

const player_Rycerzinho = new Player('Rycerzinho', 'veryhardpassword', 'email@gmail.com', 12, 330, 330, 10, 1000, 260, 140, 13, 25, 20, 15, false);

const monster_Rat = new Monster("Rat", 1, 120, 120, 10, 10, 8, 12, 5, 5, ['ser', 'złoto']);
const monster_Boar = new Monster("Boar", 3, 320, 320, 13, 8, 18, 31, 15, 2, ['mięso', 'złoto']);
const monster_Wolf = new Monster("Wolf", 8, 640, 640, 23, 18, 38, 59, 15, 2, ['mięso', 'kość', 'złoto']);
const monster_Bear = new Monster("Bear", 14, 770, 770, 26, 14, 66, 97, 14, 2, ['mięso', 'futro', 'złoto']);

const monsters = [monster_Rat, monster_Boar, monster_Wolf, monster_Bear]

let selectedMonster = monsters[0]

const selectEnemy = (e) => {
    console.log(monsters[e.target.value]);
    selectedMonster = monsters[e.target.value]
}
const selectsMonsters = [...document.querySelectorAll('.monster-radio')]

selectsMonsters.forEach(monster => {
    monster.addEventListener('click', selectEnemy)
})
const fight = (player, monster) => {
    // config
    if (player.hitpoints > 0 && monster.hitpoints > 0) {

        let isFightFinished = false
        let roundsAmount = 15;
        let playersHitAmount = 0
        let monstersHitAmount = 0

        // fight functions

        const calculateHit = (someone) => {
            return Math.ceil((someone.maxDamage - someone.minDamage) * Math.random()) + someone.minDamage;
        }
        const isDoubleHit = (someone) => {
            return Math.ceil((someone.dexterity - someone.dexterity) * Math.random()) + someone.dexterity >= Math.ceil(Math.random() * 100);
        }

        // fight algorithms

        const playerHitChance = (player.dexterity / (player.dexterity + monster.dexterity) * 100);
        const monsterHitChance = (monster.dexterity / (monster.dexterity + player.dexterity) * 100);
        const fightResultList = document.querySelector('.results')

        fightResultList.innerHTML = ''

        let round = 1

        while (roundsAmount > 0 && !isFightFinished) {
            if (monster.hitpoints <= 0 || player.hitpoints <= 0) {
                isFightFinished = true
            }

            const hitChance = Math.floor(Math.random() * 100) + 1;
            const didPlayerHit = playerHitChance >= hitChance;
            const didMonsterHit = monsterHitChance >= hitChance;

            if (didPlayerHit) {
                const hit = calculateHit(player)
                playersHitAmount += hit
                monster.hitpoints -= hit
                if (isDoubleHit(player)) {
                    monster.hitpoints -= hit
                    playersHitAmount += hit
                }
            }

            if (didMonsterHit) {
                const hit = calculateHit(monster)
                monstersHitAmount += hit
                player.hitpoints -= hit
                if (isDoubleHit(monster)) {
                    player.hitpoints -= hit
                    monstersHitAmount += hit
                }
            }

            fightResultList.innerHTML += `
        <li class="item">
            <span class="round-nr">Runda ${round}</span>
            <p>hp przeciwnika ${monster.hitpoints}</p>
            <p>hp gracza ${player.hitpoints}</p>
        </li>
        `
            roundsAmount--
            round++
        }
        // to fix what if monster has less hp in basics but fight was 15 rounds
        fightResultList.innerHTML += `<h6>${monster.name} uderzył za ${monstersHitAmount}, natomiast ${player.name} uderzył za ${playersHitAmount}</h6>`
        if ((player.hitpoints > monster.hitpoints || playersHitAmount > monstersHitAmount) && player.hitpoints > 0) {
            fightResultList.innerHTML += `<h3 style="color:red;">${player.name} wygrywa</h3>`
        } else if ((player.hitpoints < monster.hitpoints || monstersHitAmount > playersHitAmount) && monster.hitpoints > 0) {
            fightResultList.innerHTML += `<h3 style="color:red;">${monster.name} wygrywa</h3>`
        } else {
            fightResultList.innerHTML += `<h3 style="color:red;">Remis</h3>`
        }
        monster.heal()
    } else {
        showModal()
    }
}


const btnFight = document.querySelector('#button-fight')
if (btnFight != null) {
    btnFight.addEventListener('click', () => fight(player_Rycerzinho, selectedMonster))
}

const renderPlayerStats = (player) => {
    const stats = [...document.querySelectorAll('.points')]
    stats[0].textContent = player.gold
    stats[1].textContent = `${player.hitpoints}/${player.maxHitpoints}`
    stats[2].textContent = player.defense
    stats[3].textContent = player.attack
    stats[4].textContent = `${player.minDamage}-${player.maxDamage}`
    stats[5].textContent = player.strength
    stats[6].textContent = player.dexterity
}

renderPlayerStats(player_Rycerzinho)