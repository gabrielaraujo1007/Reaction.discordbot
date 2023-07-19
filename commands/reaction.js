const { Client, GatewayIntentBits } = require('discord.js');
const { TOKEN } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });


const CANAL_ID_ESPECIFICO = '00000000000000';

client.on('messageCreate', async message => {
    // Verificar se a mensagem foi enviada pelo próprio bot para evitar loops
    if (message.author.id === client.user.id) return;

    // Verificar se a mensagem foi enviada no canal específico
    if (message.channel.id === CANAL_ID_ESPECIFICO) {
                // Enviar uma resposta ao conteúdo da mensagem original
                await message.reply('sua resposta aqui! 😄');

                // Reagir à mensagem original com um emoji
                await message.react('😄');
            
     }
    
});

client.login(TOKEN);

module.exports = { 
    data: {
        name: 'emoji',
        description: 'Reage a todas as mensagens',
    },

    async execute(interaction) {
        await interaction.reply("resposta");
    }
};
