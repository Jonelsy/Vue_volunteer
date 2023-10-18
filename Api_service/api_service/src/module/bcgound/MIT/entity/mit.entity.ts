//定义实体类，用于与数据库形成映射
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty } from '@nestjs/swagger'

@Entity()
export class Mit{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number

    @ApiProperty()
    @Column()
    title_id:number


    @ApiProperty()
    @Column()
    title:string

    @ApiProperty()
    @Column()
    question:string

    @ApiProperty()
    @Column()
    type:string
}

@Entity()
export class MitSum{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number

    @ApiProperty()
    @Column()
    title_id:number


    @ApiProperty()
    @Column()
    title:string

    @ApiProperty()
    @Column()
    question:string

    @ApiProperty()
    @Column()
    type:string

    @ApiProperty()
    @Column()
    grade:number
}

@Entity()
export class MitExplain{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number

    @ApiProperty()
    @Column()
    mit_code:string


    @ApiProperty()
    @Column()
    mit_name:string

    @ApiProperty()
    @Column()
    mit_text:string

    @ApiProperty()
    @Column()
    major_change:string
}