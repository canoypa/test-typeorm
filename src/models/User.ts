import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number

    @Column('text', {nullable: false})
    firstName: string

    @Column('text', {nullable: false})
    lastName: string

    @Column('int', {nullable: false})
    age: number
}
