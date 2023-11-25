import { Injectable } from '@nestjs/common';
//对数据库进行增删改查需引入如下
import {Repository,Like} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import {Math_Rank, Student,Liber_Rank} from './entity/student.entity'
@Injectable()
export class StudentService {
	//引入各种组件
	constructor(@InjectRepository(Student) private readonly student:Repository<Student>,
	@InjectRepository(Math_Rank) private readonly math_rank:Repository<Math_Rank>,
	@InjectRepository(Liber_Rank) private readonly liber_Rank:Repository<Liber_Rank>){}
	
	//增
	async insertStudent(student:any){
		const data = new Student()
		let ranking = []
		//增加时优先获取排名
		if(Number(student.subject)===0){
			ranking = await this.liber_Rank.find({
				where: [{
				    fraction: student.recore,
				  }],
			})
		}else{
			ranking = await this.math_rank.find({
				where: [{
				    fraction: student.recore,
				  }],
			})
		}	
		data.stu_name = student.stu_name
		data.nation = student.nation
		data.stu_age = student.stu_age
		data.stu_sex = student.stu_sex
		data.recore = student.recore
		data.subject = student.subject
		data.remark = student.remark
		data.user_id = student.user_id
		if(ranking.length!==0){
			data.ranking = ranking[0].ranking
			await this.student.save(data)
			return{code:0,mes:'添加成功'}
		}else{
			data.ranking = null
			await this.student.save(data)
			return{code:0,mes:'添加成功，成绩不合法，没有排名，请重新核实'}
		}
		
	}
	
	//获取列表
	 async  getStudent(query:{page:number,pageSize:number,name?:string,userId:number}){
		 const whereCondition = {};
		 if (query.name) {
		   whereCondition['stu_name'] = Like(`%${query.name}%`);
		 }
			whereCondition['user_id'] = query.userId
		 const data = await this.student.find({
		       where: whereCondition,
		       order: {
		         id: "ASC"
		       },
		       skip: (query.page - 1)* query.pageSize,
		       take:query.pageSize,
		     })
		     const total = await this.student.count({
		       where: whereCondition
		     })
		     return {
		       data,
		       total
		     }
	}
	
	//删
	async delStudent(id:number){
		return await this.student.delete(id).then(res=>{
			if(res.affected===0){
				return{code:1,mes:'学生不存在,删除失败'}
			}else{
				return{code:0,mes:'删除成功'}
			}
		})
	}
	//改
	async UpdataStudent(params:any){
		//修改时优先获取排名
		let ranking = []
		if(Number(params.subject)===0){
			ranking = await this.liber_Rank.find({
				where: [{
				    fraction: params.recore,
				  }],
			})
		}else{
			ranking = await this.math_rank.find({
				where: [{
				    fraction: params.recore,
				  }],
			})
		}
		//如果修改的成绩不合法
		if(ranking.length===0){
			return{code:1,mes:'成绩不合法,修改失败'}
		}else{
			params.ranking = ranking[0].ranking
			await this.student.update(params.id,params)
			return{code:0,mes:'修改成功'}
		}
	}

	//获取学生总数，给optionsService使用
	async getTotalStudent(user_id:number){
		const students = await this.student.find({where:{user_id:user_id}})
		const studentTotal = await this.student.count({where:{user_id:user_id}})
		return {
			students,
			studentTotal
		}
	}
}
