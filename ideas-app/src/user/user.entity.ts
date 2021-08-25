import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IdeaEntity } from "src/idea/idea.entity";
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { truncateSync } from "fs";
import { UserRO } from "./user.dto";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    created: Date

    @Column({
        type: 'text',
        unique: true
    })
    username: string

    @Column('text')
    password: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)

    }

    toResponseObject(showToken: boolean = true): UserRO {
        const { id, created, username, token } = this;
        const responseObject: UserRO = {
            id,
            created,
            username,
        };
        return responseObject;
    }

    async comparePassword(attemt: string) {
        return await bcrypt.compare(attemt, this.password)
    }

    private get token() {
        const { id, username } = this;
        return jwt.sign({
            id, username
        }, process.env.SECRET, { expiresIn: '7d' })
    }


}