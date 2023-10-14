//统一管理用户相关接口
import request from "@/axios/index";
//引入数据规则
import type {reqLoginresPonse, reqLoginType, reqReginType, reqReginresPonse, updateUserType} from "@/api/user/type";
import {getUserType, insertUserType} from "@/api/user/type";

//对外暴露方法
export const reqLogin = (data:reqLoginType)=>{
    return request.post<any,reqLoginresPonse>('/user/login',data)
}

export const reqRegin = (data:reqReginType)=>{
    return request.post<any,reqReginresPonse>('/user/regist',data)
}

export const userinfo = ()=>{
    return request.get('/user/getUserMsg')
}

export const getUser = (data:getUserType)=>{
    return request.get('/user/getUser',{
        params:{
            name: data.name,
            page: data.page,
            pageSize: data.pageSize
        }
    })
}


export const deleteUser = (id:number)=>{
    return request.get('/user/delete/'+id)
}

//新增
export const insertUser = (data:insertUserType)=>{
    return request.post('/user/insertUser',data)
}
//修改
export const updateUser = (data:updateUserType)=>{
    return request.post('/user/updata',data)
}