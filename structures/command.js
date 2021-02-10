const { readdirSync } = require("fs");
const { join } = require("path");

const filePath = join(__dirname, "..", "commands");

exports.run = client => {
    for (const cmd of readdirSync(filePath).filter(file => file.endsWith(".js"))) {
        const props = require(`${filePath}/${cmd}`);
        client.commands.set(props.help.name, props);
        
        if (props.help.aliases && Array.isArray(props.help.aliases)) 
            props.help.aliases.forEach(alias => client.aliases.set(alias, props.help.name));
    }

    console.log(`Loaded: ${client.commands.size} commands!`)
}