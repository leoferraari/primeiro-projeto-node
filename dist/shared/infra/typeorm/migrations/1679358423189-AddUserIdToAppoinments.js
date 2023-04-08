"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
class AddUserIdToAppoinments1679358423189 {
  async up(queryRunner) {
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'user_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('appointments', new _typeorm.TableForeignKey({
      name: 'AppointmentUser',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      //Quando deletado o id vai ficar nulo
      onUpdate: 'CASCADE'
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    await queryRunner.dropColumn('appointments', 'user_id');
  }
}
exports.default = AddUserIdToAppoinments1679358423189;