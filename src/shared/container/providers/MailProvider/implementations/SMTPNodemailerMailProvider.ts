import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from '../dtos/ISendMailDTO';

import smtp_nodemailer from '@config/smtp_nodemailer';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class SMTPNodemailerMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,

  ) {
    this.client = nodemailer.createTransport({
      host: smtp_nodemailer.host,
      port: smtp_nodemailer.port,
      secure: true,
      auth: {
        user: smtp_nodemailer.user,
        pass: smtp_nodemailer.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }


  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    const { name, user } = smtp_nodemailer;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || user,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    }, (err, info) => {
      if (err) {
        console.log('Error occurred. ' + err.message);
        return process.exit(1);
      }
    });
  }
}
