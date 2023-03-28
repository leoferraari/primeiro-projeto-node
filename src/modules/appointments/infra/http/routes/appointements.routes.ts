import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

// import coreJoi from "joi";
// import joiDate from "@joi/date";
// const joi = coreJoi.extend(joiDate) as typeof coreJoi;


/**
 * startOfHour: Coloca o zero em minutos, segundos e milisegundos
 * parseISO: Converte uma string para um objeto DATE
 * isEqual: Verifica se duas datas são iguais
 *
 * Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta.
 *
 * SoC: Separtion of Concerns (Separação de preocupações)
 */

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();


appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
