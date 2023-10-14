
//定义分页查询数据类型

export interface getOptionType{
    name?:string,
    page:number,
    pageSize:number,
    stuId:number
}
export interface insertOptionType{
    option_name:string,
    creatTime?:string,
    stu_id:number,
}

export interface updataOptionType{
    id:number,
    option_name:string,
    creatTime?:string,
    stu_id:number,
}
//定义传递方案院校参数
export interface insertOptionSchoolType{
    id?:number
    option_id:number
    CollegeName?:string
    CollegeCode?:string
    ExpectedApplicantsCount?:string
    LowestAdmissionScore?:string
    AdmissionRatio?:string
    ranking?:string
    PreferenceOrder?:string
}
//定义传递方案专业参数
export interface insertOptionSubjectType{
    id?:number,
    option_id:number,
}