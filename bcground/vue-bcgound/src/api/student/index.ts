//统一管理用户相关接口
import request from "@/axios/index";
//引入数据规则
import type {getStudentType,insertStudentType} from "@/api/student/type";
import {updataStudentType} from "@/api/student/type";


//对外暴露
export const getStudent = (data:getStudentType)=>{
    return request.get('/student/getStudent',{
        params:{
            name: data.name,
            page: data.page,
            pageSize: data.pageSize,
            userId: data.userId
        }
    })
}

export const delStudent = (id:number)=>{
    return request.get('/student/delStudent/'+id)
}

export const insertStudent = (data:insertStudentType)=>{
    return request.post('/student/insertStudent',data)
}

export const updataStudent = (data:updataStudentType)=>{
    return request.post('/student/updataStudent',data)
}