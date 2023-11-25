import { Injectable } from '@nestjs/common';
//对数据库进行增删改查需引入如下
import {Repository,Like} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import {User} from './entity/user.entity'

//引入加密
import {openexcript} from '../../../until/encription'
import {JwtStrategy} from './jwt.strate'

@Injectable()

export class UserService {
	
	//引入各种组件
	constructor(@InjectRepository(User) private readonly user:Repository<User>,
	private readonly jwtService:JwtStrategy){}
	//注册方法
	async registUser(user:any){
		const data = new User()
		data.username = user.username,
		data.password = user.password,
		data.nickname = user.nickname,
		data.email = user.email
		return this.existingUser(data).then( async (res)=>{
			if(res===null){
				await this.user.save(data)
				return{code:0,mes:'注册成功'}
			}
			return{code:1,mes:'用户已存在'}
		})
		
	}
	//登录方法
	async loginUser(user:any){
		const data = new User()
		data.username = user.username
		data.password = user.password
		//先查找用户
		return this.existingUser(data).then(async res=>{
			const subject = openexcript(user.password,res.password)
			const userID = await this.user.find({where: {username: user.username}})
			if(subject){
				const user = res
				return this.createdToken(user).then(res=>{
					return {code:0,data:{token:res,userID:userID[0].id},mes:'登陆成功'}
				})
			}else{
				return{code:1,mes:'密码错误',}
			}
		}).catch(res=>{
			return{code:1,mes:'用户不存在',error:res}
		})
	}
	//创建token
	private async createdToken(user:User){
		return await this.jwtService.validate(user)
	}
	//校验用户是否存在
	async existingUser(user:User):Promise<any>{
		if(user.username){
			return await this.user.findOne({where:{ username: user.username }});
		}else{
			return null
		}

	}
	//删除用户
	async deleteUser(id:number){
		return await this.user.delete(id).then(res=>{
			if(res.affected===0){
				return{code:1,mes:'用户不存在,删除失败'}
			}else{
				//引入删除学生方法
				return{code:0,mes:'删除成功'}
			}
		})
	}
	//更新用户
	async UpdataUser(params:any){
		//先验证有无重复用户名
		return this.existingUser(params).then(async res=>{
			if(res!==null){
				return{code:1,mes:'用户名已存在，请更换后重试'}
			}else{
				await this.user.update(Number(params.id),params)
				return{code:0,mes:'修改成功'}
			}
		})
	}
	//获取列表
	 async  getUser(query:{page:number,pageSize:number,name?:string}){
		 const whereCondition = {};
		 if (query.name) {
		   whereCondition['username'] = Like(`%${query.name}%`);
		 }
		  
		 const data = await this.user.find({
		       where: whereCondition,
		       order: {
		         id: "ASC"
		       },
		       skip: (query.page - 1)* query.pageSize,
		       take:query.pageSize,
		     })
		     const total = await this.user.count({
		       where: whereCondition
		     })
		     return {
		       data,
		       total
		     }
	}
	//根据touken获取用户个人信息
	async getUserMsg(userId:number){
		return await this.user.findOne({where:{ id: userId }});
	}
}
