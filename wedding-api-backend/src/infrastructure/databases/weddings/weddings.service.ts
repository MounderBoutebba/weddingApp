import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeddingsRepository } from './weddings.repository';
import { WeddingEntity } from '../entities/wedding.entity';
import { UsersServices } from '../users/users.service';
import { ClientEntity } from '../entities/user.entity';

@Injectable()
export class WeddingsServices {
    constructor(
        @InjectRepository(WeddingsRepository) private readonly weddingsRepository: WeddingsRepository,
        private readonly usersServices: UsersServices) {
    }

    async createWedding(email: string, wedding: WeddingEntity): Promise<WeddingEntity> {
        wedding.client = await this.usersServices.findClientByEmail(email);
        return await this.weddingsRepository.save(wedding);
    }

    async findWedding(id: string, email: string): Promise<WeddingEntity> {
        return await this.weddingsRepository.findOneOrFail(id);
    }

    async findWeddingByEmail(email: string): Promise<WeddingEntity> {
        const client = await this.usersServices.findClientByEmail(email);
        const wed = await client.wedding;
        if (!wed) {
            throw new NotFoundException();
        }
        return wed as WeddingEntity;
    }

    async patchWedding(id: string, email: string, wedding: Partial<WeddingEntity>) {
        const client: ClientEntity = await this.usersServices.findClientByEmail(email);
        if (await client.wedding && (await client.wedding).id === id) {
            await this.weddingsRepository.update(id, wedding);
            return this.weddingsRepository.findOneOrFail(id);
        } else {
            throw new NotFoundException('wedding not found');
        }
    }

/*    async isUserExist(emailExist: string): Promise<boolean> {
        const users = await this.usersRepository.find({
            where: [{email: emailExist}],
        });
        return users.length > 0;
    }

    public async findUserByEmail(email: string): Promise<UserEntity> {
        return await this.usersRepository.findOneOrFail({email});
    }

    async updateUser(email: string, user: Partial<UserEntity>): Promise<UserEntity> {
        await this.usersRepository.update({email}, user);
        return this.findUserByEmail(email);
    }*/

}
