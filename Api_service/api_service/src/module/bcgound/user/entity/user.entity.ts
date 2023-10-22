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
	@Column({ default: 'null.png'})
	header?:string
}