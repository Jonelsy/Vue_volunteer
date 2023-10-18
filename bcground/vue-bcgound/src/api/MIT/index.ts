import request from "@/axios/index";

import { mitList} from "@/api/MIT/type";

//对外暴露
export const getMitList = ()=>{
    return request.get('/mit/getMitList')
}
//回答问题调用
export const AnswerMit = (data:mitList)=>{
    return request.post('/mit/insertMitAnswer',data)
}
//获取类型调用
export const getGard = ()=>{
    return request.get('/mit/getGrade')
}