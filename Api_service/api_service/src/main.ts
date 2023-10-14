import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//引入swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//引入数据处理
import { urlencoded } from 'express';
async function bootstrap() {
	//启动服务，设置监听端口
  const app = await NestFactory.create(AppModule);
  //配置swagger
  const config = new DocumentBuilder()
      .setTitle('高考志愿填报辅助系统')
      .setDescription('SWAGGER接口文档')
      .setVersion('3.0')
	  .addBearerAuth({
		  type:"http",scheme:"bearer",bearerFormat:"JWT"
	  },'jwt')
      .build();
    const document = SwaggerModule.createDocument(app, config);
	//设置swagger路径
    SwaggerModule.setup('swagger', app, document,{
		swaggerOptions:{
			persistAuthorization: true,
		}
	});
	//配置跨域
	app.enableCors()
	//配置数据处理
	 app.use(urlencoded({ extended: true })); // 添加这行代码
  await app.listen(3000);
}
bootstrap();
