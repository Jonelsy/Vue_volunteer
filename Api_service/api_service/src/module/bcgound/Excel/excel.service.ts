import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import {Option_school,Option_subject} from './entity/file.entity'
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
@Injectable()
export class ExcelService {
    constructor(@InjectRepository(Option_school) private readonly option_school:Repository<Option_school>,
                @InjectRepository(Option_subject) private readonly option_subject:Repository<Option_subject>){}
    async exportToExcel(data: any[], filePath: string): Promise<void> {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data');
        // 设置表格标题
        const headers = Object.keys(data[0]);
        worksheet.getRow(1).values = headers;

        // 插入数据
        data.forEach((item, index) => {
            const row = worksheet.getRow(index + 2);
            headers.forEach((header, i) => {
                row.getCell(i + 1).value = item[header];
            });
        });
        await workbook.xlsx.writeFile(filePath);
    }
    //获取数据库数据
        async getDataFrom(id){
            const whereCondition = {}
            whereCondition['option_id'] = id
            const [school, subject] = await Promise.all([
                this.option_school.find({
                    where: whereCondition,
                    order: {
                        id: "ASC"
                    },
                }),
                this.option_subject.find({
                    where: whereCondition,
                    order: {
                        id: "ASC"
                    },
                })
            ]);
            const result = school.map((item) => ({
                ...item,
                children: []
            }));
            const mergedResult = [...result, ...subject];
            return mergedResult
        }

}
