import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm'

export abstract class BasicEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}