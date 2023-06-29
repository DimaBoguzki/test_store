const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function getByEmail(email, password){
  return new Promise( (resolve, reject) => {
    User.findOne({
      where: {
        email: email
      },
      attributes: ['id', 'name', 'email', 'password']
    })
    .then( async (user)=>{
      if(user){
        if(await bcrypt.compare(password, user.dataValues.password)){
          const token = jwt.sign(
            { user_id: user.dataValues.id, email:user.dataValues.email },
            process.env.TOKEN_KEY,
            {
              expiresIn: process.env.EXPIRE_IN_TOKEN,
            }
          );
          delete user.dataValues.password;
          resolve({
            ...user.dataValues,
            token
          })
        }
        else {
          reject('invalid email or password');
        }
      }
      else {
        reject('User not found');
      }
    })
  })
} 

function register(name, email, password){
  return new Promise( async (resolve, reject)=>{
    const userExist = await User.findOne({ where: { email: email}});
    if (userExist) {
      return reject("User Already Exist. Please Login");
    }
    else{
      const encryptedPassword = await bcrypt.hash(password, 10);
      const createUser = await User.create({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });
      let newUser = createUser.toJSON();
      delete newUser.password;
      const token = jwt.sign(
        { user_id: newUser.id, email:newUser.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.EXPIRE_IN_TOKEN,
        }
      );
      resolve({
        ...newUser,
        token
      });
    }
  })
}

function getById(userId){
  return User.findOne({
    where: {
      id: userId
    },
    attributes: ['id', 'name', 'email' ]
  });
}
module.exports={
  getByEmail,
  register,
  getById
}