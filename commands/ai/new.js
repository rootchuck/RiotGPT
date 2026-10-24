const Conversations = require("../../database/schemas/conversation.js")
const { generateRandomString } = require("../../utils/generateRandomString.js");

module.exports={
    name:"new",
    description:"creat a new conversation",
    usage:"new",
    async execute(client, message, args){
        
        const max_conv = 5;

        const user_conversations = await Conversations.find({ user_id: message.author.id });
        const active_conversation = await Conversations.findOne({ user_id: message.author.id, active: true });


        if (user_conversations.length >= max_conv) {
            return message.reply("baraka elik");
        }


        const data = new Conversations({
            user_id: message.author.id,
            conv_id: generateRandomString(16),
            history: [],
            active: true
        });

        await data.save().catch(err => { console.error(err) })

        if(active_conversation) {
            active_conversation.active = false;
            active_conversation.save().catch(err => { console.error(err) });
        }




        return message.reply("New conversation created with ID: " + data.conv_id);

    }
}
