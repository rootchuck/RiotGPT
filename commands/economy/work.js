const users = require("../../database/schemas/user.js");
const { checkCooldown } = require("../../utils/checkCooldown.js");
const { formatTime } = require("../../utils/formatTime.js");
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

module.exports={
    name:"work",
    description:"checking if you start working in the job",
    usage:"work",
    async execute(client,message,args){
        
            const user=await users.findOne({user_id:message.author.id})

            if(user.economy.profession==null ){
                return message.reply("you have no job yet");
            }


            
            var cooldown_passed=checkCooldown(user.economy.cooldowns?.work,86_400_000);

            if(cooldown_passed.status !== true ){
                return message.reply(`you must wait \`${formatTime(cooldown_passed.remaining)}\` `);
            }
            var job_name=user.economy.profession
            var salary=professions[job_name]
            
            user.economy.cooldowns.work = Date.now();
            user.economy.bank += salary
            await user.save().catch(err => {console.error(err)});

            return message.reply(`congratulations you'll start with us athe job \`${user.economy.profession}\``)
            


       
            
    
        
    }
}