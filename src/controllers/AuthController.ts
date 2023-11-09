import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { verify } from 'jsonwebtoken';
import STATUS from '../enums/Status';

export class AuthController {
  private _repo: Repository<User>;

  constructor() {
    this._repo = AppDataSource.getRepository(User);
  }

  async registerUser(user: User): Promise<User> {
    delete user.password;

    try {
      const savedUser = await this._repo.save(user);
      return savedUser;

    } catch (error) {
      console.error('Error during user insert: ', error);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this._repo.findOne({
      where: {
        email
      }
    });

    return user;
  }

  static verifyToken(req: Request, res: Response, next: NextFunction) {
    let token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: STATUS.PENDING_TOKEN });

    token = token.substring(7, token.length); // Removing "Bearer " prefix

    try {
      verify(token, process.env.SECRET);
      next();
      return;

    } catch (error) {
      console.error('Error during token verification: ', error);
    }

    return res.status(401).json({ message: STATUS.NOT_AUTHORIZED });
  }
}