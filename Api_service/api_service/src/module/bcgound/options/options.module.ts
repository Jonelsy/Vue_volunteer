import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
//引入自定义实体
import {TypeOrmModule} from '@nestjs/typeorm'
import {Options,Option_school,Option_subject} from './entity/options.entity'

//引入student相关
import {StudentModule} from '../student/student.module'
import {StudentService} from "../student/student.service";
import {Liber_Rank, Math_Rank, Student} from "../student/entity/student.entity"
@Module({
	imports:[TypeOrmModule.forFeature([Options,Option_school,Option_subject,Student,Math_Rank,Liber_Rank]),StudentModule],
  providers: [OptionsService,StudentService],
  controllers: [OptionsController]
})
export class OptionsModule {}
