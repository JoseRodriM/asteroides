import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { ApiUrl, ApiUrlById } from 'src/constants';
import { firstValueFrom } from 'rxjs';
import { IAsteroid, IResAsteroid } from 'src/interfaces/asteroids.interface';

@Injectable()
export class AsteroidsService {

    constructor(private readonly asteroidsService: HttpService) { }

    async getAllAsteroids(field?: string, startDate?: string, endDate?: string): Promise<IAsteroid[]> {
        try {
            const res: IResAsteroid = (await firstValueFrom(this.asteroidsService.get(ApiUrl(startDate, endDate)))).data
            const data: IAsteroid[][] = [];
            for (const key in res.near_earth_objects) {
                if (res.near_earth_objects.hasOwnProperty(key)) {
                    data.push(res.near_earth_objects[key])
                }
            }
            const finalData = data.flatMap(asteroid => Object.values(asteroid).flat())
            if (!field) return finalData;
            const allowedFields = ['id', 'name', 'absolute_magnitude_h'];
            if (!allowedFields.includes(field)) {
                throw new Error('Sorting field is not valid')
            }
            let asteroidsOrdererByField: IAsteroid[];
            if (field === 'name' || field === 'id') asteroidsOrdererByField = finalData.sort((a, b) => a[field].localeCompare(b[field]))
            if (field === 'absolute_magnitude_h') asteroidsOrdererByField = finalData.sort((a, b) => a[field] - b[field])
            return asteroidsOrdererByField;
        } catch (e) {
            throw new Error(e)
        }
    }

    async getAsteroidById(id: string) {
        try {
            const res = (await firstValueFrom(this.asteroidsService.get(ApiUrlById(id)))).data
            return res;
        } catch (e) {
            throw new Error(e)
        }
    }
}
