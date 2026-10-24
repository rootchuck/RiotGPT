const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    description: "check all the commands",
    usage: "help [command]",
    async execute(client, message, args) {


        if(args[0]) {

            const command_data = client.commands.find(x => x.name.toLowerCase() === args[0].toLowerCase());

            const embed = new EmbedBuilder()
                .setColor("Green")
                .setTitle(`Help command for "${args[0].toLowerCase()}"`)
                .setDescription(`\`Command name:\` ${command_data.name}\n\`Description:\` ${command_data.description}\n\`Usage:\` ${command_data.usage}`)
                .setFooter({ text: "RiotGPT" })

            return message.reply({ embeds: [embed] });
            
        } else {

            var fields = [];
            client.commands.forEach(cmd => {
                fields.push({ name: cmd.name, value: `\`Description:\` ${cmd.description}\n\`Usage:\` ${cmd.usage}`, inline: true })
            })

            const embed = new EmbedBuilder()
                .setColor("Green")
                .setTitle(`Help menu`)
                .addFields(fields)
                .setFooter({ text: "RiotGPT" })

            return message.reply({ embeds: [embed] })

        }
    }
}