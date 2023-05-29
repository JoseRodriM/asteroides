import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsteroidsModule } from './asteroids/asteroids.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '',
    port: 3306,
    username: '',
    password: '',
    database: '',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
  }) ,UsersModule, AsteroidsModule],
})
export class AppModule {}
