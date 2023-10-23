export interface  userStoreType {
    users:userType,
    token:string|null
}
export interface userType {
    id?:number;
    username?:string;
    nickname?:string;
    header?:string;
    email?:string;
    password?:string;
}