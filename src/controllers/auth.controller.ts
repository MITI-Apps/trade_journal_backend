import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email }});
    if (!user){
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret){
      return res.status(404).json({ error: 'JWT secret not found' });
    }
    const token = jwt.sign(
      {userId: user.id, email: user.email },
      jwtSecret,
      {expiresIn: '7d'}
    );
    
    res.status(200).json({ message: 'Login successful', token});
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};

export { registerUser, loginUser };