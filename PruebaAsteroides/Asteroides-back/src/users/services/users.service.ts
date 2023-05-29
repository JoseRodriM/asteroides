import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../Entity/user.entity';
import { UpdateFavAsterUserDTO, UserDTO } from '../dto/user.dto';
import { hash, compare } from 'bcrypt'
import { saltOrRounds } from 'src/constants';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async registerUser(user: UserDTO) {
        const { username, password } = user;
        try {
            const userFound = await this.userRepository.findOne({ where: { username } })
            if (userFound) {
                throw new HttpException('User already exists', 409)
            } else {
                const hashedPassword = await hash(password, saltOrRounds)
                const newUser = { username, password: hashedPassword }
                const savedUser = await this.userRepository.save(newUser)
                return { id: savedUser.id, username: savedUser.username }
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    async loginUser(user: UserDTO) {
        const { username, password } = user;
        try {
            const userFound = await this.userRepository.findOne({ where: { username } })
            if (!userFound) throw new HttpException('User is not registered', 404)
            const correctPassword = await compare(password, userFound.password)
            if (!correctPassword) {
                throw new HttpException('Wrong password', 409)
            }
            return { id: userFound.id, username: userFound.username, favoriteAsteroids: userFound.favoriteAsteroids }

        } catch (e) {
            throw new Error(e)
        }
    }

    async getUserById(id: string) {
        try {
            const userFound = await this.userRepository.findOne({ where: { id } })
            if (!userFound) throw new HttpException('User not found', 404)
            const user = new User()
            user.id = userFound.id
            user.username = userFound.username
            user.favoriteAsteroids = userFound.favoriteAsteroids
            return user;
        } catch (e) {
            throw new Error(e)
        }
    }

    async saveFavoriteAsteroidIdByUserId(data: UpdateFavAsterUserDTO) {
        const { id, favoriteAsteroidId } = data
        try {
            const userFound = await this.getUserById(id);
            const isAlreadyFavorite = userFound.favoriteAsteroids?.includes(favoriteAsteroidId)
            if (!isAlreadyFavorite) {
                userFound.favoriteAsteroids = [...(userFound.favoriteAsteroids || []), favoriteAsteroidId];
            } else {
                const favoritesAstroidesIdsFiltered = userFound.favoriteAsteroids.filter(id => id !== favoriteAsteroidId)
                userFound.favoriteAsteroids = favoritesAstroidesIdsFiltered
            }
            await this.userRepository.save(userFound);
            const userUpdated = await this.getUserById(id);
            return userUpdated;
        } catch (e) {
            throw new Error(e)
        }
    }

}
