const Conversations=require("../../database/schemas/conversation.js");

module.exports={
    name: "switch",
    description: "switching to another conversation",
    usage: "switch <conversation id>",
    async execute(client,message,args) {
        
        const id = args[0]
        


        const current_conversation = await Conversations.findOne({ user_id: message.author.id, active: true })
        const conv = await Conversations.findOne({ user_id: message.author.id, conv_id: id });
        
        if(!conv) return message.reply("Conversation not found.");

        if(current_conversation.conv_id == conv.conv_id) return message.reply("ach katkhrb9");

        current_conversation.active = false;
        await current_conversation.save()
        conv.active = true;
        await conv.save()


        return message.reply(`You have switched to conversation with id: ${conv.conv_id}`)


    }
}