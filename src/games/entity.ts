import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { defaultBoard, listOfColors } from './constants'
import { IsIn } from 'class-validator'

@Entity()
export default class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', {nullable:false})
    name: string

    @IsIn(listOfColors, {
        message: "Woah there! We're a bit conservative with our choice of colors here at `AnL` games - please try to limit yourself to either: red, blue, green, yellow or magenta. Thanks!"
    })
    @Column('text', {nullable:false})
    color: string

    @Column('json', {default: defaultBoard})
    board: JSON

}