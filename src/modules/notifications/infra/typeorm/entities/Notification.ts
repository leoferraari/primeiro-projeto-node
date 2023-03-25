import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity('notifications')
class Notification {
  @Column()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  recipient_id: string;

  @Column()
  content: string;

  @Column()
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;
