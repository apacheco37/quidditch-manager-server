import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DBTYPE, 
  host: process.env.DBHOST,
  port: parseInt(process.env.DBPORT, 10),
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.DBSYNCHRONIZE as boolean
}