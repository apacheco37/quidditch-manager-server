import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DBHOST,
  port: parseInt(process.env.DBPORT, 10),
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.DBSYNCHRONIZE === 'false',
  // migrationsTableName: "custom_migration_table",
  migrations: [__dirname + "/migrations/*.ts"],
  cli: {
    "migrationsDir": __dirname + "/migrations"
  }
};

module.exports = typeOrmConfig;
