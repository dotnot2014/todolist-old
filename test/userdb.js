//配置文件
const config = require('./db.config.js');
const Sequelize = require('sequelize');

let sequelize = new Sequelize(config.database,config.username,config.password,{
  host:config.host,
  dialect:'mysql',
  pool:{
    max:5,
    min:0,
    idle:30000
  }
})

//告诉Sequelize如何映射数据库表：

let db = sequelize.define('user', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  user_name: {
    type: Sequelize.STRING(50),
    allowNull: false,
    defaultValue: ''
  },
  password: {
    type: Sequelize.STRING(128),
    allowNull: false,
    defaultValue: ''
  }
}, {
  tableName: 'user'
});

// 导出查询数据

let userdb = async () => await db.findAll();

module.exports = userdb;


// //新增一条记录

// // var now = Date.now();

// // User.create({
// //   user_name:'peter',
// //   password:'999',
// //   createdAt: now,
// //   updatedAt: now
// // }).then(u=>{
// //   console.log('created.'+JSON.stringify(u))
// // }).catch(err=>{
// //   console.log('failed:' + err)
// // });

// //修改数据
// // (async () => {
// //   var u = await User.findById(4);
// //   u.user_name = 'peter';
// //   u.updatedAt = Date.now();
// //   await u.save();
// // })();

// //删除数据
// // (async () => {
// //   var u = await User.findById(4);
// //   await u.destroy();
// // })();