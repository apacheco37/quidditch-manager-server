import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findUser(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ username });
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = {
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password
    }
    return this.usersRepository.save(user);
  }
}
