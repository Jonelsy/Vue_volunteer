import { Injectable } from '@nestjs/common';
//对数据库进行增删改查需引入如下
import {Repository,Like} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import {Mit} from "./entity/mit.entity";


@Injectable()
export class MitService {
    constructor(@InjectRepository(Mit) private readonly mit:Repository<Mit>) {}

    //获取
    async getList(){
        return await this.mit.find()
    }
}
