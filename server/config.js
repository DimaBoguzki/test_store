const { Sequelize } = require('sequelize');
require('dotenv').config();




function initStrcut(){
  return new Promise( async (resolve, reject) => {
    const db =new Sequelize(`mysql://${process.env.USER_DB}:${process.env.PASSWORD_DB}@localhost:3306`, {
      dialect: 'mysql'
    });
    try{
      const [results, metadata] = await db.query('SHOW DATABASES');
      let flag=false;
      for(let i=0; i<results.length; i++){
        if(results[i].Database === process.env.DB_NAME){
          flag=true;
          break;
        }
      }
      if(!flag){
        try{
          await db.query(`CREATE DATABASE ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)
          console.log(`Database ${process.env.DB_NAME} created successfully`);
          resolve(true)
        }
        catch(err){
          console.error(err);
          reject(err)
        }
      }
      else{
        console.log(`Database ${process.env.DB_NAME} is exist`);
        resolve(true)
      }
    }
    catch(err){
      console.log(err);
      reject(err)
    }
  })
}

const db = new Sequelize(`mysql://${process.env.USER_DB}:${process.env.PASSWORD_DB}@localhost:3306/${process.env.DB_NAME}`, {
  dialect: 'mysql'
});

module.exports={
  db,
  initStrcut
};