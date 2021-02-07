const { Client } = require('discord.js');
const db = require('hive-db');
const {database} = db.mongo;
const client = new Client({ disableMentions: 'everyone' })
const mongo = new database("mongodb+srv://root:Hyg57aff@vinci.ujdc9.mongodb.net/Vinci", { useUnique: true });
const { token } = require('./config.json')
client.once('ready', async => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence('dnd');
});

client.once('message', async messaage => {
    if(messaage.channel.type === 'dm') return;
    if(messaage.author.bot) return;
});


mongo.on("ready", () => {
    console.log(`Hey, im connected!`);
    getName();
});
mongo.on("error", console.error);
mongo.on("debug", console.log);
async function getName() {
  mongo.init('age','19');
  mongo.get('age')
  //-> 21
  mongo.init('name','Toby');
  mongo.get('name');
  //-> Lason
}

client.login(token);