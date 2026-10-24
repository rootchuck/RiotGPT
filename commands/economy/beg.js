const users = require("../../database/schemas/user.js");
const SIX_HOURS_IN_MS = 21_600_000;
const REWARD_INTERVAL = [10, 50];
const PROBABILITY = [0, 1, 1];

const { getRandomInt } = require("../../utils/getRandomInt.js");
const { checkCooldown } = require("../../utils/checkCooldown.js");


module.exports = {
    name: "beg",
    description: "Beg for money",
    usage: "beg",
    async execute(client, message, args) {

        const user_data = await users.findOne({ user_id: message.author.id });

        if(user_data.economy.profession !== null) {
            return message.reply("You can't beg for money when you already have a job.");
        }


        const check = checkCooldown(user_data.economy.cooldowns.beg, SIX_HOURS_IN_MS);

        if(check.status == false) {
            return message.reply(`You can only beg once every 6 hours. You can beg again in \`${(check.remaining / 1000).toFixed(2)}\`s.`);
        }

        let BEG_SUCCESS = true;
        if(PROBABILITY[Math.floor(Math.random() * PROBABILITY.length)] == 0) BEG_SUCCESS = false;

        if(BEG_SUCCESS == false) {
            message.reply(`You begged and nobody wanted to give you money.`)
            user_data.economy.cooldowns.beg = Date.now();
            return user_data.save()
        }

        const reward = getRandomInt(REWARD_INTERVAL[0], REWARD_INTERVAL[1]);

        user_data.economy.cooldowns.beg = Date.now();
        user_data.economy.wallet += reward;
        user_data.save()

        return message.reply(`You have begged and received \`$${reward}\`.`);

    }
}