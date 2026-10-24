module.exports={

    formatTime: function(time, options = {
        days: true,
        hours: true,
        minutes: true,
        seconds: true
    }){

        let days = Math.floor(time / 86_400_000);
        let hours = Math.floor((time % 86_400_000) / 3_600_000);
        let minutes = Math.floor((time % 3_600_000) / 60_000);
        let seconds = Math.floor((time % 60_000) / 1_000);

        let final = "";

        if(options.days == true) final += `${days}d `;
        if(options.hours == true) final += `${hours}h `;
        if(options.minutes == true) final += `${minutes}m `;
        if(options.seconds == true) final += `${seconds}s `;

        return final.trim();

    }

}