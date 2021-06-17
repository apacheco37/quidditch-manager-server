import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type User = any;

@Injectable()
export class UsersService {
  // TODO: Implement real user retrieval instead of hard-coded users
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
