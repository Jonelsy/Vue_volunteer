import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
//文件上传
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    MulterModule.register({
      dest: './uploads' // 设置上传文件保存的目录
    }),
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
