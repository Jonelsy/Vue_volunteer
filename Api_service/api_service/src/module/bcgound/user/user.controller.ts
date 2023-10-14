import { Body, Controller, Get, Param, Post, UseGuards,Headers ,Query} from '@nestjs/common';
import { UserService } from './user.service'
import {ApiOperation,ApiTags,ApiBody,ApiConsumes, ApiBearerAuth, ApiParam,ApiQuery} from '@nestjs/swagger'
import { User } from './entity/user.entity';
import { AuthGuard } from '@nestjs/passport';

//引入加密


@Controller('user')
@ApiTags('用户')

export class UserController {
	constructor(private UserService:UserService){}
	
	@Post('regist')
	@ApiOperation({summary:'用户注册'})
	@ApiConsumes('application/x-www-form-urlencoded')
	@ApiBody({
		schema:{
			type: 'object',
			properties: {
				username: { type: 'string' ,description:'用户名',example: 'admin' },
			    password: { type: 'string' ,description:'密码',example: 'admin'},
			},
		}
	}) 
	async registUser(@Body() user:User){
		return await this.UserService.registUser(user)
	}
	
	

	@Post('login')
	@ApiOperation({summary:'用户登录'})
	@ApiConsumes('application/x-www-form-urlencoded')
	@ApiBody({
		schema:{
			type: 'object',
			properties: {
				username: { type: 'string' ,description:'用户名',example: 'admin' },
			    password: { type: 'string' ,description:'密码',example: 'admin'},
			},
		}
	}) 
	loginUser(@Body() user:User):any{
		return this.UserService.loginUser(user)
	}
	
	//使用守卫
	
	@Get('delete/:id')
	@ApiOperation({summary:'用户删除'})
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiParam({ name: 'id', description: '用户ID' })
	deleteUser(@Param('id') params:string):any{
		let id:number = parseInt(params)
		return this.UserService.deleteUser(id)
	}
	
	
	@Post('updata')
	@ApiOperation({summary:'更新用户'})
	@ApiConsumes('application/x-www-form-urlencoded')
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiBody({
		schema:{
			type: 'object',
			properties: {
				id:{type: 'number' ,description:'id',example: '0' },
				username: { type: 'string' ,description:'用户名',example: 'admin' },
				nickname: { type: 'string' ,description:'昵称',example: 'admin' },
				email: { type: 'string' ,description:'邮箱',example: 'admin@qq.com' },
			},
		}
	})
	async UpdataUser(@Body() params:any){
		return await this.UserService.UpdataUser(params)
	}
	
	
	@Get('getUser')
	//swagger使用请求头
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiOperation({summary:'获取用户列表'})
	@ApiConsumes('application/x-www-form-urlencoded')
	@ApiQuery({ name: 'name', description: '查询名称', required: false, type: String,example:'' })
	@ApiQuery({ name: 'page', description: '页码', required: true, type: Number,example:'1' })
	@ApiQuery({ name: 'pageSize', description: '每页数量', required: true, type: Number,example:'10' })
	async getUser(@Query() query:{page:number,pageSize:number,name?:string} ){
		return await this.UserService.getUser(query)
	}
	
	
	@Get('getUserMsg')
	//swagger使用请求头
	@ApiOperation({summary:'获取用户个人信息'}) 
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	async getUserMes(@Headers('authorization') authorization: string){
		return await this.UserService.getUserMsg(authorization)
	}
	
	
	@Post('insertUser')
	@ApiOperation({summary:'用户新增'})
	@ApiConsumes('application/x-www-form-urlencoded')
	@ApiBody({
		schema:{
			type: 'object',
			properties: {
				username: { type: 'string' ,description:'用户名',example: 'admin' },
				nickname: { type: 'string' ,description:'昵称',example: 'admin' },
				email: { type: 'string' ,description:'邮箱',example: 'admin@qq.com' },
			    password: { type: 'string' ,description:'密码',example: 'admin'},
			},
		}
	}) 
	async insertUser(@Body() user:User){
		return await this.UserService.registUser(user)
	}
	
}
