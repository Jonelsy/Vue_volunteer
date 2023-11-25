import { OptionsService } from './options.service'
import {Body, Controller, Get, Param, Post, UseGuards, Query, Inject} from '@nestjs/common';
import {ApiOperation,ApiTags,ApiBody,ApiConsumes, ApiBearerAuth, ApiParam,ApiQuery} from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport';
import {Option_school, Option_subject} from './entity/options.entity'
//引入studentService
import {StudentService} from '../student/student.service'
@Controller('options')
@ApiTags('志愿管理')
export class OptionsController {
	constructor(private OptionsService:OptionsService,
				@Inject(StudentService)private Studentservice:StudentService){}
	
	@Get('getOptions')
	//swagger使用请求头
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiOperation({summary:'获取当前学生志愿列表'})
	@ApiConsumes('application/x-www-form-urlencoded')
	@ApiQuery({ name: 'name', description: '查询名称', required: false, type: String,example:'' })
	@ApiQuery({ name: 'page', description: '页码', required: true, type: Number,example:'1' })
	@ApiQuery({ name: 'pageSize', description: '每页数量', required: true, type: Number,example:'10' })
	@ApiQuery({ name: 'stuId', description: '学生id', required: true, type: Number,example:'1' })
	async getOption(@Query() query:{page:number,pageSize:number,name?:string,stuId:number} ){
		return await this.OptionsService.getOptions(query)
	}
	
	@Get('delOptions/:id')
	@ApiOperation({summary:'学生志愿删除'})
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiParam({ name: 'id', description: '志愿ID' })
	async deleteOption(@Param('id') params:string){
		const id:number = parseInt(params)
		return await this.OptionsService.delOptions(id)
	}
	
	@Post('insertOptions')
	@ApiOperation({summary:'学生志愿新增'})
	@ApiConsumes('application/x-www-form-urlencoded')
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiBody({
		schema:{
			type: 'object',
			properties: {
				option_name: { type: 'string' ,description:'志愿名称',example: 'admin'},
				creatTime: { type: "string", format: "date-time",description:'创建时间',example: '2023-09-22 14:44:25'},
				stu_id: { type: 'number' ,description:'创建学生id',example: 3},
			},
		}
	}) 
	async insertOption(@Body() options:OptionsService){
		return await this.OptionsService.insertOption(options)
	}
	
	@Post('updataOptions')
	@ApiOperation({summary:'改学生的志愿'})
	@ApiConsumes('application/x-www-form-urlencoded')
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiBody({
		schema:{
			type: 'object',
			properties: {
				id:{type: 'number' ,description:'志愿id',example: '1'},
				option_name: { type: 'string' ,description:'姓名',example: 'admin'},
				creatTime: { type: "string", format: "date-time",description:'创建时间',example: ''},
				stu_id: { type: 'number' ,description:'创建用户id',example: 3},
			},
		}
	}) 
	async UpdataUser(@Body() params:any){
		return await this.OptionsService.UpdataOption(params)
	}
	
	
	@Post('insert/OptionSchool')
	@ApiOperation({summary:'志愿学校填入'})
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiConsumes('application/json')
	@ApiBody({ type: [Option_school] }) // 使用 `ApiBody` 装饰器，指定参数为数组对象类型，并引用相应的 DTO 类
	async createItems(@Body() items: Option_school[]){ // 使用 `@Body` 装饰器，接收请求体中的数据
		return await this.OptionsService.insertOptionSchool(items)
	}
	
	
	@Post('insert/OptionSubject')
	@ApiOperation({summary:'志愿专业填入'})
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiConsumes('application/json')
	@ApiBody({ type: [Option_subject] }) // 使用 `ApiBody` 装饰器，指定参数为数组对象类型，并引用相应的 DTO 类
	async createSubject(@Body() items: Option_subject[]){ // 使用 `@Body` 装饰器，接收请求体中的数据
		return await this.OptionsService.insertOptionSubject(items)
	  }
	  
	  
	@Get('get/OwnerOptions')
	@ApiOperation({summary:'院校编辑时获取原本存在数据'})
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiQuery({ name: 'option_id', description: '方案id', required: true, type: Number,example:'1' })
	async getOwnerOptions(@Query() query:{option_id:number} ){ // 使用 `@Body` 装饰器，接收请求体中的数据 
		return await this.OptionsService.getOwnOptions(query)
	  }
	  
	@Get('delete/OwnerOptions')
	@ApiOperation({summary:'清除当前方案数据'})
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiQuery({ name: 'option_id', description: '方案id', required: true, type: Number,example:'1' })
	async deleteOwnerOptions(@Query() query:{option_id:number} ){ // 使用 `@Body` 装饰器，接收请求体中的数据 
		return await this.OptionsService.deleteOwnerOption(query)
	  }
	
	@Get('getOwnSchool')
	//swagger使用请求头
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiOperation({summary:'获取个人方案学校列表'})
	@ApiConsumes('application/x-www-form-urlencoded')
	@ApiQuery({ name: 'page', description: '页码', required: true, type: Number,example:'1' })
	@ApiQuery({ name: 'pageSize', description: '每页数量', required: true, type: Number,example:'10' })
	@ApiQuery({ name: 'option_id', description: '方案id', required: true, type: Number,example:'1' })
	async getOwnOption(@Query() query:{page:number,pageSize:number,option_id:number} ){
		return await this.OptionsService.getOwnSchool(query)
	}
	
	@Get('getHomeList')
	//swagger使用请求头
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiOperation({summary:'获取整体方案数据'})
	@ApiConsumes('application/x-www-form-urlencoded')
	@ApiQuery({ name: 'user_id', description: '用户id', required: true, type: Number,example:'1' })
	async getHome(@Query() query:{user_id:number} ){
		//学生相关总数
		const Students = await this.Studentservice.getTotalStudent(query.user_id)
		//方案相关总数
		const ids = Students.students.map(student => student.id);

		const OptionsTotal = await this.OptionsService.getHomeList(ids)
		//获取option-school中的院校统计
		const OptionsSchool = await this.OptionsService.getOptionSchol()

		return {
			code:0,
			data:{
				StudentsTotal:Students.studentTotal,
				OptionsTotal,
				OptionsSchool
			}
		}
	}
}
