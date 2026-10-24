const users = require("../../database/schemas/user.js");

module.exports = {

    name: "resign",
    description: "Resign from your current job",
    usage: "resign",

    async execute(client,message,args) {

        const user = await users.findOne({ user_id:message.author.id });
        if(user.economy.profession == null) return message.reply("You have no job");

        user.economy.profession = null
        user.save()
        
        return message.reply("You have resigned from your job");
    }

}