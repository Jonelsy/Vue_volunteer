import {defineStore} from "pinia";
//引入规则
import type {reqLoginType, reqReginType} from "@/api/user/type";
//引入api
import {reqLogin, reqRegin, userinfo} from "@/api/user/index"
import request from "@/axios/index"
let userUserStore = defineStore('User',{
    //保存数据
    state:()=>{
        return{
            token:localStorage.getItem('token'),
            users:{
                userid:0,
            }
        }
    },
    //处理逻辑
    actions:{
        async loginSub(data:reqLoginType){
            localStorage.removeItem('token')
            //调用api中方法
           let result = await reqLogin(data)
            if (Number(result.data.code)===0){
                let token = result.data.data.token
                localStorage.setItem('token',token)
                request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                return Promise.resolve(result.data.mes)
            }else{
                return Promise.reject(new Error(result.data.mes))
            }
        },
        //注册函数
        async signSub(data:reqReginType){
            let result = await reqRegin(data)
            if (Number(result.data.code)===0){
                return 'ok'
            }else{
                return Promise.reject(new Error(result.data.mes))
            }
        },
        //获取用户信息函数
        async userinfos(userId:number){
            return  await userinfo(userId)
        },
    },
    //计算属性
    getters:{

    }
})
export default userUserStore