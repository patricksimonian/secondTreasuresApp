const moment = require('moment');
//special note:
//on error the standardized obj to respond with is json with this shape:
/*
  {
    success: false,
    message: ['yours messages here']
  }
*/
module.exports = (db, jwtSecret) => {
  //personal promisfy wrapper on jwt sign and verify methods
  const jwt = require('../helpers/jwt.js')(jwtSecret);
  const User = db.users;
  const Employee = db.employees;
  return  {
    login: (req, res) => {
      //get username
      const username = req.body.username;
      const password = req.body.password;
      //attempt to find a user by username
      User.findOne({where: {username}, include: [{model: Employee, as: 'employee'}]})
      .then(userFound => {
        //does employees password match entered password?
        if(userFound && userFound.validatePassword(password)) {//will hash later!
          //get date 1 day from now in seconds from epoch
          const expdate = moment().add(1, 'days').unix();
          //create JWT and send back..
          //payload creation
          const payload = {
            id: userFound.id,
            employee: userFound.employee instanceof Employee,
            authenticated_when: Date.now()
          };
          //sign token and send
          jwt.sign(payload, expdate)
          .then(token => {
            res.json({
              success: true,
              token,
              message: ['Succesfully authenticated']
            });
          })
          .catch(err => {
            //failed to create token
            res.status(500).json({
              success: false,
              message: ['Failed to create token']
            });
          });
        } else {
          res.status(401).json({
            success: false,
            message: ['Username or Password is incorrect']
          });
        }
      });
    }
  }
}
