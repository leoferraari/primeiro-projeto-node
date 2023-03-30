import { container } from 'tsyringe';

import EtheralMailProvider from './implementations/EtheralMailProvider';
import SESMailProvider from './implementations/SESMailProvider';
import mailConfig from '@config/mail';
import IMailProvider from './models/IMailProvider';

const providers = {
  ethereal: container.resolve(EtheralMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
