const { owners } = require("../config");


exports.run = async (client, message) => {
    const args = message.content.split(/ +/g);
    const cmd = args.shift().slice(client.prefix.length).toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(message.author.bot) return;

    
    const levelinfo = await client.db.get(`level-${message.guild.id}-${message.author.id}`, {
        level: 1,
        xp: 0,
        totalxp: 0
    });

    const generatedXp = Math.floor(Math.random() * 16)
    levelinfo.xp += generatedXp;
    levelinfo.totalxp += generatedXp;

    if(levelinfo.xp >= levelinfo.level * 40) {
        levelinfo.level++;
        levelinfo.xp = 0
        message.reply(`You're now level **${levelinfo.level}**!`)
    }
    await client.db.set(`level-${message.guild.id}-${message.author.id}`, levelinfo);

    if(levelinfo.level >= '30');
        const levelRole = message.guild.roles.cache.get('701956598138011648');

        message.member.roles.add(levelRole);

    if (!message.content.toLowerCase().startsWith(client.prefix) || !command) return;

    if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;
    if (command.requirements.ownerOnly && !owners.includes(message.author.id))
        return message.reply(`you cannot run the command as you are not an owner.`);

    if (command.requirements.userPerms && !message.member.permissions.has(command.requirements.userPerms))
        return message.reply(`you are missing the permission(s): ${missingPermissions(message.member, command.requirements.userPerms)}`);

    if (command.requirements.clientPerms && !message.guild.me.permissions.has(command.requirements.clientPerms))
        return message.reply(`I am missing the permission(s): ${missingPermissions(message.guild.me, command.requirements.userPerms)}`);

    if(cmd.limits) {
        const current = client.limits.get(`${command}-${message.author.id}`);

        if(!current) client.limits.set(`${command}-${message.author.id}`, 1);
        else {
            if (current >= cmd.limits.rateLimit) return;
            client.limits.set(`${command}-${message.author.id}`, current + 1)
        }

        setTimeout(() => {
            client.limits.delete(`${command}-${message.author.id}`);
        }, cmd.limits.cooldown);
    }

    try {
        command.run(client, message, args)
    } catch (error) {
        throw new Error(error);
    }
}

const missingPermissions = (member, permissions) => {
    const result = member.permissions.missing(permissions).map(
        str =>
        `\`${str
                .replace(/_/g, " ")
                .toLowerCase()
                .replace(/\b(\w)/g, (char) => char.toUpperCase())}\``
    );

    return result.length > 1 ?
        `${result.slice(0, -1).join(", ")} and ${result.slice(-1)[0]}` :
        result[0];


}