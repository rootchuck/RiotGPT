const jobs = {
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

module.exports = {

    rollAcceptance: function(job) {

        const pay = jobs[job];
        const chance = 1000 / pay;

        return Math.random() < chance;

    }

}