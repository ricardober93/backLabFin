import Route from '@ioc:Adonis/Core/Route'
import BaseInicialsController from 'App/Controllers/Http/BaseInicialsController';


const baseInicialsController = new BaseInicialsController()

Route.post("/proyeccion/base-inicial", baseInicialsController.create);
  