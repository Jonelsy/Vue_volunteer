
//定义分页查询数据类型

export interface getStudentType{
    name?:string,
    page:number,
    pageSize:number,
    userId:number
}
export interface insertStudentType{
    stu_name:string,
    nation:string,
    stu_age:number|undefined,
    stu_sex:string,
    recore:number|undefined,
    subject:string,
    remark:string,
    user_id:number,
}

export interface updataStudentType{
    id:number,
    stu_name:string,
    nation:string,
    stu_age:number|undefined,
    stu_sex:string,
    recore:number|undefined,
    subject:string,
    remark:string,
    user_id:number,
}