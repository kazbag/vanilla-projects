class Player {
    constructor(nick, password, email, id, hitpoints, level, gold, defense, attack, minDamage, maxDamage, strength, dexterity, isPremium) {
        this.nick = nick;
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

const player_Rycerzinho = new Player('Rycerzinho', 'veryhardpassword', 'email@gmail.com', 12, 330, 10, 1000, 260, 140, 23, 25, 20, 15, false);
const monster_Rat = new Monster("Rat", 1, 120, 10, 10, 0, 4, 5, 5, ['cheese', 'gold coin']);

const fight = (player, monster) => {
    // config
    let isFightFinished = true
    let roundsAmount = 15;

    // fight algorithms

    const playerHitChance = (player.dexterity / (player.dexterity + monster.dexterity) * 100);
    const monsterHitChance = (monster.dexterity / (monster.dexterity + player.dexterity) * 100);

    while (roundsAmount > 0 && isFightFinished) {
        if (monster.hitpoints <= 0 || player.hitpoints <= 0) {
            isFightFinished = false
        }
        const hitChance = Math.floor(Math.random() * 100) + 1;
        const didPlayerHit = playerHitChance > hitChance;
        const didMonsterHit = monsterHitChance > hitChance;

        if (didPlayerHit) {
            monster.hitpoints -= player.minDamage
            console.log("hp potwora " + monster.hitpoints);
        } else {
            console.log('gracz chybił');
        }

        if (didMonsterHit) {
            player.hitpoints -= monster.minDamage
            console.log('hp gracza ' + player.hitpoints);
        } else {
            console.log('potwór chybił');
        }

        roundsAmount--
    }
}

fight(player_Rycerzinho, monster_Rat);