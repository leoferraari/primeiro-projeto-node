import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import Notification from '@modules/notifications/infra/typeorm/entities/Notification';
import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { DataSource } from 'typeorm';
import CreateAppointments1641517464789 from '../typeorm/migrations/1641517464789-CreateAppointments';
import CreateUsers1641574375630 from '../typeorm/migrations/1641574375630-CreateUsers';
import { AlterProviderFieldToProviderId1641577463071 } from '../typeorm/migrations/1641577463071-AlterProviderFieldToProviderId';
import AddAvatarFieldToUsers1641595847449 from '../typeorm/migrations/1641595847449-AddAvatarFieldToUsers';
import CreateUserTokens1677714927705 from '../typeorm/migrations/1677714927705-CreateUserTokens';
import AddUserIdToAppoinments1679358423189 from '../typeorm/migrations/1679358423189-AddUserIdToAppoinments';

const path = require('path');

class DatabaseConfiguration {
  private static INSTANCE: DatabaseConfiguration;

  private _dataSource: DataSource;
  private _dataSourceMongo: DataSource;

  get dataSource() {
    return this._dataSource;
  }

  get dataSourceMongo() {
    return this._dataSourceMongo;
  }

  public static getInstance(): DatabaseConfiguration {
    if (!DatabaseConfiguration.INSTANCE) {
      DatabaseConfiguration.INSTANCE = new DatabaseConfiguration();
    }

    return DatabaseConfiguration.INSTANCE;
  }

  public static getDataSourceInstance(): DataSource {
    return DatabaseConfiguration.getInstance().dataSource;
  }

  public static getDataSourceInstanceMongo(): DataSource {
    return DatabaseConfiguration.getInstance().dataSource;
  }


  public static startConnection(): void {
    DatabaseConfiguration.getDataSourceInstance()
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch(err => {
        console.error('Error during Data Source initialization:', err);
      });

    DatabaseConfiguration.getDataSourceInstanceMongo()
      .initialize()
      .then(() => {
        console.log('Data Source Mongo DB has been initialized!');
      })
      .catch(err => {
        console.error('Error during Data Source MongoDB initialization:', err);
      });
  }

  constructor() {
    this.inicializeDataSource();
  }

  private inicializeDataSource() {
    this._dataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5433,
      username: "postgres",
      password: "docker",
      database: "gostack_gobarber",
      migrations: [
        './src/shared/infra/typeorm/migrations/*.ts',
        CreateAppointments1641517464789,
        CreateUsers1641574375630,
        AlterProviderFieldToProviderId1641577463071,
        AddAvatarFieldToUsers1641595847449,
        CreateUserTokens1677714927705,
        AddUserIdToAppoinments1679358423189,
      ],
      entities: [
        User,
        Appointment,
        UserToken,
        // path.resolve(
        //   __dirname,
        //   '..',
        //   '..',
        //   '..',
        //   'modules',
        //   '**',
        //   'infra',
        //   'typeorm',
        //   'entities',
        //   '*.ts',
        // )
      ],
    });
    // console.log('Caminho a fazer ' + path.resolve(
    //   __dirname,
    //   '..',
    //   '..',
    //   '..',
    //   'modules',
    //   '**',
    //   'infra',
    //   'typeorm',
    //   'entities',
    //   '*.ts',
    // ));

    // console.log('Caminho Atual ' + __dirname);

    this._dataSourceMongo = new DataSource({
      name: "mongo",
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "gobarber",
      "useUnifiedTopology": true,
      entities: [
        Notification
      ],
    });

  }
}

export default DatabaseConfiguration;


