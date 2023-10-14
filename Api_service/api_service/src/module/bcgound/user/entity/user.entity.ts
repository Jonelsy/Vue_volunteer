//定义实体类，用于与数据库形成映射
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty } from '@nestjs/swagger'

@Entity()
export class User{
	
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id:number
	
	@ApiProperty()
	@Column()
	username:string
	
	@ApiProperty()
	@Column()
	password:string
	
	@ApiProperty()
	@Column()
	nickname:string
	
	@ApiProperty()
	@Column()
	email:string
	
	@ApiProperty()
	@Column({ default: 'https://img1.baidu.com/it/u=2275056982,1506045372&fm=253&fmt=auto&app=138&f=JPEG?w=510&h=300'})
	header?:string
}