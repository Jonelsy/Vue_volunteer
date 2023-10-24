import {Controller, Get, Header, Query, Res} from '@nestjs/common';
import { Response } from 'express';
import { ExcelService } from './excel.service';
import {ApiOperation, ApiQuery, ApiTags} from "@nestjs/swagger";
@ApiTags('Download')
@Controller('excel')
export class ExcelController {
    constructor(private readonly excelService: ExcelService) {}
    @ApiOperation({ summary: 'Download file' })
    @Get('export')
    @Header('Content-type', 'application/octet-stream')
    @Header('Content-disposition', 'attachment; filename=file.xlsx')
    @ApiQuery({ name: 'option_id', description: '方案id', required: true, type: Number,example:'1' })
    async exportExcel(@Res() res: Response,@Query() query:{option_id:number}) {
        let id = query.option_id
        const data:any = await this.getDataFromDatabase(id); // 获取数据库数据
        const filePath = './xlsxFile/file.xlsx'; // 导出的 Excel 文件路径
        await this.excelService.exportToExcel(data, filePath);

        res.download(filePath); // 返回下载该文件
    }

    // 获取数据库数据的逻辑，需要自己实现
    async getDataFromDatabase(id) {
        // 从数据库中获取数据并返回，这里省略具体实现
        return await this.excelService.getDataFrom(id)
    }
}
