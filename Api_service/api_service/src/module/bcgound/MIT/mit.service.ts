import { Injectable } from '@nestjs/common';
//对数据库进行增删改查需引入如下
import {Repository,Like} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import {Mit,MitSum,MitExplain} from "./entity/mit.entity";


@Injectable()
export class MitService {
    constructor(@InjectRepository(Mit) private readonly mit:Repository<Mit>,
                @InjectRepository(MitSum) private readonly Mitsum:Repository<MitSum>,
                @InjectRepository(MitExplain) private readonly Mitexplain:Repository<MitExplain>) {}

    //获取
    async getList(){
        return await this.mit.find({
            order: {
                title_id: "ASC"
            },
        })
    }

    //填入
    async insertMit(params){
       await this.Mitsum.insert(params)
        return{code:0,msg:'填入成功'}
    }

    //获取结果
    async getAnswer(){
        const gradesByType = await this.Mitsum
            .createQueryBuilder('MitSum')
            .select('MitSum.type')
            .addSelect('SUM(MitSum.grade)', 'totalGrade')
            .groupBy('MitSum.type')
            .getRawMany();

        //处理汇总
        let arrs = []

        for (let i =0;i<=gradesByType.length-2;i+=2) {
            if(gradesByType[i].totalGrade<=gradesByType[i+1].totalGrade){
                arrs.push(gradesByType[i+1].MitSum_type)
            }else{
                arrs.push(gradesByType[i].MitSum_type)
            }
        }
        const str = arrs.join('');
        return str;
    }

    //查询适合专业
    async getLikeMajor(params){
        return await this.Mitexplain.find({where:{mit_code:params.code}})
    }
}
