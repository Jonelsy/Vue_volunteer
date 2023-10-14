//定义实体类，用于与数据库形成映射
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty } from '@nestjs/swagger'
//一本文学校
@Entity({ name: 'liberal_school_one_school' })
export class liberal_school_one_school{
	
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id:number
	
	@ApiProperty()
	@Column()
	PreferenceOrder:string
	
	
	@ApiProperty()
	@Column()
	CategoryName:string

	@ApiProperty()
	@Column()
	AdmissionPlanCount:string
	
	@ApiProperty()
	@Column()
	CollegeName:string
	
	@ApiProperty()
	@Column()
	CollegeCode:string
	
	@ApiProperty()
	@Column()
	AdmissionRatio:string
	
	@ApiProperty()
	@Column()
	LowestScoreAdmissionRatio:string
	
	@ApiProperty()
	@Column()
	LowestAdmissionScore:string
	
	@ApiProperty()
	@Column()
	ExpectedApplicantsCount:string
	
	@ApiProperty()
	@Column()
	RegisteredApplicantsCount:string
	
	@ApiProperty()
	@Column()
	Shortfall_Count:string
	
	@ApiProperty()
	@Column()
	AdmissionRegulationsURL:string
	
	@ApiProperty()
	@Column()
	ranking:string

}

//一本文专业
@Entity({ name: 'liberal_school_one_subject' })
export class liberal_school_one_subject{
	
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id:number
	
	@ApiProperty()
	@Column()
	CollegeCode:string
	
		@ApiProperty()
		@Column()
		MajorCode:string
		
		@ApiProperty()
		@Column()
		MajorName:string
		
		@ApiProperty()
		@Column()
		PlanNature:string
		
		@ApiProperty()
		@Column()
		PlannedEnrollmentCount:string
		
		@ApiProperty()
		@Column()
		MajorLowestAdmissionScore:string
		
		@ApiProperty()
		@Column()
		MajorRegisteredApplicantsCount:string
		
		@ApiProperty()
		@Column()
		DurationOfStudy:string
		
		@ApiProperty()
		@Column()
		TuitionFee:string
		
		@ApiProperty()
		@Column()
		LocationOfSchool:string
		
		@ApiProperty()
		@Column()
		MajorNotes:string
		
	
	@ApiProperty()
	@Column()
	ranking:string

}


//二本文学校
@Entity({ name: 'liberal_school_two_school' })
export class liberal_school_two_school{
	
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id:number
	
	@ApiProperty()
	@Column()
	PreferenceOrder:string
	
	
	@ApiProperty()
	@Column()
	CategoryName:string

	@ApiProperty()
	@Column()
	AdmissionPlanCount:string
	
	@ApiProperty()
	@Column()
	CollegeName:string
	
	@ApiProperty()
	@Column()
	CollegeCode:string
	
	@ApiProperty()
	@Column()
	AdmissionRatio:string
	
	@ApiProperty()
	@Column()
	LowestScoreAdmissionRatio:string
	
	@ApiProperty()
	@Column()
	LowestAdmissionScore:string
	
	@ApiProperty()
	@Column()
	ExpectedApplicantsCount:string
	
	@ApiProperty()
	@Column()
	RegisteredApplicantsCount:string
	
	@ApiProperty()
	@Column()
	Shortfall_Count:string
	
	@ApiProperty()
	@Column()
	AdmissionRegulationsURL:string
	
	@ApiProperty()
	@Column()
	ranking:string

}

//二本文专业
@Entity({ name: 'liberal_school_two_subject' })
export class liberal_school_two_subject{
	
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id:number
	
	@ApiProperty()
	@Column()
	CollegeCode:string
	
		@ApiProperty()
		@Column()
		MajorCode:string
		
		@ApiProperty()
		@Column()
		MajorName:string
		
		@ApiProperty()
		@Column()
		PlanNature:string
		
		@ApiProperty()
		@Column()
		PlannedEnrollmentCount:string
		
		@ApiProperty()
		@Column()
		MajorLowestAdmissionScore:string
		
		@ApiProperty()
		@Column()
		MajorRegisteredApplicantsCount:string
		
		@ApiProperty()
		@Column()
		DurationOfStudy:string
		
		@ApiProperty()
		@Column()
		TuitionFee:string
		
		@ApiProperty()
		@Column()
		LocationOfSchool:string
		
