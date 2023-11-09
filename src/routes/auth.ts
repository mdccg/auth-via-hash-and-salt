import { Router } from 'express';
import { User } from '../entity/User';
import STATUS from '../enums/Status';
import { AuthController } from '../controllers/AuthController';
import { sign } from 'jsonwebtoken';

export const authRouter = Router();
const authController = new AuthController();

authRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  const user = new User(name, email, password);

  const response = user.isValid();

  if (response !== STATUS.OK) {
    return res.status(400).json({ message: response });
  }

  const savedUser = await authController.registerUser(user);

  res.status(201).json({ user: savedUser });
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await authController.findUserByEmail(email);

  if (!user) {
    return res.status(400).json({ message: 'The provided email is not registered.' });
  }

  if (!user.isPasswordCorrect(password)) {
    return res.status(401).json({ message: 'The password is incorrect.' });
  }

  const payload = {
    user: email,
    authTime: new Date().getTime() * 1_000
  };

  const token = sign(payload, process.env.SECRET, { expiresIn: '20s' });

  res.status(200).json({
    authorized: true,
    user,
    token
  });
});