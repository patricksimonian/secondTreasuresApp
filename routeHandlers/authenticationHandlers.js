const jwt = require('jsonwebtoken');
const moment = require('moment');
module.exports = (db, jwtSecret) => {
  const Employee = db.employees;
  return  {
    login: (req, res) => {
      //get username
      const username = req.body.username;
      const password = req.body.password;
      //attempt to find a user by username
      Employee.findOne({where: {username}})
      .then(employeeFound => {
        //does employees password match entered password?
        if(employeeFound && employeeFound.password === password) {//will hash later!
          //get date 1 day from now in seconds from epoch
          const expdate = moment().add(1, 'days').unix()
          //create JWT and send back
          jwt.sign({
            payload: {
              id: employeeFound.id,
              authenticated_when: Date.now(),
            },
            exp: expdate
          },
          jwtSecret,
          (err, token) => {
            if(err) {
              //failed to create token
              res.sendStatus(500);
            } else {
              res.send(JSON.stringify({
                success: true,
                token
              }));
            }
          });
        } else {
          res.sendStatus(401);
        }
      });
    }
  }
}
