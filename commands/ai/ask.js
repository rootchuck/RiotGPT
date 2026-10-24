const Conversations = require("../../database/schemas/conversation.js");
const { OpenAI } = require("openai");
const { api_key } = require("../../config.json");
const users = require("../../database/schemas/user.js");
const openai_client = new OpenAI({
    apiKey: api_key,
    baseURL: "https://api.voidai.app/v1"
})

const { generateRandomString } = require("../../utils/generateRandomString.js");
const { splitText } = require("../../utils/splitText.js");

module.exports = {
    name: "ask",
    description: "Ask a question",
    usage: "ask <question>",

    async execute(client, message, args) {



        
        var question = args.join(" ")



        var conv = await Conversations.findOne({ user_id: message.author.id, active: true })

        if(!conv) {
            const data = new Conversations({
                user_id: message.author.id,
                conv_id: generateRandomString(16),
                history: [{"role": "system", "content": "Never use latex when doing math operations. you are in a discord chat and discord does not render latex."}],
                active: true,
            });

            await data.save().catch(err => { console.error(err) })
        }

        var conv = await Conversations.findOne({ user_id: message.author.id, active: true })

        if(conv.history.length >= 50) {
            return message.reply("Your conversation is too long, please reset it using !reset");
        }


        conv.history.push(
            {
                "role": "user",
                "content": question
            }
        )

        await conv.save();
        
        const user = await users.findOne({ user_id:message.author.id });

        const response = await openai_client.chat.completions.create({
            model: user.settings.model,
            messages: conv.history
        })
        var response_ai = response.choices[0].message.content;
        conv.history.push(
            {
                "role": "assistant",
                "content": response_ai
            }
        )

        await conv.save();

         var split_msg = splitText(response_ai);
        

        split_msg.forEach(async(element) => {
            await message.reply(element);
        });

        return;

    }
}
