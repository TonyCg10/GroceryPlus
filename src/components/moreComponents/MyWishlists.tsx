import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { basePagesStyle } from '../../styles/baseStyle'
import { ProductState, useProductStore } from '../../../core/store/productStore.store'
import { useEffect, useState } from 'react'
import { showMessage } from 'react-native-flash-message'
import { PRODUCT, URL } from '../../../express/utils'

import Header from '../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'

const MyWishlist = ({ navigation }) => {
  const { wishes, removeWish, productId, setProductId } = useProductStore(
    (state: ProductState) => state
  )

  const [productsArray, setProductsArray] = useState([])

  const productsFetch = async () => {
    const productsArray = await axios.get(`${URL}/${PRODUCT}/check-multiple/${wishes}`)

    console.log('#####')
    console.log(productsArray.data.data)
    console.log('#####')

    return setProductsArray(productsArray.data.data)
  }

  useEffect(() => {
    productsFetch()
  }, [])

  const handleAddToBag = (data) => {
    return (
      !productId.includes(data._id) && setProductId([data._id]),
      showMessage({
        message: 'Added to your Bag!',
        type: 'success',
        icon: 'success',
        hideStatusBar: true
      }),
      removeWish(data.id)
    )
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Wishlist"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <ScrollView>
        {productsArray.map((item, key) => {
          return (
            <View key={key}>
              <TouchableOpacity
                onPress={() => {
                  removeWish(item._id)
                  showMessage({
                    message: 'Unwished',
                    type: 'warning',
                    icon: 'warning',
                    hideStatusBar: true
                  })
                }}
                style={styles.icon}>
                <AntDesign size={24} name={'star'} color="gold" />
              </TouchableOpacity>
              <View style={styles.items}>
                <Image source={{ uri: item.thumbnail }} style={styles.img} />
                <View style={styles.desc}>
                  <Text>{item.description}</Text>
                  <View style={{ flexDirection: 'row', marginVertical: '4%' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.price}>$ {item.price}</Text>
                      <Text style={styles.disc}>
                        $ {(item.price - item.discountPercentage).toFixed(0)}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.pressable} onPress={() => handleAddToBag(item)}>
                      <View style={styles.pressableView}>
                        <Feather
                          style={styles.pressableIcon}
                          color={'white'}
                          size={20}
                          name="shopping-bag"
                        />
                        <Text style={styles.pressableText}>Add to Bag</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={basePagesStyle.line} />
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default MyWishlist

const styles = StyleSheet.create({
  items: {
    marginVertical: '2%',
    flexDirection: 'row'
  },
  img: {
    flex: 1
  },
  desc: {
    flex: 2,
    marginHorizontal: '8%'
  },
  price: {
    marginVertical: '5%',
    textDecorationLine: 'line-through'
  },
  icon: {
    alignItems: 'flex-end',
    width: '100%',
    marginVertical: '3%'
  },
  pressableView: {
    flexDirection: 'row'
  },
  pressableIcon: {
    marginRight: '5%'
  },
  pressableText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  pressable: {
    backgroundColor: '#5EC401',
    padding: '3%',
    borderRadius: 10,
    justifyContent: 'center'
  },
  disc: {
    color: '#F37A20',
    fontWeight: 'bold',
    fontSize: 18
  }
})
