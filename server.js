//配置文件
const config = {
  database: 'todolist',
  username: 'root',
  password: '12345678',
  host: '127.0.0.1',
  port: 3306
}

const Sequelize = require('sequelize')

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

let User = sequelize.define('user', {
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


//新增一条记录

// var now = Date.now();

// User.create({
//   user_name:'peter',
//   password:'999',
//   createdAt: now,
//   updatedAt: now
// }).then(u=>{
//   console.log('created.'+JSON.stringify(u))
// }).catch(err=>{
//   console.log('failed:' + err)
// })

//修改数据
// (async () => {
//   var u = await User.findById(4);
//   u.user_name = 'peter';
//   u.updatedAt = Date.now();
//   await u.save();
// })();


// 查询数据

(async () => {
  var users = await User.findAll();
  console.log(`find ${users.length} users:`);
  for (let u of users) {
      console.log(JSON.stringify(u));
  }
})();