import { FileEntity } from "src/files/entities/file.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;

    @Column()
    email: string;
    
    @Column()
    password: string;

    @OneToMany(() => FileEntity, file => file.user)
    files: FileEntity[]
}
