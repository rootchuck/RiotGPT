module.exports = {

    getRandomInt: function (x, y) {
        const min = Math.ceil(x);
        const max = Math.floor(y);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}