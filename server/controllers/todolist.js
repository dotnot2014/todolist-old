const todolist = require('../models/todolist.js');

const getTodolist = async function(ctx) {
    const id = ctx.params.id;
    const result = await todolist.getTodolistById(id);
    ctx.body = result;
}

//新增一条todolist
const createTodolist = async function(ctx){
    const data = ctx.request.body;
    const result = await todolist.createTodolist(data);

    ctx.body = {
        success: true
    }
}

//根据请求删除一条记录
const removeTodolist = async function(ctx){
    const id = ctx.params.id
    const userId = ctx.params.userId
    const success = await todolist.removeTodolist(id,userId)

    ctx.body = {
        success
    }
}
  
//根据请求更新todolist状态
const updateTodolist = async function(ctx){
    const id = ctx.params.id
    const userId = ctx.params.userId
    let status = ctx.params.status

    status === '0' ? status = true : status = false
    const success = await todolist.updateTodolist(id,userId,status)

    ctx.body = {
        success
    }
}
  

module.exports = {
    getTodolist,
    createTodolist,
    removeTodolist,
    updateTodolist
}

