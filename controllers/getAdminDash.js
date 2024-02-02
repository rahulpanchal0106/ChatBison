
const convoModel = require('../models/convos')
async function getAdminLogin(req,res){

    const cursor = await convoModel.find({  
        createdAt: {
            $gte: '2023-11-16T07:26:36.769+00:00',
      }});

    console.log(cursor);
    const prompts = [];
    const responses = [];
    const createdAt=[];
    const ipAdds = [];
    const regions = [];
    const cities = [];
    const countries = [];
    const lats=[];
    const lons=[];

    await cursor.forEach((doc)=>{
        const prompt =  doc.prompt;
        const resp =  doc.resp;
        const date =  doc.createdAt;
        const userInfo = doc.userInfo;
        var ip,region,city,country,lat,lon;
        if(doc.userInfo){
            console.log("userInfo doc Is Present 🟢🟢🟢");
            ip = doc.userInfo["IP Address"];
            region = doc.userInfo.Region;
            city = doc.userInfo.City;
            country = doc.userInfo.Country;
            lat = doc.userInfo.Latitude;
            lon = doc.userInfo.Longitude;
        }else{
            console.log("userInfo is NOT FOUND 🔴🔴🔴");
            ip = "NOT FOUND"
            region = "NOT FOUND";
            city = "NOT FOUND";
            country = "NOT FOUND";
            lat = "NOT FOUND";
            lon = "NOT FOUND";
        }
        

        prompts.push(prompt);
        responses.push(resp);
        createdAt.push(date);
        ipAdds.push(ip);
        regions.push(region);
        cities.push(city);
        countries.push(country);
        lats.push(lat);
        lons.push(lon);
    });
    res.json({
        'prompts':prompts,
        'resps':responses,
        'dates':createdAt,
        'ipAdds':ipAdds,
        'regions':regions,
        'cities':cities,
        'countries':countries,
        'lats':lats,
        'lons':lons
    })
}

module.exports=getAdminLogin;