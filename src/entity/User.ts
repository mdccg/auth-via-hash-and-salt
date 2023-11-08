import * as EmailValidator from 'email-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import STATUS from '../enums/Status';
import { pbkdf2, pbkdf2Sync, randomBytes } from 'crypto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  salt: string;

  @Column()
  hash: string;

  password: string;

  constructor(fullName: string, email: string, password: string) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this._generatePassword();
  }

  isValid(): STATUS {
    if (!this.fullName) return STATUS.INVALID_NAME;
    if (!EmailValidator.validate(this.email)) return STATUS.INVALID_EMAIL;
    if (!this._isPasswordValid()) return STATUS.INVALID_PASSWORD;
    return STATUS.OK;
  }

  isPasswordCorrect(password: string): boolean {
    const hash = pbkdf2Sync(password, this.salt, 1_000, 64, 'sha512').toString('hex');
    return hash === this.hash;
  }

  private _isPasswordValid(): boolean {
    return this.password.length >= 8
      && /[A-Z]/g.test(this.password)
      && /\d/g.test(this.password);
  }

  private _generatePassword(): void {
    if (!this._isPasswordValid()) return;
    this.salt = randomBytes(16).toString('hex');
    this.hash = pbkdf2Sync(this.password, this.salt, 1_000, 64, 'sha512').toString('hex');
  }
}