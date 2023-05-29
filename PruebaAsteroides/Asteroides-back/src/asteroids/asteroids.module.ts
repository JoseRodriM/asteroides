import { Module } from '@nestjs/common';
import { AsteroidsService } from './services/asteroids.service';
import { AsteroidsController } from './controllers/asteroids.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AsteroidsService],
  controllers: [AsteroidsController]
})
export class AsteroidsModule {}
