




function compareRPS(user_choice, bot_choice) {

    if(user_choice == bot_choice) {
        return "draw";
    }


    if (user_choice == "paper" && bot_choice == "scissors") {
        return "bot";
    } else if (user_choice == "scissors" && bot_choice == "paper") {
        return "user";
    }


    if (user_choice == "rock" && bot_choice == "paper") {
        return "bot";
    } else if (user_choice == "paper" && bot_choice == "rock") {
        return "user";
    }


    if (user_choice == "scissors" && bot_choice == "rock") {
        return "bot";
    } else if (user_choice == "rock" && bot_choice == "scissors") {
        return "user";
    }



}
module.exports={
    name:"rps",
    description: "playe rock paper scissors with the bot",
    usage: "rps <rock or paper or scissors>",
    async execute(client,message,args){
        const choices = ["rock", "paper", "scissors"];
        var user_choice = args[0];
        const bot_choice = choices[Math.floor(Math.random() * choices.length)];

        if(!user_choice) {
            return message.reply("choose either, rock paper or scissors.")
        }
        user_choice=user_choice.toLowerCase();
        if(!choices.includes(user_choice)) {
            return message.reply("invalid choice.");
        }

        const winner = compareRPS(user_choice, bot_choice);

        if(winner == "bot") {
            return message.reply(`❌ You lost, the bot won, he picked ${bot_choice}`)
        } else if (winner == "user") {
            return message.reply(`🏆 Congratulations, the bot lost, he picked ${bot_choice}`)
        } else if (winner == "draw") {
            return message.reply(`It was a draw, he picked ${bot_choice}`)
        }

    }
}
