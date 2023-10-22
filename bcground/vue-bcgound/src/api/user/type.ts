//定义用户登录数据类型
export interface reqLoginType{
    username:string,
    password:string,
}
export interface dataType{
    code:string,
    data:tokenType,
    mes:string,
}
export interface tokenType{
    token:string,
    userid:number,
}
//定义登陆后返回数据类型
export interface reqLoginresPonse{
    data:dataType
}
//定义注册提交数据类型
export interface reqReginType{
    username:string,
    password:string,
    repassword:string,
    email:string,
}
//定义注册后返回数据类型\
export interface dataReginType{
    code:number,
    mes:string
}
export interface reqReginresPonse{
    data:dataReginType
}
//定义分页查询数据类型
export interface getUserType{
    name?:string,
    page:number,
    pageSize:number
}
//定义新增
export interface insertUserType{
    username:string,
    nickname:string
    email:string,
    password:string
}

//定义修改
export interface updateUserType{
    username?:string,
    nickname:string
    email:string,
    id:number | null,
    header?:string
}