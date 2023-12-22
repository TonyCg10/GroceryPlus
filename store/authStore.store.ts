import { create } from 'zustand'
import * as SQLite from 'expo-sqlite'

export interface User {
  id?: number
  name: string
  email: string
  password: string
  phone: string
}

export interface DatabaseStore {
  db: SQLite.SQLiteDatabase | null
  users: User[]

  initializeDB: () => void
  fetchUsers: () => void
  insertUser: (user: User) => void
  getUserByEmailAndPasswordOrPhone: (
    email: string,
    password?: string,
    phone?: string,
  ) => Promise<User | null>
  deleteUser: (id: number) => void
  deleteAllUsers: () => void
  deleteUsersTable: () => void
}

export const useUserDatabaseStore = create<DatabaseStore>((set) => ({
  db: null,
  users: [],

  initializeDB: () => {
    const db = SQLite.openDatabase('mydatabase.db')

    db.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, phone TEXT)',
          [],
          () => {
            console.log(
              'USER TABLE CREATE #####',
              'Users table created successfully',
            )
          },
          (_, error) => {
            console.error('Error creating users table:', error)
            return false
          },
        )
      },
      (error) => {
        console.error('Error opening database transaction:', error)
      },
    )

    set({ db })
  },

  fetchUsers: () => {
    const { db } = useUserDatabaseStore.getState()
    if (!db) {
      console.error('Database not initialized')
      return
    }

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users',
        [],
        (_, { rows }) => {
          const users: User[] = []
          for (let i = 0; i < rows.length; i++) {
            users.push(rows.item(i))
          }
          console.log('FETCHING #####', 'Fetched users:', users)
          set({ users })
        },
        (_, error) => {
          console.error('Error fetching users:', error)
          return false
        },
      )
    })
  },

  insertUser: (user) => {
    const { db } = useUserDatabaseStore.getState()
    if (!db) return
    return new Promise<number>((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
          [user.name, user.email, user.password, user.phone],
          (_, results) => {
            const { insertId } = results
            console.log(
              'INSERT USER #####',
              'User inserted successfully',
              results,
            )
            useUserDatabaseStore.getState().fetchUsers()
            resolve(insertId)
          },
          (_, error) => {
            console.error('Error inserting user:', error)
            reject(error)
            return false
          },
        )
      })
    })
  },

  getUserByEmailAndPasswordOrPhone: async (
    email: string,
    password?: string,
    phone?: string,
  ): Promise<User | null> => {
    const { db } = useUserDatabaseStore.getState()
    if (!db) {
      console.error('Database not initialized')
      return Promise.resolve(null)
    }

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
              console.log(
                'GET BY EMAIL AND PASSWORD OR PHONE #####',
                `${rows.length}`,
                'users found',
                rows,
              )

              resolve(rows.item(0))
            } else {
              resolve(null)
            }
          },
          (_, error) => {
            console.error(
              'Error fetching user by email and password or phone:',
              error,
            )
            reject(error)
            return false
          },
        )
      })
    })
  },

  deleteUser: (id: number) => {
    const { db } = useUserDatabaseStore.getState()
    if (!db) return

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM users WHERE id = ?',
        [id],
        (_, results) => {
          console.log(
            'DELETE USER BY ID #####',
            `User with ID ${id} deleted successfully`,
            results,
          )
          useUserDatabaseStore.getState().fetchUsers()
        },
        (_, error) => {
          console.error(`Error deleting user with ID ${id}:`, error)
          return false
        },
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
              console.log(
                'DELETE ALL #####',
                'All users deleted successfully',
                results,
              )
              resolve()
            },
            (_, error) => {
              console.error('Error deleting all users:', error)
              reject(error)
              return false
            },
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
    if (!db) {
      console.error('Database not initialized')
      return
    }

    db.transaction((tx) => {
      tx.executeSql(
        'DROP TABLE IF EXISTS users',
        [],
        (_, results) => {
          console.log(
            'DROP TABLE #####',
            'Table "users" deleted successfully',
            results,
          )
        },
        (_, error) => {
          console.error('Error deleting table "users":', error)
          return false
        },
      )
    })
  },
}))
