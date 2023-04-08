"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Appointment = _interopRequireDefault(require("../../../modules/appointments/infra/typeorm/entities/Appointment"));
var _Notification = _interopRequireDefault(require("../../../modules/notifications/infra/typeorm/entities/Notification"));
var _User = _interopRequireDefault(require("../../../modules/users/infra/typeorm/entities/User"));
var _UserToken = _interopRequireDefault(require("../../../modules/users/infra/typeorm/entities/UserToken"));
var _typeorm = require("typeorm");
var _CreateAppointments = _interopRequireDefault(require("../typeorm/migrations/1641517464789-CreateAppointments"));
var _CreateUsers = _interopRequireDefault(require("../typeorm/migrations/1641574375630-CreateUsers"));
var _AlterProviderFieldToProviderId = require("../typeorm/migrations/1641577463071-AlterProviderFieldToProviderId");
var _AddAvatarFieldToUsers = _interopRequireDefault(require("../typeorm/migrations/1641595847449-AddAvatarFieldToUsers"));
var _CreateUserTokens = _interopRequireDefault(require("../typeorm/migrations/1677714927705-CreateUserTokens"));
var _AddUserIdToAppoinments = _interopRequireDefault(require("../typeorm/migrations/1679358423189-AddUserIdToAppoinments"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const path = require('path');
class DatabaseConfiguration {
  get dataSource() {
    return this._dataSource;
  }
  get dataSourceMongo() {
    return this._dataSourceMongo;
  }
  static getInstance() {
    if (!DatabaseConfiguration.INSTANCE) {
      DatabaseConfiguration.INSTANCE = new DatabaseConfiguration();
    }
    return DatabaseConfiguration.INSTANCE;
  }
  static getDataSourceInstance() {
    return DatabaseConfiguration.getInstance().dataSource;
  }
  static getDataSourceInstanceMongo() {
    return DatabaseConfiguration.getInstance().dataSource;
  }
  static startConnection() {
    DatabaseConfiguration.getDataSourceInstance().initialize().then(() => {
      console.log('Data Source has been initialized!');
    }).catch(err => {
      console.error('Error during Data Source initialization:', err);
    });
    DatabaseConfiguration.getDataSourceInstanceMongo().initialize().then(() => {
      console.log('Data Source Mongo DB has been initialized!');
    }).catch(err => {
      console.error('Error during Data Source MongoDB initialization:', err);
    });
  }
  constructor() {
    this._dataSource = void 0;
    this._dataSourceMongo = void 0;
    this.inicializeDataSource();
  }
  inicializeDataSource() {
    this._dataSource = new _typeorm.DataSource({
      type: "postgres",
      host: "localhost",
      port: 5433,
      username: "postgres",
      password: "docker",
      database: "gostack_gobarber",
      migrations: ['./src/shared/infra/typeorm/migrations/*.ts', _CreateAppointments.default, _CreateUsers.default, _AlterProviderFieldToProviderId.AlterProviderFieldToProviderId1641577463071, _AddAvatarFieldToUsers.default, _CreateUserTokens.default, _AddUserIdToAppoinments.default],
      entities: [_User.default, _Appointment.default, _UserToken.default
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
      ]
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

    this._dataSourceMongo = new _typeorm.DataSource({
      name: "mongo",
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "gobarber",
      "useUnifiedTopology": true,
      entities: [_Notification.default]
    });
  }
}
DatabaseConfiguration.INSTANCE = void 0;
var _default = DatabaseConfiguration;
exports.default = _default;