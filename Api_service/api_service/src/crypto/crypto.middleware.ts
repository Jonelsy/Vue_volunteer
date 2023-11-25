import { Injectable, NestMiddleware } from '@nestjs/common';
//引入加密进入中间件
import {addexcript} from '../until/encription'
@Injectable()
export class CryptoMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
	 req.body.password = addexcript( req.body.password)
    next();
  }
}
