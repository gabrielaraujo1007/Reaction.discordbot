const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv')
dotenv.config()
const {TOKEN, CLIENT_ID, GUILD_ID} = process.env

//import command
const fs = require("node:fs")
const path = require("node:path")

const commandPath = path.join(__dirname, "commands")
const  commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

for (const file of commandFiles){
    const filePath = path.join(commandPath, file)
    const command = require(filePath)

    if("data" in command && "execute" in command){
        client.commands.set(command.data.name, command)

    } else{
        console.log(`this command in ${filePath} don have date or execute`)
    }

}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(TOKEN);

client.on(Events.InteractionCreate, async interection =>{
    if (!interection.isChatInputCommand()) return
    console.log(interection)

    const command = interection.client.commands.get(interection.commandName)
    if (!command) {
        console.error("command not fond")
        return
    }
    try {
        await command.execute(interection)
    }
    catch (error) {
        console.error(error)
        await interection.reply('erro de execulcao')
    }
})