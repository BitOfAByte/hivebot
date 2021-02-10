exports.run = (client, message) => {
    return message.reply(`pong! \`${client.ws.ping}MS\``)
}

exports.help = {
    name: "ping",
    aliases: ["latency"],
    description: "Displays the latency of the bot"
}

exports.requirements = {
    clientPerms: [],
    userPerms: [],
    ownerOnly: false
}

exports.limits = {
    ratelimit: 2,
    cooldown: 1e4
}