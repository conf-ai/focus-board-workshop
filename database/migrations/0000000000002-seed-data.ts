import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedData1700000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert Workshop Projects
    await queryRunner.query(`
      INSERT INTO projects (id, name, created_at) VALUES 
      ('550e8400-e29b-41d4-a716-446655440001', 'Workshop Project A', NOW()),
      ('550e8400-e29b-41d4-a716-446655440002', 'Workshop Project B', NOW());
    `);

    // Insert Tasks for Workshop Project A (6 tasks)
    await queryRunner.query(`
      INSERT INTO tasks (id, project_id, title, status, priority, created_at) VALUES 
      ('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440001', 'Setup development environment', 'todo', 'high', NOW()),
      ('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440001', 'Create user authentication system', 'in_progress', 'high', NOW()),
      ('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440001', 'Design database schema', 'done', 'medium', NOW()),
      ('550e8400-e29b-41d4-a716-446655440104', '550e8400-e29b-41d4-a716-446655440001', 'Implement API endpoints', 'todo', 'medium', NOW()),
      ('550e8400-e29b-41d4-a716-446655440105', '550e8400-e29b-41d4-a716-446655440001', 'Write unit tests', 'in_progress', 'low', NOW()),
      ('550e8400-e29b-41d4-a716-446655440106', '550e8400-e29b-41d4-a716-446655440001', 'Deploy to staging', 'todo', 'low', NOW());
    `);

    // Insert Tasks for Workshop Project B (6 tasks)
    await queryRunner.query(`
      INSERT INTO tasks (id, project_id, title, status, priority, created_at) VALUES 
      ('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440002', 'Research user requirements', 'done', 'high', NOW()),
      ('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440002', 'Create wireframes and mockups', 'in_progress', 'medium', NOW()),
      ('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440002', 'Implement responsive design', 'in_progress', 'high', NOW()),
      ('550e8400-e29b-41d4-a716-446655440204', '550e8400-e29b-41d4-a716-446655440002', 'Add accessibility features', 'todo', 'medium', NOW()),
      ('550e8400-e29b-41d4-a716-446655440205', '550e8400-e29b-41d4-a716-446655440002', 'Optimize for performance', 'todo', 'low', NOW()),
      ('550e8400-e29b-41d4-a716-446655440206', '550e8400-e29b-41d4-a716-446655440002', 'Conduct user testing', 'todo', 'medium', NOW());
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove seed data
    await queryRunner.query(`
      DELETE FROM tasks WHERE project_id IN ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002');
    `);

    await queryRunner.query(`
      DELETE FROM projects WHERE id IN ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002');
    `);
  }
}
