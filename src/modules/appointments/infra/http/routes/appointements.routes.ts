import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';


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

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
