"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterProviderFieldToProviderId1641577463071 = void 0;
var _typeorm = require("typeorm");
class AlterProviderFieldToProviderId1641577463071 {
  async up(queryRunner) {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'provider_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('appointments', new _typeorm.TableForeignKey({
      name: 'AppointmentProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      //Quando deletado o id vai ficar nulo
      onUpdate: 'CASCADE'
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    await queryRunner.dropColumn('appointments', 'provider_id');
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'provider',
      type: 'varchar'
    }));
  }
}
exports.AlterProviderFieldToProviderId1641577463071 = AlterProviderFieldToProviderId1641577463071;