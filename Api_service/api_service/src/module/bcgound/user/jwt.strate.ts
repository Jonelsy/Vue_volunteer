
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JWT_CONTANT } from './jwt.contant';
import { User } from './entity/user.entity';
import { PassportStrategy } from '@nestjs/passport';
import { sign,verify,decode } from 'jsonwebtoken';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONTANT.secrte,
    });
  }
//加密token
  async validate(payload:User) {
    const token = sign({ userId: payload.id, username: payload.username ,email:payload.email,header:payload.header,nickname:payload.nickname}, JWT_CONTANT.secrte, {
          expiresIn: '10h', // 设置 token 过期时间
        });
        return token;
  }
  //解密token
  async openvalidate(authorization:string) {
   try {
         const token = authorization.split(' ')[1]; // 假设 token 格式为 "Bearer <token>"
         // 验证和解析 token
         const decodedToken:any = verify(token, JWT_CONTANT.secrte);
         // 从解析后的 token 中获取用户信息
         const userid = decodedToken.userId;
         const username = decodedToken.username;
		 const email = decodedToken.email
		 const header = decodedToken.header
		 const nickname = decodedToken.nickname
         // 返回包含用户信息的对象
         return { userid, username,email,header,nickname };
       } catch (error) {
         // 处理验证或解析失败的情况，返回错误信息
         return { error: 'token错误' };
       }
  }
 
}