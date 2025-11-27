import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitialSchema1700000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create projects table
    await queryRunner.createTable(
      new Table({
        name: "projects",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
        ],
      }),
      true
    );

    // Create tasks table
    await queryRunner.createTable(
      new Table({
        name: "tasks",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "project_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "title",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "status",
            type: "varchar",
            length: "20",
            default: "'todo'",
            isNullable: false,
          },
          {
            name: "priority",
            type: "varchar",
            length: "20",
            default: "'medium'",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
        ],
      }),
      true
    );

    // Create foreign key constraint
    await queryRunner.createForeignKey(
      "tasks",
      new TableForeignKey({
        columnNames: ["project_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "projects",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraint
    const table = await queryRunner.getTable("tasks");
    const foreignKey = table?.foreignKeys.find((fk) => fk.columnNames.indexOf("project_id") !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey("tasks", foreignKey);
    }

    // Drop tables
    await queryRunner.dropTable("tasks");
    await queryRunner.dropTable("projects");
  }
}
