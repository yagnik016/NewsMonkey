import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async registerUser(email: string, password: string, name: string): Promise<User> {
    const existing = await this.userModel.findOne({ email });
    if (existing) throw new ConflictException('Email already registered');
    const hashed = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hashed, name });
    return user.save();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    return valid ? user : null;
  }

  async loginUser(email: string, password: string): Promise<{ token: string }> {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: (user as UserDocument).id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'changeme', { expiresIn: '7d' });
    return { token };
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId);
  }

  async updateUserInterests(userId: string, interests: string[]): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, { interests }, { new: true });
  }
} 