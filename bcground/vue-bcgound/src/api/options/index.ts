//统一管理用户相关接口
import request from "@/axios/index";
//引入数据规则
import type {getOptionType} from "@/api/options/type";
import {insertOptionSchoolType, insertOptionSubjectType, insertOptionType, updataOptionType} from "@/api/options/type";


//对外暴露
export const getOption = (data:getOptionType)=>{
    return request.get('/options/getOptions',{
        params:{
            name: data.name,
            page: data.page,
            pageSize: data.pageSize,
            stuId: data.stuId
        }
    })


}

export const delOption = (id:number)=>{
    return request.get('/options/delOptions/'+id)
}
export const insertOption = (data:insertOptionType)=>{
    return request.post('/options/insertOptions',data)
}
export const updataOption = (data:updataOptionType)=>{
    return request.post('/options/updataOptions',data)
}
//志愿新增学校
export const insertOptionSchool = (data:insertOptionSchoolType[])=>{
    return request.post('/options/insert/OptionSchool',JSON.stringify(data),{
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
//志愿新增专业
export const insertOptionSubject = (data:insertOptionSubjectType)=>{
    return request.post('/options/insert/OptionSubject',JSON.stringify(data),{
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
//获取已经选择院校
export const getOwnerOptions = (data:number)=>{
    return request.get('/options/get/OwnerOptions',{
        params: {
            option_id:data
        }
    })
}
//清除档案方案数据
export const delOwnerOptions = (data:number)=>{
    return request.get('/options/delete/OwnerOptions',{
        params: {
            option_id:data
        }
    })
}