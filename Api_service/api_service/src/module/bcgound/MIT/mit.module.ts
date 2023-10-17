import { Module } from '@nestjs/common';
import { MitService } from './mit.service';
import { MitController } from './mit.controller';
//引入自定义实体
import {TypeOrmModule} from '@nestjs/typeorm'
import {Mit} from "./entity/mit.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Mit])],
  providers: [MitService],
  controllers: [MitController]
})
export class MitModule {}
