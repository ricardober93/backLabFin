import Route from "@ioc:Adonis/Core/Route";
import AuthController from "App/Controllers/Http/AuthController";

const authController = new AuthController() 

Route.post("login", authController.login);

Route.post("/register", authController.create);
