import { Injectable } from '@nestjs/common';
//对数据库进行增删改查需引入如下
import {Repository,Like,LessThan, MoreThan, Between} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import {liberal_school_one_school,liberal_school_one_subject,liberal_school_two_school,liberal_school_two_subject,
math_school_one_school,math_school_one_subject,math_school_two_school,math_school_two_subject} from './entity/school.entity'

@Injectable()
export class SchoolService {
	//引入各种组件
	constructor(@InjectRepository(liberal_school_one_school) private readonly school:Repository<liberal_school_one_school>,
		@InjectRepository(liberal_school_one_subject) private readonly school2:Repository<liberal_school_one_subject>,
		@InjectRepository(liberal_school_two_school) private readonly twoschool_liberal:Repository<liberal_school_two_school>,
		@InjectRepository(liberal_school_two_subject) private readonly twoschool_liberal2:Repository<liberal_school_two_subject>,
		@InjectRepository(math_school_one_school) private readonly math_school_one_school:Repository<math_school_one_school>,
		@InjectRepository(math_school_one_subject) private readonly math_school_one_subject:Repository<math_school_one_subject>,
		@InjectRepository(math_school_two_school) private readonly math_school_two_school:Repository<math_school_two_school>,
		@InjectRepository(math_school_two_subject) private readonly math_school_two_subject:Repository<math_school_two_subject>,){}
	//获取列表
	
	async getSchool(query:{page:number,pageSize:number,name?:string,subject?:number,level:number,ranking?:number}){
		const queryOptions = {
		    take: query.pageSize,
		    skip: (query.page - 1) * query.pageSize,
			order: {CollegeCode:'ASC' as any},
		  };
		if (query.name) {
		    queryOptions['where'] = { CollegeName: Like(`%${query.name}%`) };
		  }
		if (query.ranking) {
		      queryOptions['where'] = { ranking: Between(query.ranking-500,query.ranking+2500)};
		}
		//文科
		
		if(query.subject==0){
			//一本
			if(query.level==1){
				const [schools, totalCount] = await this.school.findAndCount(queryOptions);
				    const data = await Promise.all(
				      schools.map(async (school) => {
				        const subjects = await this.school2.find({
				          where: { CollegeCode: school.CollegeCode },
				        });
				        school['children'] = subjects;
				        return school
				      }),
				    );
					
				return {
					schools:data,
					total:totalCount
				}
			}else{
				//二本文
				const [schools, totalCount] = await this.twoschool_liberal.findAndCount(queryOptions);
				    const data = await Promise.all(
				      schools.map(async (school) => {
				        const subjects = await this.twoschool_liberal2.find({
				          where: { CollegeCode: school.CollegeCode },
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
			
		}else{
			//理科
			//一本
			if(query.level==1){
				const [schools, totalCount] = await this.math_school_one_school.findAndCount(queryOptions);
				    const data = await Promise.all(
				      schools.map(async (school) => {
				        const subjects = await this.math_school_one_subject.find({
				          where: { CollegeCode: school.CollegeCode },
				        });
				        school['children'] = subjects;
				        return school
				      }),
				    );
					
				return {
					schools:data,
					total:totalCount
				}
			}else{
				//二本理科
				const [schools, totalCount] = await this.math_school_two_school.findAndCount(queryOptions);
				    const data = await Promise.all(
				      schools.map(async (school) => {
				        const subjects = await this.math_school_two_subject.find({
				          where: { CollegeCode: school.CollegeCode },
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
	}
}
