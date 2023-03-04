import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export default class product1675857514392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid"
          },
          {
            name: "Product_name",
            type: "varChar",
            length: "50"
          },
          {
            name: "selling_price",
            type: "varChar",
            length: "50"
          },
          {
            name: "description",
            type: "varChar",
            length: "50"
          },
          {
            name: "sort",
            type: "varChar",
            length: "12"
          },  
          {
            name: "quantity",
            type: "varChar",
            length: "12"
          },
          {
            name: "category_id",
            type: "uuid",
          },
          {
              name: "created_by",
              type: "varchar",
              isNullable:true
          },
          {
              name: "updated_by",
              type: "varchar",
              isNullable:true


          },
          {
              name: "deleted_by",
              type: "varchar",
              isNullable:true

          },
          {
              name: "created_at",
              type: "varchar",
              isNullable:true


          },
          {
              name: "updated_at",
              type: "varchar",
              isNullable:true

          },
          {
              name: "deleted_at",
              type: "varchar",
              isNullable:true

          }
        ],
      })
    ),
      true;

    await queryRunner.createForeignKey(
      "product",
      new TableForeignKey({
        columnNames: ["category_id"],
        referencedTableName: "category",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("product");
  }
}
