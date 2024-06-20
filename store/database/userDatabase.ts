import { create } from 'zustand'
import * as SQLite from 'expo-sqlite'

export type User = {
  id: number
  name: string
  email: string
  password: string
  phone: string
  img: string
  productId: string
}

export interface UserDatabaseStore {
  db: SQLite.SQLiteDatabase | null
  users: User[]

  initializeUserDB: () => void
  fetchUsers: () => void
  insertUser: (user: User) => Promise<number>
  deleteUsersTable: () => void
  getUserByEmailAndPasswordOrPhone: (
    email: string,
    password?: string,
    phone?: string
  ) => Promise<User | null>
  deleteUser: (id: number) => void
  deleteAllUsers: () => void
  updateUser: (id: number, updatedUser: Partial<User>) => Promise<void>
}
export const useUserDatabaseStore = create<UserDatabaseStore>((set) => ({
  db: null,
  users: [],

  initializeUserDB: () => {
    const db = SQLite.openDatabase('users.db')

    db.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, productId TEXT,name TEXT, email TEXT, password TEXT, phone TEXT, img TEXT)',
          [],
          () => {
            console.log('USER TABLE CREATE #####', 'Users table created successfully')
          },
          (_, error) => {
            console.error('Error creating users table:', error)
            return false
          }
        )
      },
      (error) => {
        console.error('Error opening database transaction:', error)
      }
    )

    set({ db })
  },

  fetchUsers: () => {
    const { db } = useUserDatabaseStore.getState()
    if (!db) return

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users',
        [],
        (_, { rows }) => {
          const users: User[] = []
          for (let i = 0; i < rows.length; i++) {
            users.push(rows.item(i))
          }
          console.log('FETCHING #####', 'Fetched users:', rows)
          set({ users })
        },
        (_, error) => {
          console.error('Error fetching users:', error)
          return false
        }
      )
    })
  },

  insertUser: (user) => {
    const { db } = useUserDatabaseStore.getState()
    if (!db) return

    return new Promise<number>((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'INSERT INTO users (name, productId, email, password, phone, img) VALUES (?, ?, ?, ?, ?, ?)',
            [
              user.name,
              JSON.stringify(user.productId),
              user.email,
              user.password,
              user.phone,
              user.img
            ],
            (_, results) => {
              const { insertId } = results
              if (insertId) {
                console.log('INSERT USER #####', 'User inserted successfully:', {
                  id: insertId,
                  ...user
                })
                resolve(insertId)
              } else {
                reject(new Error('Failed to retrieve insertId'))
              }
            },
            (_, error) => {
              console.error('Error inserting user:', error)
              reject(error)
              return false
            }
          )
        },
        (error) => {
          console.error('Transaction error:', error)
          reject(error)
        }
      )
    })
  },

  getUserByEmailAndPasswordOrPhone: async (email, password?, phone?): Promise<User | null> => {
    const { db } = useUserDatabaseStore.getState()
    if (!db) return

    let query = 'SELECT * FROM users WHERE email = ?'
    let params = [email]

    if (password) {
      query += ' AND password = ?'
      params.push(password)
    }

    if (phone) {
      query += ' OR phone = ?'
      params.push(phone)
    }

    return new Promise<User | null>((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          query,
          params,
          (_, { rows }) => {
            if (rows.length > 0) {
              console.log('GET BY EMAIL AND PASSWORD OR PHONE #####', 'User found:', rows._array)

              resolve(rows.item(0))
            } else {
              resolve(null)
            }
          },
          (_, error) => {
            console.error('Error fetching user by email and password or phone:', error)
            reject(error)
            return false
          }
        )
      })
    })
  },

  deleteUser: (id) => {
    const { db } = useUserDatabaseStore.getState()
    if (!db) return

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM users WHERE id = ?',
        [id],
        () => {
          console.log('DELETE USER BY ID #####', `User with ID || ${id} || deleted successfully`)
          useUserDatabaseStore.getState().fetchUsers()
        },
        (_, error) => {
          console.error(`Error deleting user with ID ${id}:`, error)
          return false
        }
      )
    })
  },

  deleteAllUsers: async () => {
    const { db } = useUserDatabaseStore.getState()
    if (!db) return

    const executeSqlPromise = () => {
      return new Promise<void>((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM users',
            [],
            (_, results) => {
              set((state) => ({ ...state, users: [] }))
              console.log('DELETE ALL #####', 'All users deleted successfully')
              resolve()
            },
            (_, error) => {
              console.error('Error deleting all users:', error)
              reject(error)
              return false
            }
          )
        })
      })
    }

    const vacuumPromise = () => {
      return new Promise<void>((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql('VACUUM', [], (_, vacuumResults) => {
            console.log('Vacuum executed successfully', vacuumResults)
            useUserDatabaseStore.getState().fetchUsers()
            resolve()
          })
        })
      })
    }

    try {
      await executeSqlPromise()
      await vacuumPromise()
    } catch (error) {
      console.error('Error during deleteAllUsers:', error)
    }
  },

  deleteUsersTable: () => {
    const { db } = useUserDatabaseStore.getState()
    if (!db) return

    db.transaction((tx) => {
      tx.executeSql(
        'DROP TABLE IF EXISTS users',
        [],
        (_, results) => {
          console.log('DROP TABLE #####', 'Table || users || deleted successfully')
        },
        (_, error) => {
          console.error('Error deleting table "users":', error)
          return false
        }
      )
    })
  },

  updateUser: (id, updatedUser) => {
    const { db } = useUserDatabaseStore.getState()
    if (!db) return

    const { name, email, password, phone, img, productId } = updatedUser
    const valuesToUpdate = []
    if (name) valuesToUpdate.push(`name = '${name}'`)
    if (email) valuesToUpdate.push(`email = '${email}'`)
    if (password) valuesToUpdate.push(`password = '${password}'`)
    if (phone) valuesToUpdate.push(`phone = '${phone}'`)
    if (img !== undefined) valuesToUpdate.push(`img = '${img}'`)
    if (productId !== undefined) valuesToUpdate.push(`productId = '${JSON.stringify(productId)}'`)

    const updateQuery = `UPDATE users SET ${valuesToUpdate.join(', ')} WHERE id = ?`
    const params = [id]

    return new Promise<void>((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          updateQuery,
          params,
          (_, results) => {
            console.log('UPDATE USER #####', 'User updated successfully:', {
              ...updatedUser
            })
            useUserDatabaseStore.getState().fetchUsers()
            resolve()
          },
          (_, error) => {
            console.error('Error updating user:', error)
            reject(error)
            return false
          }
        )
      })
    })
  }
}))
