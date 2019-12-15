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

const player = {
    nick: 'Player 1',
    password: 'veryhardpassword',
    email: 'email@gmail.com',
    id: 12,
    level: 10,
    gold: 1000,
    defense: 260,
    attack: 140,
    minDamage: 10,
    maxDamage: 14,
    strength: 20,
    dexterity: 15,
    isPremium: false
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

const rat = new Monster("Rat", 1, 10, 10, 0, 4, 5, 5, ['cheese', 'gold coin']);
rat.roar()