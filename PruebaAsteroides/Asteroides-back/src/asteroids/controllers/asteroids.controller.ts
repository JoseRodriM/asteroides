import { Controller, Get, Query, Param } from '@nestjs/common';
import { AsteroidsService } from '../services/asteroids.service';

@Controller('asteroids')
export class AsteroidsController {

    constructor(private readonly asteroidsService: AsteroidsService) { }

    @Get()
    getAllAsteroids(@Query('sortingCriteria') field?: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string) {
        return this.asteroidsService.getAllAsteroids(field, startDate, endDate)
    }

    @Get('by-asteroid-id/:id')
    getAsteroidById(@Param('id') id: string) {
        return this.asteroidsService.getAsteroidById(id)
    }
}
