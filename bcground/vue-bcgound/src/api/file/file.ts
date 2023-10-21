import request from "@/axios/index";

//对外文件上传
export const uploadFile = (data:any)=>{
    return request.post('/file',data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}