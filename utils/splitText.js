module.exports = {

    splitText: function(content, max = 1980) {

        if(content.length <= max) {
            return [content];
        }


        let split_arr = [];

        for(let i = 0; i < content.length; i += max) {
            split_arr.push(content.slice(i, max + i))
        }



        return split_arr;
        



    }


}