import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/user';

const JWT_SECRET = 'jwt_secret';

export default class UserService {
  private _userModel = UserModel;

  public async login(email: string) {
    const token = jwt.sign({ email }, JWT_SECRET);
    console.log(token);

    const userFound = await this._userModel.findOne({ where: { email } });
    if (!userFound) return null;
    return token;
  }
}
