const { toTitleCase, validateEmail, createToken, sendMail } = require("../config/function");
const config = require("../config/config");
const bcrypt = require("bcryptjs");
const { models } = require('../db/sequelize');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class Auth {
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUserRole = await models.users.findOne({ where: { id: loggedInUserId} });
      res.json({ role: loggedInUserRole.userRole });
    } catch {
      res.status(404);
    }
  }

  async allUser(req, res) {
    try {
      let allUser = await models.users.findAll();
      res.json({ users: allUser });
    } catch {
      res.status(404);
    }
  }

  /* User Registration/Signup controller  */
  async postSignup(req, res) {
    let { firstName, lastName, email, password, cPassword } = req.body;
    let error = {};
    if (!firstName || !email || !password || !cPassword) {
      error = {
        ...error,
        firstName: "Field must not be empty",
        lastName: "Field must not be empty",
        email: "Field must not be empty",
        password: "Field must not be empty",
        cPassword: "Field must not be empty",
      };
      return res.json({ error });
    }
    if (firstName.length < 3 || firstName.length > 25) {
      error = { ...error, firstName: "First name must be between 3-25 characters" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        firstName = toTitleCase(firstName);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Password must be at least 8 characters",
            firstName: "",
            email: "",
          };
          return res.json({ error });
        } else {
          // If Email & Number exists in Database then:
          try {
            password = bcrypt.hashSync(password, 10);
            const data = await models.users.findOne({ where: {email: email} });
            if (data) {
              error = {
                ...error,
                password: "",
                firstName: "",
                email: "Email already exists",
              };
              return res.json({ error });
            } else {
                const newUser = await models.users.create({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password,
                  // ========= Here role 1 for admin signup role 0 for customer signup =========
                  userRole: 0, // Field Name change to userRole from role
                  token: createToken(32),
                  tokenExpire: Date.now() + 900000
                });
                const token = jwt.sign(
                  { email: newUser.email, token: newUser.token },
                  JWT_SECRET
                );
                const encode = jwt.verify(token, JWT_SECRET);
                // TODO: Send verification mail
                const message = {
                  "email": newUser.email,
                  "firstName": newUser.firstName,
                  "verifyMailUrl": `${config.CLIENT_URL}/verify?token=${token}`,
                  "subject": `Verification mail from ${config.APP_NAME}`,
                  "mailType": 'verificationMail'
                }
                await sendMail(message);
                return res.json({
                  success: "Account created successfully. Check your email for verification",
                });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          firstName: "",
          email: "Email is not valid",
        };
        return res.json({ error });
      }
    }
  }

  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await models.users.unscoped().findOne({ where: { email: email } });
      if (!data) {
        return res.json({
          error: "Invalid email or password",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          if (data.isVerified !== true)  return res.json({ error: "Account not verified yet" })
          const token = jwt.sign(
            { 
              id: data.id, 
              role: data.userRole,
              email: data.email,
              name: `${data.firstName} ${data.lastName}`,
              phoneNumber: data.phoneNumber
            },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            error: "Invalid email or password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postVerifyUser(req, res) {
    let { token } = req.body;
    if ( !token ) {
      return res.json({ error: "Fields must not be empty" });
    }
    try {
      const checkToken = jwt.verify(token, config.SECRET_KEY, function(err, decoded) {
          if(err) return res.json({ error: "Incorrect token provided" });
          return decoded
      });
      const email = checkToken.email
      const verifyToken = checkToken.token
      const user = await models.users.findOne({ where: { email: email} });
      if ( !user ) return res.json({ error: "User doesn't exist" });
      if ( user.tokenExpire.toLocaleTimeString() > new Date().toLocaleTimeString ) return res.json({ error: "Token has expired, request new reset token" });
      if ( user.token !== verifyToken ) return res.json({ error: "Invalid token" });
      user.update({
        isVerified: true,
        token: '',
        tokenExpire: ''
      });
      const message = {
        "email": user.email,
        "firstName": user.firstName,
        "subject": `Welcome to ${config.APP_NAME}`,
        "loginUrl": `${config.CLIENT_URL}`,
        "mailType": 'welcomeMail'
      }
      await sendMail(message);
      return res.json({ success: "You’ve created your account successfully" });
    } catch (err) {
      console.log(err);
    }
  }

  async resendVerifyUser(req, res) {
    let { email } = req.body;
    if ( !email ) {
      return res.json({ newError: "Fields must not be empty" });
    }
    const user = await models.users.findOne({ where: { email: email} });
    if ( !user ) return res.json({ newError: "User doesn't exist" });
    if ( user.isVerified == true ) return res.json({ newError: "User already verified, you can login" });
    try {
        const verifyToken = createToken(32)
        const token = jwt.sign({ email: user.email, token: verifyToken }, config.SECRET_KEY);
        user.update({
            token: verifyToken,
            tokenExpire: Date.now() + 900000
        });
        const message = {
          "email": user.email,
          "firstName": user.firstName,
          "verifyMailUrl": `${config.CLIENT_URL}/verify?token=${token}`,
          "subject": `Verification mail from ${config.APP_NAME}`,
          "mailType": 'verificationMail'
        }
        await sendMail(message);
        return res.json({
          newSuccess: "Verification mail resent, check your email for verification instructions",
        });
    } catch (e) {
        return (e);
    }  

  }
}

const authController = new Auth();
module.exports = authController;
