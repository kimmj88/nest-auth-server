import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  createUser(user?): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUser(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
  async updateUser(email, _user) {
    const user = await this.getUser(email);
    user.password = _user.password;
    user.username = _user.username;
    this.userRepository.save(user);
  }

  deleteUser(email: any) {
    return this.userRepository.delete({ email });
  }
}
