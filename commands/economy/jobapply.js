const professions = {
    "engineer": 2100,
    "plumber": 1200,
    "electrician": 2000,
    "teacher": 1000,
    "barber": 900,
    "nurse": 1500,
    "doctor": 3000,
    "astronaut": 4500,
    "merchant": 1400
}

const professions_list = [
    "engineer",
    "plumber",
    "electrician",
    "teacher",
    "barber",
    "nurse",
    "doctor",
    "astronaut",
    "merchant"
]

const users = require("../../database/schemas/user.js");
const { rollAcceptance } = require("../../utils/rollAcceptance.js");
const { checkCooldown } = require("../../utils/checkCooldown.js");
const { formatTime } = require("../../utils/formatTime.js");

module.exports = {
    name: "jobapply",
    description: "apply for job",
    usage: "jobapply <job name>",
    async execute(client, message, args) {

        if(!args[0]) return message.reply("You must specify a job")
        
        const job_name = args[0].toLowerCase();
        if(!professions_list.includes(job_name)) return message.reply(`This job is not available yet\nJobs available: ${professions_list.map(p => `\`${p}\``).join(", ")}`)
        
        const user = await users.findOne({ user_id: message.author.id });
        
        if(user.economy.profession !== null) return message.reply("You already have a job")
        var cooldown_passed = checkCooldown(user.economy.cooldowns.jobapply, 43_200_000);

        if(cooldown_passed.status !== true) return message.reply(`You must wait \`${formatTime(cooldown_passed.remaining, {
            days: false,
            hours: true,
            minutes: true,
            seconds: true
        })}\` before applying for a job again`);

        var accepted = rollAcceptance(job_name);

        if(accepted == true) {

            user.economy.profession = job_name;
            user.economy.cooldowns.jobapply = Date.now();
            await user.save();

            return message.reply(`Congratulations, you were hired as a(n) \`${args[0]}\``);

        } else {
            user.economy.cooldowns.jobapply = Date.now();
            await user.save();
            return message.reply("Sorry, you were turned down from this job");
        }
        
    }

}

