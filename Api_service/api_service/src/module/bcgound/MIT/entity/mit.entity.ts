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