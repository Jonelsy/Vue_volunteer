import { Module, NestModule } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
//引入User自定义实体
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from '../user/entity/user.entity'
import {  MiddlewareConsumer } from '@nestjs/common/interfaces';

//引入加密中间件
import {CryptoMiddleware} from '../../../crypto/crypto.middleware'
//引入jwt
import { JwtStrategy } from './jwt.strate';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONTANT } from './jwt.contant';

@Module({
	imports:[TypeOrmModule.forFeature([User]),JwtModule.register({secret:JWT_CONTANT.secrte})],
	providers: [UserService,JwtStrategy],
	controllers: [UserController]
})
//继承NestMuodule实现中间件
export class UserModule implements NestModule{
	configure(comsumer:MiddlewareConsumer){
		comsumer.apply(CryptoMiddleware)
		.forRoutes('user/regist','user/insertUser');//针对注册模块
	}
}
