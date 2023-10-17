
import {MitService} from "./mit.service";
import {Body, Controller, Get, Param, Post, UseGuards, Headers, Query, Inject} from '@nestjs/common';
import {ApiOperation,ApiTags,ApiBody,ApiConsumes, ApiBearerAuth, ApiParam,ApiQuery} from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport';
import {Mit} from "./entity/mit.entity";


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
    async getOption(){
        return await this.Mitservice.getList()
    }
}
