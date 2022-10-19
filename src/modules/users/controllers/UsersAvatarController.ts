import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

class UsersAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      userId: req.user.id,
      avatarFilename: req.file.filename,
    });

    return res.json(user);
  }
}

export default UsersAvatarController;
