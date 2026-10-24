const Conversations = require("../../database/schemas/conversation.js");
const { EmbedBuilder } = require("discord.js");



module.exports = {
    name: "conversations",
    description: "Check your conversations",
    usage: "conversations",

    async execute(client, message, args) {


        const conversations = await Conversations.find({ user_id: message.author.id })

        if(conversations.length === 0) return message.reply("You have no conversations.");

        var fields = [];

        for(let i = 0; i < conversations.length; i++) {
            fields.push({ name: `${i+1}. ${conversations[i].conv_id}`, value: `${new Date(conversations[i].created * 1000).toISOString()}` })
        }
        

        const embed = new EmbedBuilder()
            .setTitle("Your conversations")
            .setColor("Blue")
            .addFields(fields)
            .setFooter({ text: "result" })

        return message.reply({ embeds: [embed] });

    }
}