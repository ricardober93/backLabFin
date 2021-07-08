import Route from "@ioc:Adonis/Core/Route";

import User from "App/Models/user";

Route.post("login", async ({ auth, request }) => {
  const email = request.input("email");
  const password = request.input("password");

  await auth.use("api").attempt(email, password);
});

Route.get("/createUser", async ({}) => {
  const user = new User();

  // Assign username and email
  user.email = "laura@adonisjs.com";
  user.password = "barahona";

  // Insert to the database
  await user.save();

  console.log(user.$isPersisted); // true
  return "User Creado";
});
