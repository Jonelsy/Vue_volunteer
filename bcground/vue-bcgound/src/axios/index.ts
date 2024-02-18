import axios from 'axios';
import {ElMessage} from 'element-plus'

const request = axios.create({
    // 在这里可以配置基本的 baseURL、headers 等
    baseURL: 'http://127.0.0.1:3030',
    timeout: 5000,
    headers: {
        // 在这里可以设置其他的请求头
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization':'Bearer'+ ' '+localStorage.getItem('token'),
        'Cache-Control':'no-store',
    }
});

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 在发送请求之前做一些操作，比如添加 token、修改 headers 等
        // 从本地存储中获取token
        const token = localStorage.getItem('token');
        // 更新请求头中的token
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        // 对请求错误做处理
        console.log('qingqiu'+error)
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    response => {
        // 对响应数据做一些操作，比如处理错误码、处理数据结构等
        if(response.data.code==1){
            return Promise.reject(response)
        }
        return response;
    },
    error => {
        // 对响应错误做处理
        let msg = ''
        let code = error.response.status
        if (error.message == "Network Error"){
            msg = '网络错误'
        }else{
            msg=error.message
        }
        switch (code){
            case 401:
                msg ='token过期'
                break;
            case 403:
                msg='token无权限'
                break;
            case 404:
                msg='请求地址错误'
                break;
            case 500:
                msg='请打死后端程序员'
                break;
            default:
                msg='未知错误'
        }
        ElMessage({
            type:"error",
            message:msg,
        })
        return Promise.reject(error)
    }
);
export default request;