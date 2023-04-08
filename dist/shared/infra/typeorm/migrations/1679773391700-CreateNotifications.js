"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateNotifications1679773391700 = void 0;
var _typeorm = require("typeorm");
class CreateNotifications1679773391700 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'notifications',
      columns: [{
        name: 'id',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'recipient_id',
        type: 'uuid'
      }, {
        name: 'content',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'read',
        type: 'boolean',
        default: false
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('notifications');
  }
}
exports.CreateNotifications1679773391700 = CreateNotifications1679773391700;