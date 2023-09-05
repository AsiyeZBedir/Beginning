const pgp = require('pg-promise')();
const connectionString = 'postgres://username:password@localhost:5432/your_database'; // Replace with your PostgreSQL connection details

const db = pgp(connectionString);

// Function to create a new task
async function createTask(taskName) {
    try {
        const result = await db.one(
            'INSERT INTO tasks(task_name) VALUES($1) RETURNING id',
            [taskName]
        );
        return result.id;
    } catch (error) {
        throw error;
    }
}

// Function to get all tasks
async function getAllTasks() {
    try {
        return await db.any('SELECT * FROM tasks');
    } catch (error) {
        throw error;
    }
}

// Function to update a task's status
async function updateTaskStatus(taskId, isCompleted) {
    try {
        await db.none('UPDATE tasks SET is_completed = $1 WHERE id = $2', [isCompleted, taskId]);
    } catch (error) {
        throw error;
    }
}

// Function to delete a task
async function deleteTask(taskId) {
    try {
        await db.none('DELETE FROM tasks WHERE id = $1', taskId);
    } catch (error) {
        throw error;
    }
}

// Example usage:
async function main() {
    try {
        // Create tasks
        const task1Id = await createTask('Buy groceries');
        const task2Id = await createTask('Finish coding project');
        const task3Id = await createTask('Go for a run');

        // Get all tasks
        const tasks = await getAllTasks();
        console.log('All tasks:');
        console.log(tasks);

        // Update task status
        await updateTaskStatus(task1Id, true);

        // Delete a task
        await deleteTask(task3Id);

        // Get updated task list
        const updatedTasks = await getAllTasks();
        console.log('Updated tasks:');
        console.log(updatedTasks);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        pgp.end();
    }
}

main();
