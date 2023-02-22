import { v4 as uuidv4 } from 'uuid';
import IUserTokensRepository from '../IUserTokensRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUsersRepository implements IUserTokensRepository {

  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuidv4(),
      token: uuidv4(),
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default FakeUsersRepository;
