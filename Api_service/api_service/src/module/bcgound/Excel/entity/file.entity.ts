import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity({name:'options_school'})
export class Option_school{

    @ApiProperty()
    @Column()
    id:number
    //这是主键
    @ApiProperty()
    @PrimaryGeneratedColumn()
    optionSchool_id:number

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
    @Column()
    id:number
    //下方主键
    @ApiProperty()
    @PrimaryGeneratedColumn()
    optionSubject_id:number

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