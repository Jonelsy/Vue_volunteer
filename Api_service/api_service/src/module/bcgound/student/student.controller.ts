
import { StudentService } from './student.service'
import { Body, Controller, Get, Param, Post, UseGuards,Headers ,Query} from '@nestjs/common';
import {ApiOperation,ApiTags,ApiBody,ApiConsumes, ApiBearerAuth, ApiParam,ApiQuery} from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport';
@Controller('student')
@ApiTags('学生')
export class StudentController {
	constructor(private StudentService:StudentService){}
	
	@Post('insertStudent')
	@ApiOperation({summary:'学生新增'})
	@ApiConsumes('application/x-www-form-urlencoded')
	@ApiBody({
		schema:{
			type: 'object',
			properties: {
				stu_name: { type: 'string' ,description:'姓名',example: 'admin'},
				nation: { type: 'string' ,description:'民族',example: '汉族'},
				stu_age: { type: 'number' ,description:'年龄',example: 19 },
			    stu_sex: { type: 'number' ,description:'性别',example: 0},
				recore: { type: 'number' ,description:'成绩',example: 500},
				subject: { type: 'number' ,description:'文理',example: 0},
				remark: { type: 'string' ,description:'备注',example: '无'},
				user_id: { type: 'number' ,description:'创建用户id',example: 3},
			},
		}
	}) 
	async insertStudent(@Body() student:StudentService){
		return await this.StudentService.insertStudent(student)
	}
	
	@Get('getStudent')
	//swagger使用请求头
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiOperation({summary:'获取学生列表'})
	@ApiConsumes('application/x-www-form-urlencoded')
	@ApiQuery({ name: 'name', description: '查询名称', required: false, type: String,example:'' })
	@ApiQuery({ name: 'page', description: '页码', required: true, type: Number,example:'1' })
	@ApiQuery({ name: 'pageSize', description: '每页数量', required: true, type: Number,example:'10' })
	@ApiQuery({ name: 'userId', description: '用户id', required: true, type: Number,example:'3' })
	async getUser(@Query() query:{page:number,pageSize:number,name?:string,userId:number} ){
		
		return await this.StudentService.getStudent(query)
	}
	
	
	@Get('delStudent/:id')
	@ApiOperation({summary:'学生删除'})
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiParam({ name: 'id', description: '学生ID' })
	async deleteUser(@Param('id') params:string){
		let id:number = parseInt(params)
		return await this.StudentService.delStudent(id)
	}
	
	
	@Post('updataStudent')
	@ApiOperation({summary:'改学生'})
	@ApiConsumes('application/x-www-form-urlencoded')
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiBody({
		schema:{
			type: 'object',
			properties: {
				id:{type: 'number' ,description:'学生id',example: '1'},
				stu_name: { type: 'string' ,description:'姓名',example: 'admin'},
				nation: { type: 'string' ,description:'民族',example: '汉族'},
				stu_age: { type: 'number' ,description:'年龄',example: 19 },
			    stu_sex: { type: 'number' ,description:'性别',example: 0},
				recore: { type: 'number' ,description:'成绩',example: 500},
				subject: { type: 'number' ,description:'文理',example: 0},
				remark: { type: 'string' ,description:'备注',example: '无'},
				user_id: { type: 'number' ,description:'创建用户id',example: 3},
			},
		}
	}) 
	async UpdataUser(@Body() params:any){
		return await this.StudentService.UpdataStudent(params)
	}
}
