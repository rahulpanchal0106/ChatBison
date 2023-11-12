const {app} = require('./app');
const PORT = 3000;
const http = require('http');
const server = http.createServer(app);


server.listen(PORT,()=>{
    console.log(`Server script is fine\nLive at port ${PORT}`);
})
