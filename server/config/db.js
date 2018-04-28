// 初始化Sequelize和数据库的连接

const Sequelize = require('sequelize');

const Todolist = new Sequelize('mysql://root:12345678/todolist',{
    define:{
        timestamps:false
    }
})

module.exports = {
    Todolist
}