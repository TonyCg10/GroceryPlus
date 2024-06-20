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
import { basePagesStyle } from '../styles/baseStyle'
import { showMessage } from 'react-native-flash-message'
import { useState, useEffect } from 'react'
import { PRODUCT, URL } from '../../express/utils'

import Header from './utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'

const CategoryLists = ({ navigation, route }) => {
  const { category } = route.params

  const { setProductId, productId, setWishes, removeWish, wishes } = useProductStore(
    (state: ProductState) => state
  )

  const [productsArray, setProductsArray] = useState([])

  const productsFetch = async () => {
    const productsArray = await axios.get(`${URL}/${PRODUCT}/get-products`)

    console.log('#####')
    console.log(productsArray.data.products)
    console.log('#####')

    return setProductsArray(productsArray.data.products)
  }

  useEffect(() => {
    productsFetch()
  }, [])

  const handleAddToBag = (data) => {
    !productId.includes(data._id) && setProductId([data._id]),
      showMessage({
        message: 'Added to your Bag!',
        type: 'success',
        icon: 'success',
        hideStatusBar: true
      })
  }

  const handleWish = (id) => {
    if (wishes.includes(id)) {
      removeWish(id)
      showMessage({
        message: 'Unwished',
        type: 'warning',
        icon: 'warning',
        hideStatusBar: true
      })
    } else {
      setWishes([id])
      showMessage({
        message: 'Wished',
        type: 'success',
        icon: 'success',
        hideStatusBar: true
      })
    }
  }

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
                    <Text style={baseGridsStyle.originalPrice}>${data.price.toFixed(2)}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        handleWish(data._id)
                      }}>
                      <AntDesign
                        size={24}
                        name={wishes.includes(data._id) ? 'star' : 'staro'}
                        color="gold"
                      />
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
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#F37A20',
    fontSize: 16,
    alignSelf: 'center'
  },
  price: {
    color: '#5EC401',
    fontSize: 18,
    fontWeight: 'bold'
  }
})
