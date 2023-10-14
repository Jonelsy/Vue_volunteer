//定义实体类，用于与数据库形成映射
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty } from '@nestjs/swagger'

@Entity()
export class Options{
	
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id:number
	
	@ApiProperty()
	@Column()
	option_name:string
	
	
	@ApiProperty()
	@Column('datetime')
	creatTime:Date

	@ApiProperty()
	@Column()
	stu_id:number
}

@Entity({name:'options_school'})
export class Option_school{
	
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id:number
	
	@ApiProperty()
	@Column()
	option_id:number
	
	@ApiProperty()
	@Column()
	CollegeName:string
	
	
	@ApiProperty()
	@Column()
	CollegeCode:string
	
	@ApiProperty()
	@Column()
	ExpectedApplicantsCount:string
	
	@ApiProperty()
	@Column()
	LowestAdmissionScore:string
	
	@ApiProperty()
	@Column()
	AdmissionRatio:string
	
	@ApiProperty()
	@Column()
	PreferenceOrder:string
	
	@ApiProperty()
	@Column()
	AdmissionRegulationsURL:string
	
	@ApiProperty()
	@Column()
	ranking:string

}
@Entity({ name: 'options_subject' })
export class Option_subject{
	
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id:number
	
	@ApiProperty()
	@Column()
	option_id:number
	
	@ApiProperty()
	@Column()
	CollegeCode:string
	
	
	@ApiProperty()
	@Column()
	MajorName:string
	
	@ApiProperty()
	@Column()
	MajorCode:string
	
	@ApiProperty()
	@Column()
	LocationOfSchool:string
	
	@ApiProperty()
	@Column()
	DurationOfStudy:string
	
	@ApiProperty()
	@Column()
	MajorLowestAdmissionScore:string
	
	@ApiProperty()
	@Column()
	PlannedEnrollmentCount:string
	
	@ApiProperty()
	@Column()
	TuitionFee:string
	
	@ApiProperty()
	@Column()
	MajorNotes:string
	
	@ApiProperty()
	@Column()
	ranking:string
}

