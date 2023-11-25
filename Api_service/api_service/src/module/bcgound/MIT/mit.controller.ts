
import {MitService} from "./mit.service";
import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {ApiOperation,ApiTags,ApiBody,ApiConsumes, ApiBearerAuth} from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport';


@Controller('mit')
@ApiTags('mit测试')
export class MitController {
    constructor(private Mitservice:MitService) {}

    @Get('getMitList')
    //swagger使用请求头
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('jwt')
    @ApiOperation({summary:'获取试题'})
    @ApiConsumes('application/x-www-form-urlencoded')
    async getMitList(){
        return await this.Mitservice.getList()
    }

    @Post('insertMitAnswer')
    @ApiOperation({summary:'回答mit测试接口'})
    @ApiConsumes('application/x-www-form-urlencoded')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('jwt')
    @ApiBody({
        schema:{
            type: 'object',
            properties: {
                id:{type: 'number' ,description:'id',example: '1'},
                title: { type: 'string' ,description:'题目',example: 'xxxxx'},
                title_id: {type: 'number' ,description:'题目id',example: '1'},
                question: { type: 'string' ,description:'答案',example: 'xxxxx'},
                grade:{type: 'number' ,description:'成绩',example: '5'},
                type: { type: 'string' ,description:'所属类型',example: 'E'},
            },
        }
    })
    async answerMit(@Body() params:any){
        return await this.Mitservice.insertMit(params)
    }

    @Get('getGrade')
    //swagger使用请求头
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('jwt')
    @ApiOperation({summary:'获取测试结果'})
    @ApiConsumes('application/x-www-form-urlencoded')
    async getMitGrade(){
        return await this.Mitservice.getAnswer()
    }

    @Post('MitAnswer')
    @ApiOperation({summary:'根据mit代码回答适合科目'})
    @ApiConsumes('application/x-www-form-urlencoded')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('jwt')
    @ApiBody({
        schema:{
            type: 'object',
            properties: {
                code: { type: 'string' ,description:'类型代码',example: 'ISTJ'},
            },
        }
    })
    async MitAnswer(@Body() params:any){
        return await this.Mitservice.getLikeMajor(params)
    }

    @Get('clearMit')
    //swagger使用请求头
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('jwt')
    @ApiOperation({summary:'清除临时计算表结果'})
    @ApiConsumes('application/x-www-form-urlencoded')
    async clearMitGrade(){
        return await this.Mitservice.clearMitSum()
    }
}
