import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/user';

const JWT_SECRET = 'jwt_secret';

export default class UserService {
  private _userModel = UserModel;

  public async login(email: string, password: string) {
    const userFound = await this._userModel.findOne({ where: { email } });
    if (!userFound) return null;
    if (!bcrypt.compareSync(password, userFound.password)) return null;

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
    return token;
  }
}
