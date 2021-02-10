const { Client, Collection  } = require('discord.js');
const db = require('hive-db');
const {database} = db.mongo;
const client = new Client({ disableMentions: 'everyone' })
const mongo = new database("mongodb+srv://root:Hyg57aff@vinci.ujdc9.mongodb.net/Vinci", { useUnique: true });
const {token, prefix } = require('./config.json');

mongo.on("ready", () => {
    console.log(`Connected!`);
});

mongo.on("error", console.error);
mongo.on("debug", console.log);

client.prefix = prefix;
client.db = db;
client.commands = new Collection();
client.aliases = new Collection();

client.limits = new Map();
client.snipes = new Map();
client.blacklist = db.get("blacklist", []);


require("./structures/command").run(client);
require("./structures/events").run(client);

client.login(token);