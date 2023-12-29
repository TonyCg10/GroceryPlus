import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import {
  ProductState,
  useProductStore,
} from '../../../store/productStore.store'
import { useState } from 'react'
import {
  ProductDatabaseStore,
  useProductDatabaseStore,
} from '../../../store/database/productDatabase'

import Entypo from 'react-native-vector-icons/Entypo'

const ProductsSelected = () => {
  const { productId, removeProductId } = useProductStore(
    (state: ProductState) => state,
  )
  const { productsArray } = useProductDatabaseStore(
    (state: ProductDatabaseStore) => state,
  )

  const [many, setMany] = useState(0)

  return (
    <View>
      <Text style={styles.text1}>Products</Text>
      {productsArray
        .filter((item) => productId.includes(item.id))
        .map((data, key) => {
          const handleOnDecrees = () => {
            many == 0
              ? removeProductId(data.id)
              : (setMany(many - 1), data.stock + 1)
          }
          const handleOnIncrease = () => {
            setMany(many + 1)
            data.stock - 1
          }
          const finalPrice = data.price - data.discountPercentage

          return (
            <View key={key} style={styles.container}>
              <Image source={{ uri: data.thumbnail }} style={styles.image} />
              <View style={styles.flex}>
                <Text style={styles.title}>{data.title}</Text>
                <View style={styles.info}>
                  <Text style={styles.price}>$ {finalPrice.toFixed(2)}</Text>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.minus}
                      onPress={handleOnDecrees}
                    >
                      <Entypo color="white" name="minus" />
                    </TouchableOpacity>
                    <Text style={styles.many}>{many}</Text>
                    <TouchableOpacity
                      style={styles.plus}
                      onPress={handleOnIncrease}
                    >
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
    fontSize: 15,
  },
  flex: {
    flex: 1,
  },
  title: {
    marginLeft: '5%',
    fontWeight: '600',
    fontSize: 16,
  },
  info: {
    flexDirection: 'row',
    flex: 1,
  },
  price: {
    alignSelf: 'flex-end',
    marginLeft: '5%',
    color: '#5EC401',
    fontSize: 16,
    fontWeight: 'bold',
  },
  discountPercentage: {
    marginTop: '15%',
  },
  container: {
    flexDirection: 'row',
    marginVertical: '5%',
  },
  image: {
    height: 100,
    width: 100,
  },
  many: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginLeft: '25%',
    flex: 1,
    justifyContent: 'space-around',
  },
  minus: {
    backgroundColor: '#f66',
    alignSelf: 'center',
    padding: '6%',
    borderRadius: 5,
  },
  plus: {
    backgroundColor: '#5EC401',
    alignSelf: 'center',
    padding: '6%',
    borderRadius: 5,
  },
})
