import User from '../models/User.js'

export const getAllUsers = () => User.findAll()

export const getUserById = (id) => User.findById(id)

export const createUser = ({ name, email }) => {
  if (email && User.emailExists(email)) {
    throw new Error('Email already exists')
  }
  return User.create({ name, email })
}

export const updateUser = (id, { name, email }) => {
  const existingUser = User.findById(id)
  if (!existingUser) return null

  if (email && email !== existingUser.email && User.emailExists(email, id)) {
    throw new Error('Email already exists')
  }

  return User.update(id, { name, email })
}

export const deleteUser = (id) => User.delete(id)

export const getUserByEmail = (email) => User.findByEmail(email)

export const getUserCount = () => User.count()
