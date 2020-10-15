import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class images1602722778543 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
      columns: [{
        name: 'id',
        type: 'integer',
        unsigned: true,
        isGenerated: true,
        isPrimary: true,
        generationStrategy: 'increment'
      }, {
        name: 'path',
        type: 'varchar'
      }, {
        name: 'orphanage_id',
        type: 'integer'
      }],
      foreignKeys: [{
        name: 'ImageOrphanage',
        columnNames: ['orphanage_id'],
        referencedTableName: 'orphanages',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images')
  }

}
