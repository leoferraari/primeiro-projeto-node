interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'smtp_nodemailer';

  defaults: {
    from: {
      email: string,
      name: string,
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'diego@teste.com.br',
      name: 'Diego da Rocket',
    }
  }
} as IMailConfig;
