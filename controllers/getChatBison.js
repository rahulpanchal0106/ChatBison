function sessionIdGenerator(){
  const timeStamp=Date.now();
  const randInt = Math.floor(Math.random()*1000000+10000)
  const id=`${timeStamp} ${randInt}`
  return id;
}
function getChatBison(req, res){
  const clientIP = '54.254.162.138';
  console.log(`🌠 ${clientIP} entered`);
  const IPINFO_TOKEN = process.env.IPINFO_TOKEN;
  const ipinfo = `https://ipinfo.io/${clientIP}?token=${IPINFO_TOKEN}`;
    
  request(ipinfo, { json: true }, (error, res, body) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    const userInfo={
        'IP Address':body.ip,
        'Country':body.country,
        'Region':body.region,
        'City':body.city,
        'Zip Code':body.postal,
        'Latitude':body.loc.split(',')[0],
        'Longitude':body.loc.split(',')[1]
    }

    console.log(`<<<<<Region: ${userInfo.Region}`);
    console.log(`<<<<<,City: ${userInfo.City}`);
    console.log(`(Lat,Long):(${userInfo.Latitude},${userInfo.Longitude})`)
  });
  const sessionId = sessionIdGenerator();

  console.log("🙌🙌🙌 Session Id: ",sessionId)
  return res.sendFile(path.join(__dirname,'public','index.html'));
}


module.exports=getChatBison;