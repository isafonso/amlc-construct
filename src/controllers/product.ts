import { NextFunction, Request, Response } from "express";
import ProductModel from "../models/product";

class ProductController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    res.render("index");
  };
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, description, price, email } = req.body;
      const imgURL =
        process.env.HOST +
        ":" +
        process.env.PORT +
        "/uploads/" +
        req.file?.filename;

      const createProduct = await ProductModel.create({
        name: name,
        description: description,
        price: price,
        email: email,
        picture: imgURL,
      });

      await createProduct.save();

      console.log(createProduct);

      res.status(200).redirect("/");
    } catch (error) {
      res.status(400).json(error);
    }
  };
  read = async (req: Request, res: Response) => {
    try {
      const product = (await ProductModel.findAll()).reverse();
      res.status(200).render("gallery", { product });
    } catch (error) {
      console.error("Cannot find product cause ", error);
    }
  };
  readOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const findOneProduct = await ProductModel.findOne({
        where: { id: id },
      });

      !findOneProduct &&
        res
          .status(404)
          .send(
            `<h1 style='text-align:center'>Não existe um producto com id ${id}</h1>`
          );

      res.render("product", { product: findOneProduct });
    } catch (error) {
      console.error(error);
    }
  };
  update = async () => {};
  delete = async () => {};
}

export default new ProductController();
