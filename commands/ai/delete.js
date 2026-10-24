
const Conversations = require("../../database/schemas/conversation.js");

module.exports = {
    name: "delete",
    Description:"delete your conversation",
    usage:"!delete <conversation id>",

    async execute(client,message,args){
        
        const id = args[0];

        const conversation = await Conversations.findOne({ user_id: message.author.id, active: true });
        if(!conversation) return message.reply("You have no conversations");

        if(!id) {

            const deleted = await Conversations.findOneAndDelete({ user_id: message.author.id, active: true });
            const other_conv = await Conversations.findOne({ user_id: message.author.id })
            if(other_conv) {
                other_conv.active = true;
                await other_conv.save();
            }
            return message.reply(`You have deleted conversation ${deleted.conv_id}`)

        }
    }
}