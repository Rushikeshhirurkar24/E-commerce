import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export default class user1675857501793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          { name: "role",
            type: "varchar",
            isNullable: true,
            length: "12",
          },
          {
            name: "first_name",
            type: "varchar",
            length: "25",
          },
          {
            name: "last_name",
            type: "varchar",
            length: "25"
          },
          {
            name: "email",
            type: "varchar",
            length: "25"

          },
          {
            name: "password",
            type: "varchar",

          },
          {
            name: "is_active",
            type: "boolean",
            default: true,
          },
          {
            name: "is_deleted",
            type: "boolean",
            default: false,
          },
          {
            name: "email_verification_token",
            type: "varchar",
            isNullable: true,
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
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
