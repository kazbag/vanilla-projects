class Player {
    constructor(nick, password, email, id, level, gold, defense, attack, minDamage, maxDamage, strength, dexterity, isPremium) {
        this.nick = nick;
        this.password = password;
        this.email = email;
        this.id = id;
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
    constructor(name, level, defense, attack, minDamage, maxDamage, strength, dexterity, drop) {
        this.name = name;
        this.level = level;
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

const player_Rycerzinho = new Player('Rycerzinho', 'veryhardpassword', 'email@gmail.com', 12, 10, 1000, 260, 140, 10, 14, 20, 15, false)
const monster_Rat = new Monster("Rat", 1, 10, 10, 0, 4, 5, 5, ['cheese', 'gold coin']);

const fight = (player, monster) => {
    let isFightDone = false
    // fight algorithms
    const playerHitChance = (player.dexterity / (player.dexterity + monster.dexterity) * 100)
    const monsterHitChance = (monster.dexterity / (monster.dexterity + player.dexterity) * 100)
    do {
    } while (isFightDone)
}

fight(player_Rycerzinho, monster_Rat)