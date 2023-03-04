import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class userSession1676462890653 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_session",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid"

                    },
                    {
                        name:"token",
                        type:"varchar",  
                    },
                    {
                        name:"user_id",
                        type:"uuid",   
                    },
                    {
                        name:"is_expired",
                        type:"boolean",   
                    },
                    {
                        name: "created_at",
                        type: "varchar",
                        isNullable:true
    
                    },
                    {
                        name: "deleted_at",
                        type: "varchar",
                        isNullable:true
    
                    }

                ]
            })
        ),true

        await queryRunner.createForeignKey(
            "user_session",
            new TableForeignKey({ 
                columnNames:["user_id"],
                referencedTableName:'user',
                referencedColumnNames:["id"]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("user_session")
    }

}
