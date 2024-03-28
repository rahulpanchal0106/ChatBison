
const convoModel = require('../models/convos')
async function getAdminLogin(req,res){

    const cursor = await convoModel.find({  
        createdAt: {
            $gte: '2023-11-18T01:21:00.905+00:00',
      }
    });
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
        // console.log(".............................",doc.prompt);
        const prompt = doc.prompt;
        const resp = doc.resp;
        const date = doc.createdAt;
        var ip
        var region
        var city
        var country
        var lat
        var lon
        if(doc.userInfo){
            ip = doc.userInfo['IP Address']||'null';
            region = doc.userInfo.Region;
            city = doc.userInfo.City;
            country = doc.userInfo.Country;
            lat = doc.userInfo.Latitude;
            lon = doc.userInfo.Longitude;
        }else{
            ip='null'
            region='null'
            city='null'
            country ='null'
            lat='null'
            lon = 'null'
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

    // console.log("~~~~~~~~~~~~~~",prompts);
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