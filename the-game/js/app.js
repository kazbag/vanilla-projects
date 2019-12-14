class Player {
    constructor(nick, password, email, level, gold, defense, attack, minDamage, maxDamage, strength, dexterity, isPremium) {
        this.nick = nick;
        this.password = password;
        this.email = email;
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

