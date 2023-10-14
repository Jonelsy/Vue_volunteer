//统一管理用户相关接口
import request from "@/axios/index";
import {getOptionType, getOwnOptionType} from "@/api/school/type";

//对外暴露
export const getItems = (data:getOptionType)=>{
    return request.get('/school/getSchool',{
        params:{
            name: data.name,
            page: data.page,
            pageSize: data.pageSize,
            level: data.level,
            subject:data.subject,
            ranking:data.ranking,
        }
    })
}
//获取个人方案中的院校
export const getOwnItems = (data:getOwnOptionType)=>{
    return request.get('/options/getOwnSchool',{
        params:{
            name: data.name,
            page: data.page,
            pageSize: data.pageSize,
            option_id:data.option_id,
        }
    })
}