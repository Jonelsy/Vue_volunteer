import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UserModule } from './module/bcgound/user/user.module';
//注册redis模块目前作者不更新，只能慢慢等了
// import { RedisModule, RedisModuleOptions } from 'nestjs-redis'

import { StudentModule } from './module/bcgound/student/student.module';
import { OptionsModule } from './module/bcgound/options/options.module';
import { SchoolModule } from './module/bcgound/school/school.module';
import { MitModule } from './module/bcgound/mit/mit.module';
import { FileModule } from './module/bcgound/file/file.module';
import { ExcelModule } from './module/bcgound/excel/excel.module';




// const options:RedisModuleOptions = {
// 	port:6379,
// 	name:"redisOptions",
// 	host:'127.0.0.1'
// }

@Module({
  imports: [DbModule, UserModule, StudentModule, OptionsModule, SchoolModule, MitModule, FileModule, ExcelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
