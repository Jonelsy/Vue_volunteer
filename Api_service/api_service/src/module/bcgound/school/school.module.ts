import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
//引入自定义实体
import {TypeOrmModule} from '@nestjs/typeorm'
import {liberal_school_one_school,liberal_school_one_subject,liberal_school_two_school,liberal_school_two_subject,math_school_one_school, math_school_one_subject,
math_school_two_school,math_school_two_subject} from './entity/school.entity'
@Module({
	imports:[TypeOrmModule.forFeature([liberal_school_one_school,liberal_school_one_subject,
	liberal_school_two_school,liberal_school_two_subject,
	math_school_one_school,math_school_one_subject,
	math_school_two_school,math_school_two_subject])],
  controllers: [SchoolController],
  providers: [SchoolService]
})
export class SchoolModule {}
