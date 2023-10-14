import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/login/signin.vue')
  },
  {
    path: '/layout',
    name:'layout',
    component: () => import('../views/home/home.vue'),
    redirect:'/index',
    meta:{
      title:'layout'
    },
    children:[
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/home/index.vue'),
        meta:{
          title:'首页'
        },
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/user.vue'),
        meta:{
          title:'用户管理'
        },
      },
      {
        path: '/person',
        name: 'person',
        component: () => import('../views/user/personCenter.vue'),
        meta:{
          title:'个人中心'
        },
      },
      {
        path: '/school',
        name: 'school',
        component: () => import('../views/school/school.vue'),
        meta:{
          title:'学校列表'
        },
      },
      {
        path: '/onebyone',
        name: 'onebyone',
        component: () => import('../views/student/onebyoneOptionList.vue'),
        meta:{
          title:'一对一志愿填报'
        },
      },
      {
        path: '/inner',
        name: 'inner',
        component: () => import('../views/student/inneroption.vue'),
        meta:{
          title:'方案查看'
        },
      },
      {
        path: '/optionSelect',
        name: 'optionSelect',
        component: () => import('../views/option/optionSelect.vue'),
        meta:{
          title:'方案制定'
        },
      },
      {
        path: '/ownOption',
        name: 'ownOption',
        component: () => import('../views/option/OwnOption.vue'),
        meta:{
          title:'方案预览'
        },
      },
    ]
  },
  {
    path: '/student',
    name: 'student',
    component: () => import('../views/home/home.vue'),
    meta:{
      title:'学生管理'
    },
    children:[
      {
        path: '/student/studentList',
        name: 'studentList',
        component: () => import('../views/student/studentList.vue'),
        meta:{
          title:'学生列表'
        },
      },
      {
        path: '/student/addStudent',
        name: 'addStudent',
        component: () => import('../views/student/addStudent.vue'),
        meta:{
          title:'添加学生'
        },
      },
      {
        path: '/volunteer/volunteerList',
        name: 'volunteerList',
        component: () => import('../views/volunteer/volunteerList.vue'),
        meta:{
          title:'学生方案管理'
        },
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404/404.vue'),
    meta:{
      title:'404'
    },
  },
  {
    //任意路由，访问任意路由跳转404
    path: '/:pathMatch(.*)*',
    name: 'Any',
    redirect:'/404',
    meta:{
      title:'任意路由'
    },
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  //滚动行为
  scrollBehavior(){
    return{
      left:0,
      top:0,
    }
  }
})

export default router
