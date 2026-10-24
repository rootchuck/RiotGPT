module.exports = {

    checkCooldown: function(time=0, cd = 60000) {

        // if(!time) throw new Error("No timestamp was passed.");
        if(time==null) return { status:true }
        
        if((time + cd) > Date.now()) {
            return {
                remaining: time + cd - Date.now(),
                status: false
            }
        }


        return {
            elapsed: Date.now() - time,
            status: true
        }
        

    }

}