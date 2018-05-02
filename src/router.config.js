import Login from './components/login.vue'
import TodoList from './components/todolist.vue'
import UserInfo from './components/userinfo.vue'

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
            path:'/users',
            component:UserInfo
        },
        {
            path:'*',
            redirect:'/'
        }
    ]
}

export default routerConfig