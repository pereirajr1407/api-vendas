import AppError from '@shared/errors/AppError';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import uploadConfig from '@config/upload';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = await getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
