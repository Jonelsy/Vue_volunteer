import * as bcrypt from 'bcryptjs'

//加密
export function addexcript(password:string):string{
	return bcrypt.hashSync(password, 8);
}
//解密
export function openexcript(newpassword:string,oldpassword:string):string{
	return bcrypt.compareSync(newpassword, oldpassword);
	//返回布尔
}