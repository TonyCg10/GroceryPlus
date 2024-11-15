import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl
} from 'react-native'
import { Product } from '../../core/database/GroceryData'

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
  const [quantities, setQuantities] = useState<{ productId: string; quantity: number }[]>([])

  useEffect(() => {
    setProductsID(quantities)
  }, [quantities, setProductsID])

  useEffect(() => {
    const initialQuantities = product?.map((data) => ({ productId: data._id, quantity: 1 }))
    setQuantities(initialQuantities)
  }, [product])

  const handleOnIncrease = (productId: string) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const handleOnDecrease = (productId: string) => {
    setQuantities((prevQuantities) =>
      prevQuantities
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => {
          if (item.quantity === 0) {
            removeProductId(item.productId)
            return false
          }
          return true
        })
    )
  }

  useEffect(() => {
    const totalPrice = product?.reduce((acc, data, key) => {
      const quantity = quantities?.find((item) => item.productId === data._id)?.quantity || 1
      return acc + data.price * quantity
    }, 0)

    setQuantitys(totalPrice)
  }, [product, quantities, setQuantitys])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchProducts} />}>
      <Text style={styles.text1}>Products</Text>
      {product?.map((data, key) => {
        const quantity = quantities?.find((item) => item.productId === data._id)?.quantity || 1
        const price = data.price * quantities[key]?.quantity

        return (
          <View key={key} style={styles.container}>
            <Image source={{ uri: data.thumbnail }} style={styles.image} />
            <View style={styles.flex}>
              <Text style={styles.title}>{data.title}</Text>
              <View style={styles.info}>
                <Text style={styles.price}>$ {price.toFixed(2)}</Text>
                <View style={styles.btnContainer}>
                  <TouchableOpacity style={styles.minus} onPress={() => handleOnDecrease(data._id)}>
                    <Entypo color="white" name="minus" />
                  </TouchableOpacity>
                  <Text style={styles.many}>{quantity}</Text>
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
  },
  totalPrice: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10
  }
})
