const axios=require("axios");
const {EmbedBuilder}=require("discord.js")
module.exports={
    name:"weather",
    description:"see the weather in a city",
    usage:"weather <city>",
    async execute(client,message,args){
    
        const city = message.content.split(' ')[1];
        const link = `https://wttr.in/${city}?format=j1`;

        let response = await axios.get(link);
        // console.log(response.data);
        const temp = response.data.current_condition[0].temp_C;
        const humidity = response.data.current_condition[0].humidity;
        const weather_description = response.data.current_condition[0].weatherDesc[0].value;

        const weather_icon_url = response.data.current_condition[0].weatherIconUrl[0].value;

        const embed = new EmbedBuilder()
            .setTitle(`Weather in ${city}`)
            .setColor("Blue")
            .setThumbnail(weather_icon_url)
            .addFields(
                { name: "Temperature", value: `${temp}°C`, inline: true },
                { name: "Humidity", value: `${humidity}%`, inline: true },
                { name: "Weather description", value: `${weather_description}`, inline: true },

            )
            .setFooter({ text: "Weather" })



        return message.reply({ embeds: [embed] });


    }
}