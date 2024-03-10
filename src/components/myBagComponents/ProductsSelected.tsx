import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl
} from 'react-native'
import { useEffect, useState } from 'react'
import { Product } from '../../../store/database/GroceryData'

import Entypo from 'react-native-vector-icons/Entypo'

type Props = {
  product: Product[]
  isLoading: boolean

  fetchProducts: () => void
  removeProductId: (id: string) => void
  setQuantitys: (q: any) => void
  setProductsID: (IDs: any[]) => void
}

const ProductsSelected = ({
  product,
  isLoading,

  fetchProducts,
  removeProductId,
  setQuantitys,
  setProductsID
}: Props) => {
  const [quantities, setQuantities] = useState([])
  useEffect(() => {
    setProductsID(quantities)
  }, [setQuantities, quantities])

  useEffect(() => {
    const initialQuantities = product.map((data) => ({ productId: data._id, quantity: 1 }))
    setQuantities(initialQuantities)
  }, [product])

  const handleOnIncrease = (productId) => {
    setQuantities((prevQuantities) => {
      const existingProductIndex = prevQuantities.findIndex((item) => item.productId === productId)

      if (existingProductIndex !== -1) {
        return prevQuantities.map((item, index) => {
          if (index === existingProductIndex) {
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        })
      } else {
        return [...prevQuantities, { productId, quantity: 1 }]
      }
    })
  }

  const handleOnDecrease = (productId) => {
    setQuantities((prevQuantities) => {
      const existingProductIndex = prevQuantities.findIndex((item) => item.productId === productId)

      if (existingProductIndex !== -1) {
        return prevQuantities
          .map((item, index) => {
            if (index === existingProductIndex) {
              const updatedQuantity = item.quantity - 1
              if (updatedQuantity === 0) {
                removeProductId(productId)
              } else {
                return { ...item, quantity: updatedQuantity }
              }
            }
            return item
          })
          .filter(Boolean)
      } else {
        return prevQuantities
      }
    })
  }

  let totalPrice = 0

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchProducts} />}>
      <Text style={styles.text1}>Products</Text>
      {product.map((data, key) => {
        const price = data.price * quantities[key]?.quantity
        setQuantitys((totalPrice += price))

        return (
          <View key={key} style={styles.container}>
            <Image
              source={{
                uri: data.thumbnail
              }}
              style={styles.image}
            />
            <View style={styles.flex}>
              <Text style={styles.title}>{data.title}</Text>
              <View style={styles.info}>
                <Text style={styles.price}>
                  $ {(data.price * quantities[key]?.quantity).toFixed(2)}
                </Text>
                <View style={styles.btnContainer}>
                  <TouchableOpacity style={styles.minus} onPress={() => handleOnDecrease(data._id)}>
                    <Entypo color="white" name="minus" />
                  </TouchableOpacity>
                  <Text style={styles.many}>
                    {quantities
                      .filter((id) => id.productId.includes(data._id))
                      .map((q) => q.quantity)}
                  </Text>
                  <TouchableOpacity style={styles.plus} onPress={() => handleOnIncrease(data._id)}>
                    <Entypo color="white" name="plus" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

export default ProductsSelected

const styles = StyleSheet.create({
  text1: {
    marginVertical: '5%',
    fontWeight: 'bold',
    fontSize: 15
  },
  flex: {
    flex: 1
  },
  title: {
    marginLeft: '5%',
    fontWeight: '600',
    fontSize: 16
  },
  info: {
    flexDirection: 'row',
    flex: 1
  },
  price: {
    alignSelf: 'flex-end',
    marginLeft: '5%',
    color: '#5EC401',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1
  },
  discountPercentage: {
    marginTop: '15%'
  },
  container: {
    flexDirection: 'row',
    marginVertical: '5%'
  },
  image: {
    height: 100,
    width: 100
  },
  many: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  btnContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    flex: 1,
    justifyContent: 'space-between'
  },
  minus: {
    backgroundColor: '#f66',
    alignSelf: 'center',
    padding: '6%',
    borderRadius: 5
  },
  plus: {
    backgroundColor: '#5EC401',
    alignSelf: 'center',
    padding: '6%',
    borderRadius: 5
  }
})
