import db from '../config/database.js'

// Get all users
export const getAllUsers = () => {
  const stmt = db.prepare('SELECT * FROM users ORDER BY id')
  return stmt.all()
}

// Get user by ID
export const getUserById = (id) => {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?')
  return stmt.get(id)
}

// Create new user
export const createUser = ({ name, email }) => {
  if (email) {
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
    if (existing) throw new Error('Email already exists')
  }
  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)')
  const result = stmt.run(name, email || null)
  return getUserById(result.lastInsertRowid)
}

// Update user
export const updateUser = (id, { name, email }) => {
  const user = getUserById(id)
  if (!user) return null

  if (email && email !== user.email) {
    const existing = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?').get(email, id)
    if (existing) throw new Error('Email already exists')
  }

  const stmt = db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?')
  stmt.run(name || user.name, email || user.email, id)
  return getUserById(id)
}

// Delete user
export const deleteUser = (id) => {
  const stmt = db.prepare('DELETE FROM users WHERE id = ?')
  const result = stmt.run(id)
  return result.changes > 0
}
