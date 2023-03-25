import ICreateNotificationDTO from "../dtos/ICreateNotificationDTO";
import Notification from '../infra/typeorm/entities/Notification'

export default interface INotificationRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
