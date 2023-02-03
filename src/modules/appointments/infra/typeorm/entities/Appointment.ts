import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';


import User from '@modules/users/infra/typeorm/entities/User';

/**
 * Um para um (OneToOne)
 * Um para muitos (OneToMany)
 * Muitos para Muitos (ManyToMany)
 */

@Entity('appointments') //Decorator que é utilizado como uma função. A classe é um parâmetro a ser passado para entidade;
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    //Muitos agendamentos para um usuário.
    //Em usuários vai ficar OneToMany.
    @ManyToOne(() => User)
    @JoinColumn({name: 'provider_id'})
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;
