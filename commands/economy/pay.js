const users = require("../../database/schemas/user.js");

//const membre = message.mentions.users.first();

module.exports={
    name: "pay",
    description: "send amount of money to someone",
    usage: "pay <mention> <amount>",
    async execute(client,message,args){

        if(!args[0] || !args[1]) return message.reply("you must specify the amount and the user id");

        if(isNaN(args[1])) return message.reply("the amount should be a number");

        if(parseInt(args[1])<=0) return message.reply("the amount must be positive")
        
        
        const user1 = await users.findOne({user_id:message.author.id});
        
        const membre = message.mentions.users.first();

        if(!membre) return message.reply("user not exist");

        membre_pocket = await users.findOne({user_id:membre.user.id})

        if(user1.economy.bank < parseInt(args[1])) return message.reply("The amount deposited into your bank account isn't enough")
        
        user1.economy.bank-=parseInt(args[1])

        membre_pocket.economy.bank += parseInt(args[1])
        
        await user1.save()
        
        await membre_pocket.save() 
        
        return message.reply(`You send \`${args[1]}\`$ to the user \`${args[0]}\``)
    }
}