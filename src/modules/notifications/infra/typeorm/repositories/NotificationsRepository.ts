import { Repository } from 'typeorm';

import DatabaseConfiguration from '@shared/infra/database/DatabaseConfiguration';

import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../entities/Notification';


class NotificationsRepository implements INotificationRepository {

  private ormRepository: Repository<Notification>;

  constructor() {
    this.ormRepository = DatabaseConfiguration.getDataSourceInstance().getRepository(Notification);
  }

  public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {

    const notification = this.ormRepository.create({ content, recipient_id });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
