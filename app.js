/* ----------------------- Nodes and externals Modules ---------------------- */
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const bodyParser = require('body-parser');
const dotEnv = require('dotenv');

dotEnv.config({ path: process.cwd() +'/development.env' });
const cors= require('cors');
const cookieParser = require('cookie-parser');

const expressJwt = require('express-jwt');
/* --------------------------------- Router --------------------------------- */

const AdminRouter = require(process.cwd() + '/api/routes/administration');
const GeneralRouter = require(process.cwd() +'/api/routes/general');
// const ProfileRouter = require(process.cwd() +'/api/routes/profile');


const app = express();

/* --------------------------------- Tables --------------------------------- */
const { User } = require(`${process.cwd()}/sequelize`)

/* ------------------------------- Middlewares ------------------------------ */

app.use(express.json());
app.use(express.urlencoded({extended:false}));
//! SuccessStatus is 204 for IE11
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200
}));
app.use(cookieParser());
app.use(passport.initialize());

app.all('*', (req, res, next) => {
  console.log(req.method + " " +req.originalUrl);
  
  next();
});
passport.use(new LocalStrategy({
  usernameField: 'login'
  },
  async (username, password, done) => {
    await User
      .findOne({
          where: { login: username },
          include: ['role']
      }).then((userFound) => {
        if (userFound) {
            if(userFound.password === password) {
              return done(null, userFound)
            } else {
              return done(null, false, {
                message: 'Password is wrong.'
              });
            }
            
        } else {
          return done(null, false, {
            message: 'User not found'
        });
        }
    })
    /*
      let usersArr = fs.readFileSync(process.cwd()+'/api/models/users.json');

      let users = await JSON.parse(usersArr).users;
      let index = await users.findIndex(element => username === element.login);
      console.log(password)
      if (index !== -1) {
          if (users[index].password === password) {
              console.log("Good pass")
              return done(null, users[index]);
          }
          return done(null, false, {
              message: 'Password is wrong.'
          });

      } else {
          return done(null, false, {
              message: 'User not found'
          });
      }*/
  }
));

var auth = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

const Login = require(process.cwd() + '/api/controllers/login');
app.post('/login', Login);
//TODO app.use('/administration',auth, AdminRouter);

app.use('/administration', auth, AdminRouter);
app.use('/', auth, GeneralRouter);


  // app.listen(process.env.PORT, () => {
  //   console.log(`Express app is running at port : ${process.env.PORT}`)


    // Role.findOne({where :{id: 3}}).then(role => {
    //   console.log(role);
    // })


    // Role.bulkCreate([{name: "user"},{name: "moderator"},{name: "administrator"}]).then(role => {
    //   console.log(role);;
    // });
module.exports = app;