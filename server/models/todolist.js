const db = require('../config/db.js');
const todoModel = '../schema/list.js';
const TodolistDb = db.Todolist;

const Todolist = TodolistDb.import(todoModel);

//获取某个用户的全部todolist
const getTodolistById = async function(id){
    const todolist = await Todolist.findAll({
        where:{
            user_id:id
        },
        attributes:['id','content','status']
    });

    return todolist
}

//给某个用户添加一条todolist
const createTodolist = async function(data){
    console.log(data);
    await Todolist.create({
        user_id:data.id,
        content:data.content,
        status:data.status
    })

    return true
}

//删除一条todolist
const removeTodolist = async function(id,user_id){
    await Todolist.destroy({
        where:{
            id,
            user_id
        }
    })
    return true
}
  
//修改todolist状态
const updateTodolist = async function(id,user_id,status){
    await Todolist.update(
        {status},
        {
            where:{
                id,
                user_id
            }
        }
    )
    return true
}

module.exports = {
    getTodolistById,
    createTodolist,
    removeTodolist,
    updateTodolist
}