import request from "@/axios/index";

//对外暴露
export const getHomeItem = (user_id:number)=>{
    return request.get('/options/getHomeList',{
        params:{
            user_id
        }
    })
}