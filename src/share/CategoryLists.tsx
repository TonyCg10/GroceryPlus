import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { ProductState, useProductStore } from '../../store/productStore.store'
import { basePagesStyle } from '../indexStyle/baseStyle'
import { ProductDatabaseStore, useProductDatabaseStore } from '../../store/database/productDatabase'
import { useEffect, useState } from 'react'
import { showMessage } from 'react-native-flash-message'

import Header from './utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'

const CategoryLists = ({ navigation, route }) => {
  const { setProductId, productId, setWishes, wishes } = useProductStore(
    (state: ProductState) => state
  )

  const [wish, setWish] = useState({})

  const ids = []
  ids.push(Object.keys(wish).map(Number))
  console.log(wishes)

  const { category } = route.params
  const { productsArray } = useProductDatabaseStore((state: ProductDatabaseStore) => state)

  const handleAddToBag = (data) => {
    return (
      !productId.includes(data.id) && setProductId([data.id]),
      showMessage({
        icon: 'success',
        message: 'Added to your Bag!',
        type: 'success'
      })
    )
  }

  const handleWishes = (data: number, productWish: boolean) => {
    if (wish[data]) {
      // @ts-ignore
      const { [data]: removedWish, ...restWishes } = wish
      setWish(restWishes)
      ids.pop()
    } else {
      setWish((prevWishes) => ({ ...prevWishes, [data]: !productWish }))
    }
  }

  useEffect(() => {
    setWishes(ids[0])
  }, [])

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title={category}
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={baseGridsStyle.gridsScreen}>
          {productsArray
            .filter((item) => item.category.toUpperCase().includes(category))
            .map((data, key) => {
              const finalPrice = data.price - data.discountPercentage
              const productWish = wish[data.id] || false

              return (
                <View key={key} style={baseGridsStyle.gridsContainer}>
                  <Image source={{ uri: data.thumbnail }} style={baseGridsStyle.image} />
                  <Text style={baseGridsStyle.text}>{data.title}</Text>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row'
                    }}>
                    <Text style={baseGridsStyle.price}>${finalPrice.toFixed(2)}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        handleWishes(data.id, productWish)
                      }}>
                      <AntDesign size={24} name={productWish ? 'star' : 'staro'} color="gold" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={baseGridsStyle.pressable}
                    onPress={() => handleAddToBag(data)}>
                    <View style={baseGridsStyle.pressableView}>
                      <Feather
                        style={baseGridsStyle.pressableIcon}
                        color={'white'}
                        size={20}
                        name="shopping-bag"
                      />
                      <Text style={baseGridsStyle.pressableText}>Add to Bag</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CategoryLists

const baseGridsStyle = StyleSheet.create({
  pressableView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  pressableIcon: {
    alignSelf: 'center',
    marginRight: '5%'
  },
  pressableText: {
    color: 'white',
    fontWeight: 'bold'
  },
  pressable: {
    backgroundColor: '#5EC401',
    padding: '3%',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginTop: '5%'
  },
  gridsScreen: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: '-2%'
  },
  gridsContainer: {
    flex: 1,
    marginVertical: '8%',
    marginHorizontal: '2%',
    minWidth: 120,
    borderRadius: 10
  },
  image: {
    alignSelf: 'center',
    width: 180,
    height: 180,
    borderRadius: 10
  },
  text: {
    marginTop: '5%',
    minHeight: 60
  },
  price: {
    color: '#5EC401',
    fontSize: 18,
    fontWeight: 'bold'
  }
})
