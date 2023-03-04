import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class userDetails1676527521783 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_details",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
          },

          {
            name: "age",
            type: "varchar",
            length: "120",
          },
          {
            name: "gender",
            type: "varchar",
            length: "10",
          },
          {
            name: "location",
            type: "varchar",
            length: "100",
          },
          {
            name: "city",
            type: "varchar",
            length: "50",
          },
          {
            name: "state",
            type: "varchar",
            length: "50",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "created_by",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "updated_by",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "deleted_by",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "updated_at",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "deleted_at",
            type: "varchar",
            isNullable: true,
          },
        ],
      })
    ),
      true;

    await queryRunner.createForeignKey(
      "user_details",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
      })
    );
  }
  

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
