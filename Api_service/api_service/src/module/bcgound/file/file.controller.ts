import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
//引入文件上传
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
@Controller('file')
@ApiTags('文件上传')
export class FileController {
    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'File Upload',
        type: 'formData',
        required: true,
    })
    @UseInterceptors(FileInterceptor('pic',{
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const originalName = file.originalname;
                const fileExtName = extname(originalName);
                const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                callback(null, `${randomName}${fileExtName}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            // Add your file filter logic here
            callback(null, true);
        },
    })) // 指定上传的文件字段名
    async uploadFile(@UploadedFile() file) {
        const fileName = file.filename;
        const fileNameWithExt = `${fileName}`;
        return {code:0,data:fileNameWithExt,msg:'上传成功'} // 可以打印出上传的文件信息
    }

}
