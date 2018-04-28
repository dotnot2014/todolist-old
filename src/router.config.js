import Login from './components/login.vue'
import TodoList from './components/todolist.vue'

let routerConfig = {
    mode:'history',
    base:__dirname,
    routes:[
        {
            path:'/',
            component:Login
        },
        {
            path:'/todolist',
            component:TodoList
        },
        {
            path:'*',
            redirect:'/'
        }
    ]
}

export default routerConfig