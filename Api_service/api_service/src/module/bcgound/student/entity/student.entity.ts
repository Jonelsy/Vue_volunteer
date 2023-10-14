//定义实体类，用于与数据库形成映射
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty } from '@nestjs/swagger'
//学生实体类
@Entity()
export class Student{
	
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id:number
	
	@ApiProperty()
	@Column()
	stu_name:string
	
	@ApiProperty()
	@Column()
	nation?:string
	
	@ApiProperty()
	@Column()
	stu_age?:number
	
	@ApiProperty()
	@Column()
	stu_sex:number
	
	@ApiProperty()
	@Column()
	recore:number
	
	@ApiProperty()
	@Column()
	subject:number
	
	@ApiProperty()
	@Column()
	remark?:number
	
	@ApiProperty()
	@Column()
	user_id:number
	
	@ApiProperty()
	@Column()
	ranking?:number
}
//排名实体类
@Entity({ name: 'math_ranking_table' })
export class Math_Rank{
	
	@ApiProperty()
	@PrimaryGeneratedColumn()
	fraction:number
	
	
	@ApiProperty()
	@Column()
	ranking:number
	
}
@Entity({ name: 'liberal_ranking_table' })
export class Liber_Rank{
	
	@ApiProperty()
	@PrimaryGeneratedColumn()
	fraction:number
	
	
	@ApiProperty()
	@Column()
	ranking:number
	
}