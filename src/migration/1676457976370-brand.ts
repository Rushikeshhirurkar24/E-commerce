import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class brand1676457976370 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "brand",
              columns: [
                {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                  generationStrategy: "uuid"
                },
                {
                  name: "brand_name",
                  type: "varChar",
                  length: "50"

                },
                {
                  name: "product_id",
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
            "brand",
            new TableForeignKey({
              columnNames: ["product_id"],
              referencedTableName: "product",
              referencedColumnNames: ["id"],
            })
          );
        }
      
    

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
