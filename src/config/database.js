import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

// Needed for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create/connect to database file in project root
const db = new Database(path.join(__dirname, '../../database.sqlite'))

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Initialize tables
export const initializeDatabase = () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `
  db.exec(createUsersTable)

  console.log('✅ Database initialized')

  // Add sample data if empty
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get()
  if (userCount.count === 0) {
    console.log('📝 Adding sample data...')
    const insert = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)')
    insert.run('Alice', 'alice@example.com')
    insert.run('Bob', 'bob@example.com')
    insert.run('Charlie', 'charlie@example.com')
    insert.run('Dave', 'dave@example.com')
    console.log('✅ Sample data added')
  }
}

export default db
