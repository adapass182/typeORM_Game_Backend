import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { defaultBoard } from './constants'


@Entity()
export default class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', {nullable:false})
    name: string

    @Column('text', {nullable:false})
    color: string

    @Column('json', {default: defaultBoard})
    board: JSON

}