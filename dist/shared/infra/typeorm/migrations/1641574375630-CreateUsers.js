"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
class CreateUsers1641574375630 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar',
        isUnique: false
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        //para saber quando o usuário realizou o cadastro.
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        //para saber quando o usuário fez a última alteração em seu cadastro.
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }
}
exports.default = CreateUsers1641574375630;