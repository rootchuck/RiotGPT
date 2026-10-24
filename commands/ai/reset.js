const Conversations = require("../../database/schemas/conversation.js")

module.exports={
    name:"reset",
    description:"start a new discussion",
    usage:"reset",
    async execute(client,message,args){
        

        const conv = await Conversations.findOne({ user_id: message.author.id, active: true });
        if(!conv || conv.history.length == 0) return message.reply("Your conversation is already empty.");

        conv.history = [];
        await conv.save();

        return message.reply('Discussion reset.');
    
    }


}