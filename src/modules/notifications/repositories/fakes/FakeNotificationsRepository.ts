import { v4 as uuidv4 } from 'uuid';

import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/entities/Notification';

class NotificationsRepository implements INotificationRepository {
  private notifications: Notification[] = [];


  public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {

    const notification = new Notification();

    Object.assign(notification, { id: uuidv4(), content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;
