import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    BaseEntity,
    Entity,
    Column,
} from "typeorm"

/* eslint-disable */
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("varchar", { length: 320 })
    email!: number

    @CreateDateColumn()
    createdAt!: Date
}
/* eslint-enable */
