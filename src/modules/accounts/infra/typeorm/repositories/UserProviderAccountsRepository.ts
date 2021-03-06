import { getRepository, Repository } from 'typeorm';

import ICreateUserProviderAccountDTO from '@modules/accounts/dtos/ICreateUserProviderAccountDTO';
import IUserProviderAccountsRepository from '@modules/accounts/repositories/IUserProviderAccountsRepository';
import UserProviderAccount from '../entities/UserProviderAccount';

class UserProviderAccountsRepository
  implements IUserProviderAccountsRepository {
  private ormRepository: Repository<UserProviderAccount>;

  constructor() {
    this.ormRepository = getRepository(UserProviderAccount);
  }

  public async create({
    account_type_id,
    user,
  }: ICreateUserProviderAccountDTO): Promise<UserProviderAccount> {
    const userProviderAccount = this.ormRepository.create({
      account_type_id,
      userAccount: {
        account_type_id,
        user,
      },
    });

    await this.ormRepository.save(userProviderAccount);

    return userProviderAccount;
  }

  public async find(): Promise<UserProviderAccount[]> {
    return this.ormRepository.find();
  }

  public async findByUserId(
    user_id: string,
  ): Promise<UserProviderAccount | undefined> {
    const providers = await this.ormRepository.find();

    const result = providers.find(
      provider => provider.userAccount.user_id === user_id,
    );

    return result;
  }
}

export default UserProviderAccountsRepository;
