# Recuperação de Senha (Macro)

** RF **
- O usuário deve poder recuperar sua senha informando seu e-mail;
  - Foi criado o service primeiramente (SendForgotPasswordEmailService) e posteriormente o service de teste;
- O usuário deve receber um e-mail com instruçoes de recuperação de senha;
- O Usuário deve poder resetar sua senha;

** RNF **

- Utilizar mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job); (FILA)

** RN **
- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do Perfil

** RF **
- O usuário deve poder atualizar seu nome, email e senha;

** RN **
- O usuário não pode alterar email para um email já existente;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do Prestador
** RF **
- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O presstador deve poder visualizar as notificações não lidas;

** RNF **
- Os agendamentos do prestador no dia devem ser armezenados em cache;
- As notificações do prestador devem ser armazenados no MongoDB;
- AS notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

** RN **
- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de Serviço

** RF **

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento dom um prestador;

** RNF **
- A listagem de prestadores deve ser armazenada em cache;
-

** RN **

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h e 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;





-