		@ApiProperty()
		@Column()
		MajorNotes:string
		
	
	@ApiProperty()
	@Column()
	ranking:string

}


//一本理科学校
@Entity({ name: 'math_school_one_school' })
export class math_school_one_school{
	
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id:number
	
	@ApiProperty()
	@Column()
	PreferenceOrder:string
	
	
	@ApiProperty()
	@Column()
	CategoryName:string

	@ApiProperty()
	@Column()
	AdmissionPlanCount:string
	
	@ApiProperty()
	@Column()
	CollegeName:string
	
	@ApiProperty()
	@Column()
	CollegeCode:string
	
	@ApiProperty()
	@Column()
	AdmissionRatio:string
	
	@ApiProperty()
	@Column()
	LowestScoreAdmissionRatio:string
	
	@ApiProperty()
	@Column()
	LowestAdmissionScore:string
	
	@ApiProperty()
	@Column()
	ExpectedApplicantsCount:string
	
	@ApiProperty()
	@Column()
	RegisteredApplicantsCount:string
	
	@ApiProperty()
	@Column()
	Shortfall_Count:string
	
	@ApiProperty()
	@Column()
	AdmissionRegulationsURL:string
	
	@ApiProperty()
	@Column()
	ranking:string

}

//一本理专业
@Entity({ name: 'math_school_one_subject' })
export class math_school_one_subject{
	
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id:number
	
	@ApiProperty()
	@Column()
	CollegeCode:string
	
		@ApiProperty()
		@Column()
		MajorCode:string
		
		@ApiProperty()
		@Column()
		MajorName:string
		
		@ApiProperty()
		@Column()
		PlanNature:string
		
		@ApiProperty()
		@Column()
		PlannedEnrollmentCount:string
		
		@ApiProperty()
		@Column()
		MajorLowestAdmissionScore:string
		
		@ApiProperty()
		@Column()
		MajorRegisteredApplicantsCount:string
		
		@ApiProperty()
		@Column()
		DurationOfStudy:string
		
		@ApiProperty()
		@Column()
		TuitionFee:string
		
		@ApiProperty()
		@Column()
		LocationOfSchool:string
		
		@ApiProperty()
		@Column()
		MajorNotes:string
		
	
	@ApiProperty()
	@Column()
	ranking:string

}


//二本理科学校
@Entity({ name: 'math_school_two_school' })
export class math_school_two_school{
	
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id:number
	
	@ApiProperty()
	@Column()
	PreferenceOrder:string
	
	
	@ApiProperty()
	@Column()
	CategoryName:string

	@ApiProperty()
	@Column()
	AdmissionPlanCount:string
	
	@ApiProperty()
	@Column()
	CollegeName:string
	
	@ApiProperty()
	@Column()
	CollegeCode:string
	
	@ApiProperty()
	@Column()
	AdmissionRatio:string
	
	@ApiProperty()
	@Column()
	LowestScoreAdmissionRatio:string
	
	@ApiProperty()
	@Column()
	LowestAdmissionScore:string
	
	@ApiProperty()
	@Column()
	ExpectedApplicantsCount:string
	
	@ApiProperty()
	@Column()
	RegisteredApplicantsCount:string
	
	@ApiProperty()
	@Column()
	Shortfall_Count:string
	
	@ApiProperty()
	@Column()
	AdmissionRegulationsURL:string
	
	@ApiProperty()
	@Column()
	ranking:string

}

//二理专业
@Entity({ name: 'math_school_two_subject' })
export class math_school_two_subject{
	
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id:number
	
	@ApiProperty()
	@Column()
	CollegeCode:string
	
		@ApiProperty()
		@Column()
		MajorCode:string
		
		@ApiProperty()
		@Column()
		MajorName:string
		
		@ApiProperty()
		@Column()
		PlanNature:string
		
		@ApiProperty()
		@Column()
		PlannedEnrollmentCount:string
		
		@ApiProperty()
		@Column()
		MajorLowestAdmissionScore:string
		
		@ApiProperty()
		@Column()
		MajorRegisteredApplicantsCount:string
		
		@ApiProperty()
		@Column()
		DurationOfStudy:string
		
		@ApiProperty()
		@Column()
		TuitionFee:string
		
		@ApiProperty()
		@Column()
		LocationOfSchool:string
		
		@ApiProperty()
		@Column()
		MajorNotes:string
		
	
	@ApiProperty()
	@Column()
	ranking:string

}
