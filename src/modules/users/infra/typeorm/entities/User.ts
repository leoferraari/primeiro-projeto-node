import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// KISS - Keet it Simple & Stupid - Mantenha simples e estúpido seu código. Um dos princípios da programação.

@Entity('users') //Decorator que é utilizado como uma função. A classe é um parâmetro a ser passado para entidade;
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;