const pgp = require('pg-promise')(); // Import the pg-promise library
const connectionString = 'postgres://username:password@localhost:5432/your_database'; // Replace with your PostgreSQL connection details

// Create a PostgreSQL database connection
const db = pgp(connectionString);

// Function to create a new user in the database
async function createUser(username, email) {
    try {
        const result = await db.one(
            'INSERT INTO users(username, email) VALUES($1, $2) RETURNING id',
            [username, email]
        );
        return result.id;
    } catch (error) {
        throw error;
    }
}

// Function to get all users from the database
async function getUsers() {
    try {
        return await db.any('SELECT * FROM users');
    } catch (error) {
        throw error;
    }
}

// Function to update a user's email in the database
async function updateUserEmail(userId, newEmail) {
    try {
        await db.none('UPDATE users SET email = $1 WHERE id = $2', [newEmail, userId]);
    } catch (error) {
        throw error;
    }
}

// Function to delete a user from the database
async function deleteUser(userId) {
    try {
        await db.none('DELETE FROM users WHERE id = $1', userId);
    } catch (error) {
        throw error;
    }
}

// Example usage:
async function main() {
    try {
        // Create a new user
        const newUserId = await createUser('john_doe', 'john@example.com');
        console.log(`New user created with ID: ${newUserId}`);

        // Get all users
        const users = await getUsers();
        console.log('All users:');
        console.log(users);

        // Update a user's email
        await updateUserEmail(newUserId, 'new_email@example.com');
        console.log(`User ${newUserId}'s email updated.`);

        // Delete a user
        await deleteUser(newUserId);
        console.log(`User ${newUserId} deleted.`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        pgp.end(); // Close the database connection
    }
}

main();
