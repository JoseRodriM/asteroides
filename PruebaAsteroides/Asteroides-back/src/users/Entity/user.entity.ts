import { BasicEntity } from 'src/config/basic.entity';
import { Entity, Column } from 'typeorm'

@Entity()
export class User extends BasicEntity {
    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column('simple-array',{nullable: true})
    favoriteAsteroids: string[]
}