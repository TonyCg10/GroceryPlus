import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'
import {
  ProductDatabaseStore,
  useProductDatabaseStore
} from '../../../store/database/productDatabase'

import Entypo from 'react-native-vector-icons/Entypo'

type Props = {
  productId: number[]
  removeProductId: (id: number) => void
}

const ProductsSelected = ({ productId, removeProductId }: Props) => {
  const { productsArray } = useProductDatabaseStore((state: ProductDatabaseStore) => state)

  const [quantities, setQuantities] = useState(Array(productsArray.length).fill(0))

  const handleOnDecrease = (productId) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, index) =>
        productId === productsArray[index].id ? Math.max(quantity - 1, 0) : quantity
      )
    )
    const isQuantityZero = quantities.some(
      (quantity, index) => productId === productsArray[index].id && quantity <= 1
    )

    if (isQuantityZero) {
      removeProductId(productId)
    }
  }

  const handleOnIncrease = (productId) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, index) =>
        productId === productsArray[index].id ? quantity + 1 : quantity
      )
    )
  }

  return (
    <View>
      <Text style={styles.text1}>Products</Text>
      {productsArray
        .filter((item) => productId.includes(item.id))
        .map((data, key) => {
          const quantity = quantities.filter(Number)[key]
          if (typeof quantity !== 'number')
            setQuantities((prevQuantities) =>
              prevQuantities.map((quantity, index) =>
                data.id === productsArray[index].id ? quantity + 1 : quantity
              )
            )
          const finalPrice = data.price - data.discountPercentage

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
                  <Text style={styles.price}>$ {finalPrice.toFixed(2)}</Text>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.minus}
                      onPress={() => handleOnDecrease(data.id)}>
                      <Entypo color="white" name="minus" />
                    </TouchableOpacity>
                    <Text style={styles.many}>{quantity}</Text>
                    <TouchableOpacity style={styles.plus} onPress={() => handleOnIncrease(data.id)}>
                      <Entypo color="white" name="plus" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )
        })}
    </View>
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
    fontSize: 16,
    fontWeight: 'bold'
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
    marginLeft: '25%',
    flex: 1,
    justifyContent: 'space-around'
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
