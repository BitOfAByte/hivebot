const { readdirSync } = require("fs");
const { join } = require("path");

const filePath = join(__dirname, "..", "events");

exports.run = client => {
    const files = readdirSync(filePath)

    for (const event of files.filter(file => file.endsWith(".js"))) {
        const props = require(`${filePath}/${event}`);
        client.on(event.split(".").shift(), props.run.bind(null, client));
    }

    console.log(`Loaded: ${files.length} events!`);
}