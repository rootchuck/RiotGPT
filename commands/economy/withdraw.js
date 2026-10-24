const users = require("../../database/schemas/user.js");

module.exports={
    name:"withdraw",
    description:"withdraw money from your bank account",
    usage:"withdraw <amount>",
    async execute(client,message,args){
        const user= await users.findOne({user_id:message.author.id})

        if(!args[0]) return message.reply("Please enter the amount you would like to receive")

        if(isNaN(args[0])) return message.reply("the amount must be a number!")
        
        if(parseInt(args[0]) > user.economy.bank) return message.reply("The amount deposited into your bank account isn't enough")
        
        if(parseInt(args[0])<=0) return message.reply("You must enter a positive amount!")
        
        user.economy.wallet+=parseInt(args[0]);
        user.economy.bank-=parseInt(args[0]);

        await user.save().catch(err => {console.error(err)});
        
        return message.reply("withdrawl completed");
    }
}