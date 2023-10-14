import { Injectable } from '@nestjs/common';
//对数据库进行增删改查需引入如下
import {Repository,Like} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import {Options,Option_school,Option_subject} from './entity/options.entity'

@Injectable()
export class OptionsService {
	//引入各种组件
	constructor(@InjectRepository(Options) private readonly options:Repository<Options>,
	@InjectRepository(Option_school) private readonly option_school:Repository<Option_school>,
	@InjectRepository(Option_subject) private readonly option_subject:Repository<Option_subject>){}
	
	//获取列表
	 async  getOptions(query:{page:number,pageSize:number,name?:string,stuId:number}){
		 const whereCondition = {};
		 if (query.name) {
		   whereCondition['option_name'] = Like(`%${query.name}%`);
		 }
			whereCondition['stu_id'] = query.stuId
		 const data = await this.options.find({
		       where: whereCondition,
		       order: {
		         id: "ASC"
		       },
		       skip: (query.page - 1)* query.pageSize,
		       take:query.pageSize,
		     })
		     const total = await this.options.count({
		       where: whereCondition
		     })
		     return {
		       data,
		       total
		     }
	}
	
	//删
	async delOptions(id:number){
		return await this.options.delete(id).then(res=>{
			if(res.affected===0){
				return{code:1,mes:'志愿不存在,删除失败'}
			}else{
				return{code:0,mes:'删除成功'}
			}
		})
	}
	//增
	async insertOption(option:any){
		const data = new Options()
		data.option_name = option.option_name,
		data.creatTime = option.creatTime||new Date(),
		data.stu_id = option.stu_id,
		await this.options.save(data)
		return{code:0,mes:'添加成功'}
	}
	//改
	async UpdataOption(params:any){
		const data = new Options()
		data.option_name = params.option_name,
		data.creatTime = new Date(),
		data.stu_id = params.stu_id,
		await this.options.update(params.id,data)
		return{code:0,mes:'修改成功'}
	}
	//方案增加学校
	async insertOptionSchool(params:any){
		//先清空所有原本方案
		await this.option_school.delete({option_id:params[0].option_id})
		await this.option_school.save(params);
		return{code:0,mes:'学校同步成功'}
	}
	//方案增加专业
	async insertOptionSubject(params:any){
		//先清空所有原本方案
		await this.option_subject.delete({option_id:params[0].option_id})
		await this.option_subject.save(params);
		return{code:0,mes:'专业同步成功'}
	}
	//方案清除
	async deleteOwnerOption( query:{option_id:number}){
		await this.option_school.delete({option_id:query.option_id})
		await this.option_subject.delete({option_id:query.option_id})
		return{code:0,mes:'清除成功'}
	}
	//获取原本存在方案
	async getOwnOptions(query:{option_id:number}){
		const whereCondition = {}
		whereCondition['option_id'] = query.option_id
		const [school, subject] = await Promise.all([
		  this.option_school.find({
		    where: whereCondition,
		    order: {
		      id: "ASC"
		    },
		  }),
		  this.option_subject.find({
		    where: whereCondition,
		    order: {
		      id: "ASC"
		    },
		  })
		]);
		const result = school.map((item) => ({
		  ...item,
		  children: []
		}));
		const mergedResult = [...result, ...subject];
		return mergedResult
	}
	
	//获取个人方案列表
	async getOwnSchool(query:{page:number,pageSize:number,option_id:number}){
		const queryOptions = {
		    take: query.pageSize,
		    skip: (query.page - 1) * query.pageSize,
			order: {CollegeCode:'ASC' as any},
			where:{ option_id: query.option_id }
		  };
		  const [schools, totalCount] = await this.option_school.findAndCount(queryOptions);
		      const data = await Promise.all(
		        schools.map(async (school) => {
		          const subjects = await this.option_subject.find({
		            where: {option_id:query.option_id,CollegeCode: school.CollegeCode}
		          });
		          school['children'] = subjects;
		          return school
		        }),
		      );
		  	
		  return {
		  	schools:data,
		  	total:totalCount
		  }
	}
	
	
}
