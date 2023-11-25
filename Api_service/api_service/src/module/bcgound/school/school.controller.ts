import { Controller, Get, UseGuards ,Query} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SchoolService } from './school.service';
import {ApiOperation,ApiTags,ApiConsumes, ApiBearerAuth,ApiQuery} from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport';
@Controller('school')
@ApiTags('学校相关查看接口')
export class SchoolController {
	constructor(private SchoolService:SchoolService){}
	
	@Get('getSchool')
	//swagger使用请求头
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiOperation({summary:'获取学校列表'})
	@ApiConsumes('application/x-www-form-urlencoded')
	@ApiQuery({ name: 'name', description: '查询名称', required: false, type: String,example:'' })
	@ApiQuery({ name: 'page', description: '页码', required: true, type: Number,example:'1' })
	@ApiQuery({ name: 'pageSize', description: '每页数量', required: true, type: Number,example:'10' })
	@ApiQuery({ name: 'subject', description: '0文1理', required: true, type: Number,example:'0' })
	@ApiQuery({ name: 'level', description: '1本2本', required: true, type: Number,example:'1' })
	@ApiQuery({ name: 'ranking', description: '排名', required: false, type: Number,example:'10427' })
	async getOption(@Query() query:{page:number,pageSize:number,name?:string,subject:number,level:number,ranking?:number} ){
		return await this.SchoolService.getSchool(query)
	}


	@Get('getAllSchool')
	//swagger使用请求头
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth('jwt')
	@ApiOperation({summary:'统计一本专业'})
	@ApiConsumes('application/x-www-form-urlencoded')
	async getAllSchool(){
		return await this.SchoolService.getAllSchool()
	}
}
