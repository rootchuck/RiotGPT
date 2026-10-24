
module.exports = {
    name : "",
    description : "",
    usage : "",
    async execute(client,args,message){
        const response=await fetch(
              "https://api.egdata.app/offers/offer-id?locale=en-US"
        );
        if(!response) return console.error("error");
        
        return console.log(response);
    }
}