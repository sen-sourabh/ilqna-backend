const JWT = require('jsonwebtoken');
const JWT_CRED = require('../dev.json');

exports.verfifyJWT = async (req, res, next) => {
  let token = req.headers['authorization'];
  // console.log("req: ", req.body)
  // console.log("req.header: ", req.headers)
  // console.log("<br>");
  // console.log("req: ", req.body)
  return await checkJWT(token)
    .then((valid) => {
      // console.log("valid: ", valid)
      if (!valid) {
        res.send([
          {
            code: 100,
            status: 'ERROR',
            message:
              'Authorization is compulsory for this request. Token is not received within the request. Please add valid token.',
          },
        ]);
      } else {
        token = token.replace('Bearer ', '');
        // console.log("token: ", token)

        try {
          JWT.verify(token, JWT_CRED.ACCESS_TOKEN_SECRET);
          let user = JWT.decode(token, JWT_CRED.ACCESS_TOKEN_SECRET);
          req.body = {
            ...req.body,
            user,
          };
          //  console.log("JWT.verify(token, JWT_CRED.ACCESS_TOKEN_SECRET): ", JWT.verify(token, JWT_CRED.ACCESS_TOKEN_SECRET))

          next();
        } catch (error) {
          // console.log("error after try: ", error)

          res.send([
            {
              code: 100,
              status: 'ERROR',
              message: error.message,
            },
          ]);
        }
      }
    })
    .catch((error) => {
      // console.log("error out: ", error.message)

      res.send([
        {
          code: 100,
          status: 'ERROR',
          message: error.message,
        },
      ]);
    });
};

checkJWT = async (token) => {
  if (token == undefined || token == '') {
    return false;
  }
  return true;
};
