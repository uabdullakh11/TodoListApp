import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateUsersTable1698227477601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
            isNullable: false,
          },
          {
            name: "login",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "avatar",
            type: "varchar",
            isNullable: true,
          },
        ],
      }),
      true
    );
    await queryRunner.createTable(
      new Table({
        name: "tasks",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
            isNullable: false,
          },
          {
            name: "title",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "date",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "completed",
            type: "boolean",
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
        ],
      }),
      true
    );
    await queryRunner.createTable(
      new Table({
        name: "tokens",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
            isNullable: false,
          },
          {
            name: "token",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "expiryDate",
            type: "date",
            isNullable: false,
          },
        ],
      }),
      true
    );

    await queryRunner.addColumn(
      "tasks",
      new TableColumn({
        name: "userId",
        type: "uuid",
      })
    );
    await queryRunner.createForeignKey(
      "tasks",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
    await queryRunner.addColumn(
      "tokens",
      new TableColumn({
        name: "userId",
        type: "uuid",
      })
    );
    await queryRunner.createForeignKey(
      "tokens",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("tasks");
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("userId") !== -1
    );

    await queryRunner.dropForeignKey("tasks", foreignKey);
    await queryRunner.dropColumn("tasks", "userId");
    
    const tokensTable = await queryRunner.getTable("tokens");
    const foreignKeyToken = tokensTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("userId") !== -1
    );

    await queryRunner.dropForeignKey("tokens", foreignKeyToken);
    await queryRunner.dropColumn("tokens", "userId");

    await queryRunner.dropTable("tokens");
    await queryRunner.dropTable("tasks");
    await queryRunner.dropTable("users");
  }
}
