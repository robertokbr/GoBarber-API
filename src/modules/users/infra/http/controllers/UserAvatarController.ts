import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService.ts';
import { classToClass } from 'class-transformer';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarfilename: request.file.filename,
    });

    user.password = '';

    return response.json(classToClass(user));
  }
}

export default UserAvatarController;
