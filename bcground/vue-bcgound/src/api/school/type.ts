//定义分页查询数据类型

export interface getOptionType{
    name?:string,
    page:number,
    pageSize:number,
    level:string,
    subject:string,
    ranking?:number|null
}
export interface getOwnOptionType{
    name?:string,
    page:number,
    pageSize:number,
    option_id:number,
}