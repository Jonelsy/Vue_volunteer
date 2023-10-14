import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
//引入自定义实体
import {TypeOrmModule} from '@nestjs/typeorm'
import {Options,Option_school,Option_subject} from './entity/options.entity'
@Module({
	imports:[TypeOrmModule.forFeature([Options,Option_school,Option_subject])],
  providers: [OptionsService],
  controllers: [OptionsController]
})
export class OptionsModule {}
