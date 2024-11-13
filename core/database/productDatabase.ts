import { create } from 'zustand'
import { Product } from './GroceryData'
import * as SQLite from 'expo-sqlite'

export interface ProductDatabaseStore {
  db: SQLite.SQLiteDatabase | null
  productsArray: Product[]

  initializeProductDB: () => void
  fetchProducts: () => void
  insertProduct: (product: Product) => Promise<void>
  getProductsById: (id: number, should: boolean) => Promise<Product>
  deleteProductTable: () => void
  deleteProduct: (id: number) => void
  deleteAllProducts: () => void

  //   updateProduct: (id: number, updatedProduct: Partial<ProductType>) => void
}

export const useProductDatabaseStore = create<ProductDatabaseStore>((set) => ({
  db: null,
  productsArray: [],

  initializeProductDB: () => {
    const db = SQLite.openDatabase('products.db')

    db.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, brand TEXT, category TEXT, description TEXT, discountPercentage REAL, images TEXT,price REAL, rating REAL, stock INTEGER, thumbnail TEXT, title TEXT)',
          [],
          () => {
            console.log('PRODUCTS TABLE CREATE #####', 'Products table created successfully')
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
  fetchProducts: () => {
    const { db } = useProductDatabaseStore.getState()
    if (!db) return

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM products',
        [],
        (_, { rows }) => {
          const products: Product[] = []
          for (let i = 0; i < rows.length; i++) {
            products.push(rows.item(i))
          }
          console.log('FETCHING #####', 'Fetched products')
          set({ productsArray: products })
        },
        (_, error) => {
          console.error('Error fetching products:', error)
          return false
        }
      )
    })
  },
  insertProduct: (product) => {
    const { db } = useProductDatabaseStore.getState()
    if (!db) return Promise.reject(new Error('Database not initialized'))

    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'INSERT INTO products (id, brand, category, description, discountPercentage, images, price, rating, stock, thumbnail, title) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
              product.id,
              product.brand,
              product.category,
              product.description,
              product.discountPercentage,
              JSON.stringify(product.images),
              product.price,
              product.rating,
              product.stock,
              product.thumbnail,
              product.title
            ],
            (_, results) => {
              console.log('INSERT Product #####', 'Product inserted successfully:', results)
              resolve()
            },
            (_, error) => {
              console.error('Error inserting product:', error)
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
  getProductsById: async (id, should): Promise<Product> => {
    const { db } = useProductDatabaseStore.getState()
    if (!db) return
    return new Promise<Product>((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          ' SELECT * FROM products WHERE id = ?',
          [id],
          (_, { rows }) => {
            if (rows.length > 0) {
              if (should) {
                console.log('GET BY ID #####', 'Product found:', rows._array)
              }
              resolve(rows.item(0))
            } else {
              resolve(null)
            }
          },
          (_, error) => {
            console.error('Error executing SQL query:', error)
            reject(error)
            return false
          }
        )
      })
    })
  },
  deleteProductTable: () => {
    const { db } = useProductDatabaseStore.getState()
    if (!db) return

    db.transaction((tx) => {
      tx.executeSql(
        'DROP TABLE IF EXISTS products',
        [],
        (_) => {
          console.log('DROP TABLE #####', 'Table || products || deleted successfully')
        },
        (_, error) => {
          console.error('Error deleting table "products":', error)
          return false
        }
      )
    })
  },
  deleteProduct: (id) => {
    const { db } = useProductDatabaseStore.getState()
    if (!db) return

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM products WHERE id = ?',
        [id],
        () => {
          console.log(
            'DELETE PRODUCT BY ID #####',
            `Product with ID || ${id} || deleted successfully`
          )
          useProductDatabaseStore.getState().fetchProducts()
        },
        (_, error) => {
          console.error(`Error deleting user with ID ${id}:`, error)
          return false
        }
      )
    })
  },
  deleteAllProducts: async () => {
    const { db } = useProductDatabaseStore.getState()
    if (!db) return

    const executeSqlPromise = () => {
      return new Promise<void>((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM products',
            [],
            (_, results) => {
              set((state) => ({ ...state, productsArray: [] }))
              console.log('DELETE ALL #####', 'All products deleted successfully')
              useProductDatabaseStore.getState().fetchProducts()
              resolve()
            },
            (_, error) => {
              console.error('Error deleting all products:', error)
              reject(error)
              return false
            }
          )
        })
      })
    }

    try {
      await executeSqlPromise()
    } catch (error) {
      console.error('Error during deleteAllProducts:', error)
    }
  }
}))
