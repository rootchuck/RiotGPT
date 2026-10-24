const users = require("../database/schemas/user.js");

module.exports = {

    createUser: async function(user_id, flags = {}) {

        if(!user_id) throw new Error("you must specify user id");

        const data = new users({
            user_id: user_id,
            flags: {
                admin: flags.flags?.admin || false,
                banned: flags.flags?.banned || false,
            },
            settings: {
                model: flags.settings?.model || "kimi-k3",
                system_prompt: flags.settings?.system_prompt || null,
            },
            economy: {
                bank: flags.economy?.bank || 0,
                wallet: flags.economy?.wallet || 0,
                profession: flags.economy?.profession || null,
                cooldowns: {
                    work: flags.economy?.cooldowns?.work || null,
                    beg: flags.economy?.cooldowns?.beg || null,
                    jobapply: flags.economy?.cooldowns?.jobapply || null,
                },
            },
        })

        await data.save().catch(err => console.error(err));

    }

}