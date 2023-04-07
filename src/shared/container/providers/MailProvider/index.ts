import { container } from 'tsyringe';

import EtheralMailProvider from './implementations/EtheralMailProvider';
import SESMailProvider from './implementations/SESMailProvider';
import SMTPNodemailerMailProvider from './implementations/SMTPNodemailerMailProvider';
import mailConfig from '@config/mail';
import smpt_nodemailerConfig from '@config/smtp_nodemailer';
import IMailProvider from './models/IMailProvider';

const providers = {
  ethereal: container.resolve(EtheralMailProvider),
  ses: container.resolve(SESMailProvider),
  smtp_nodemailer: container.resolve(SMTPNodemailerMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
