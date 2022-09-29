import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/user';
import IUser from '../interfaces/IUser';
import IToken from '../interfaces/IToken';
import IRole from '../interfaces/IRole';

const JWT_SECRET = 'jwt_secret';

export default class UserService {
  private _userModel = UserModel;

  public async login(email: string, password: string) {
    const userFound = await this._userModel.findOne({ where: { email } }) as IUser;
    if (!userFound) return null;
    if (!bcrypt.compareSync(password, userFound.password)) return null;

    const { id } = userFound;
    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
    return token;
  }

  public loginValidate = async (authorization: string): Promise<IRole> => {
    const token = jwt.decode(authorization) as IToken;
    const { id } = token;
    const userFound = await this._userModel.findOne({ where: { id }, raw: true }) as IUser;
    return userFound?.role as unknown as IRole;
  };
}
