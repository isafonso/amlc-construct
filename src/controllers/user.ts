import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user";

interface IUser {
  id?: number;
  email: string;
  password?: string;
}

class UserController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user }: { user: string } = req.query;
      console.log(user);
      res.render("index", { user });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error });
    }
  };
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const createUser = await UserModel.findOrCreate<IUser | any>({
        where: { email: email, password: password },
      });
      console.log(await createUser[0].save());
      createUser[1]
        ? res.status(201).redirect(`/?user=${createUser[0].email}`)
        : res
            .status(200)
            .redirect(`/pages/cadastro.html?info=ESTE USUÁRIO JÁ EXISTE`);
    } catch (error) {
      res.status(401).json(error);
    }
  };
  read = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const findUser = await UserModel.findOne<IUser | any>({
        where: { email: email },
      });
      console.log(findUser);
      res.status(201).redirect(`/?user=${findUser.email}`);
    } catch (error) {
      res.status(401).json(error);
    }
  };
  update = async () => {};
  delete = async () => {};
}

export default new UserController();
