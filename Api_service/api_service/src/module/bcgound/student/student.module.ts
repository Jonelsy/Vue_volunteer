import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
//引入User自定义实体
import {TypeOrmModule} from '@nestjs/typeorm'
import {Liber_Rank, Math_Rank, Student} from './entity/student.entity'
@Module({
	imports:[TypeOrmModule.forFeature([Student]),TypeOrmModule.forFeature([Math_Rank]),TypeOrmModule.forFeature([Liber_Rank])],
	providers: [StudentService],
	controllers: [StudentController]
})
export class StudentModule {}
