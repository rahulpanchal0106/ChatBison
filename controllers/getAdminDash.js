
const convoModel = require('../models/convos')
async function getAdminLogin(req,res){
    const cursor = await convoModel.find({  
        createdAt: {
            $gte: '2023-11-16T07:26:36.769+00:00',
      }});
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
        const prompt = doc.prompt;
        const resp = doc.resp;
        const date = doc.createdAt;
        const ip = doc.userInfo['IP Address'];
        const region = doc.userInfo.Region;
        const city = doc.userInfo.City;
        const country = doc.userInfo.Country;
        const lat = doc.userInfo.Latitude;
        const lon = doc.userInfo.Longitude;

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