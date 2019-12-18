class Player {
    constructor(name, password, email, id, hitpoints, level, gold, defense, attack, minDamage, maxDamage, strength, dexterity, isPremium) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.id = id;
        this.hitpoints = hitpoints;
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
}


class Monster {
    constructor(name, level, hitpoints, defense, attack, minDamage, maxDamage, strength, dexterity, drop) {
        this.name = name;
        this.level = level;
        this.hitpoints = hitpoints;
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
}

const player_Rycerzinho = new Player('Rycerzinho', 'veryhardpassword', 'email@gmail.com', 12, 330, 10, 1000, 260, 140, 13, 25, 20, 15, false);
const monster_Rat = new Monster("Rat", 1, 120, 10, 10, 8, 12, 5, 5, ['cheese', 'gold coin']);

const fight = (player, monster) => {
    // config
    let isFightFinished = true
    let roundsAmount = 15;

    // fight algorithms

    const playerHitChance = (player.dexterity / (player.dexterity + monster.dexterity) * 100);
    const monsterHitChance = (monster.dexterity / (monster.dexterity + player.dexterity) * 100);
    const fightResultList = document.querySelector('.results')
    fightResultList.innerHTML = ''
    let round = 1
    while (roundsAmount > 0 && isFightFinished) {
        if (monster.hitpoints <= 0 || player.hitpoints <= 0) {
            isFightFinished = false
        }
        const hitChance = Math.floor(Math.random() * 100) + 1;
        const didPlayerHit = playerHitChance > hitChance;
        const didMonsterHit = monsterHitChance > hitChance;

        if (didPlayerHit) {
            monster.hitpoints -= player.minDamage
        }

        if (didMonsterHit) {
            player.hitpoints -= monster.minDamage
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
    if (player.hitpoints > monster.hitpoints) {
        fightResultList.innerHTML += `<h3 style="color:red;">${player.name} wygrywa</h3>`
    } else if (player.hitpoints < monster.hitpoints) {
        fightResultList.innerHTML += `<h3 style="color:red;">${monster.name} wygrywa</h3>`
    } else {
        fightResultList.innerHTML += `<h3 style="color:red;">Remis</h3>`
    }
}

fight(player_Rycerzinho, monster_Rat);