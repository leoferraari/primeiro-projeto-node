import { Repository, Not } from 'typeorm';

import DatabaseConfiguration from '@shared/infra/database/DatabaseConfiguration';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUserRepository {

  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = DatabaseConfiguration.getDataSourceInstance().getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    });

    return user;
  }

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        }
      })
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create(userData);

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default UsersRepository;
