//config values
const dotEnv = require('dotenv');
dotEnv.config({ path: process.cwd() +'/development.env' });
const https= require('https');
const http= require('http');
const fs =require('fs')
//?mysql db management

//TODO HTTPS options
/*
const options = {
  pfx: fs.readFileSync('test/fixtures/test_cert.pfx'),
  passphrase: 'sample'
};*/

const initApp = () => {
  const app = require( process.cwd() + '/app');
  //TODO 
  /*let httpsServer = https.createServer(options, app);
  httpsServer.listen(process.env.PORT, () => {
    console.log('server started on port ' + process.env.PORT);
  });*/
  let httpsServer = http.createServer(app);
  httpsServer.listen(process.env.PORT, () => {
    console.log('server (not secure )started on port ' + process.env.PORT);
    console.log(`http://localhost:${process.env.PORT}`);

  });
    // Role.findOne({where :{id: 3}}).then(role => {
    //   console.log(role);
    // })


    // Role.bulkCreate([{name: "user"},{name: "moderator"},{name: "administrator"}]).then(role => {
    //   console.log(role);;
    // });

    
}
initApp();