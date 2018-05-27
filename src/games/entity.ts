import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { defaultBoard, gameColors, listOfColors } from './constants'
import { IsIn, IsOptional, IsString } from 'class-validator';



@Entity()
export default class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column('text', {nullable:false})
    name: string

    @IsOptional()
    @IsIn(listOfColors)
    @Column('text')
    color: gameColors

    @Column('json', {default: defaultBoard, nullable:false})
    board: JSON

}