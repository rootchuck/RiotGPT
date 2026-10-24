module.exports = {
    name: "random",
    description: "Generate a random number between 1 and another",
    usage: "random <max>",

    async execute(client, message, args) {

        var number = args[0];
        var valeur_aleatoire = Math.floor(Math.random() * number) + 1;

        if(isNaN(number)) {
            return message.reply("Invalid number");
        }

        return message.reply(`Random number between 1 and ${number} is ${valeur_aleatoire}`)



    }
}