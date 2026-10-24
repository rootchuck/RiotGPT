// kimi-k3
// gpt-5.6-luna
// gpt-5.6-sol
const users = require("../../database/schemas/user.js");


module.exports = {

    name: "model",
    description: "choose your favorite model when you want to ask the bot",
    usage: "model <model-name>",

    async execute(client,message,args){
        var models=[
            "kimi-k3",
            "gpt-5.6-luna",
            "gpt-5.6-sol",
            "gemini-3.6-flash",
            "qwen3.8-27b:free",
            "glm-5.3-flash",
            "glm-5.3"
        ];

        if(!args[0]) return message.reply(`You must choose a model, available models: ${models.join(", ")}`);

        if(!models.includes(args[0].toLowerCase())){
            return message.reply("this model doesn't exist");
        }

        var user = await users.findOne({user_id:message.author.id})

        user.settings.model = args[0].toLowerCase();
        user.save().catch(err => console.error(err));


        return message.reply(`You have changed your model to ${args[0].toLowerCase()}`)
    }
}