const users = require("../../database/schemas/user.js");

module.exports = {

    name: "deposit",
    description: "Deposit money in your bank account",
    usage: "deposit <amount>",
    async execute(client, message, args) {

        if(!args[0]) return message.reply("Please specify an amount");
        if(isNaN(args[0])) return message.reply("You must specify a valid number");
        if(parseInt(args[0]) <= 0) return message.reply("Amount must be positive");

        let user_data = await users.findOne({ user_id:message.author.id });

        if(user_data.economy.wallet < parseInt(args[0])) return message.reply("You dont have enough money to deposit");

        user_data.economy.wallet -= parseInt(args[0]);
        user_data.economy.bank += parseInt(args[0]);

        user_data.save();


        return message.reply(`You have deposited \`${args[0]}$\``);


    }
}