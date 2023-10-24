import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
//引入自定义实体
import {TypeOrmModule} from '@nestjs/typeorm'
import {Option_school,Option_subject} from './entity/file.entity'
@Module({
  imports:[TypeOrmModule.forFeature([Option_school,Option_subject])],
  providers: [ExcelService],
  controllers: [ExcelController]
})
export class ExcelModule {}
