import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { basePagesStyle } from '../styles/baseStyle'
import { ScrollView } from 'react-native'
import { ProductState, useProductStore } from '../../store/productStore.store'
import { useEffect, useState } from 'react'
import { showMessage } from 'react-native-flash-message'
import { PRODUCT, URL } from '../../express/utils'
import { Product } from '../../store/database/GroceryData'

import Header from './utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import StarRating from 'react-native-star-rating-widget'
import axios from 'axios'

const ProductDetails = ({ route, navigation }) => {
  const { _id } = route.params

  const { setProductId, setWishes, removeWish, wishes } = useProductStore(
    (state: ProductState) => state
  )
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    const fetchData = async () => {
      const productsArray = await axios.get(`${URL}/${PRODUCT}/check-single/${_id}`)

      console.log('#####')
      console.log(productsArray.data.product)
      console.log('#####')

      if (productsArray.data.product) {
        setProduct(productsArray.data.product)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleWish = () => {
    if (wishes.includes(_id)) {
      removeWish(_id)
      showMessage({
        message: 'Unwished',
        type: 'warning',
        icon: 'warning',
        hideStatusBar: true
      })
    } else {
      setWishes([_id])
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
      <View style={{ flexDirection: 'row' }}>
        <Header
          title="Product Details"
          actionLeft={<AntDesign size={22} name="arrowleft" />}
          navigation={navigation}
        />
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'flex-end' }}
          onPress={() => {
            handleWish()
          }}>
          <AntDesign size={24} name={wishes.includes(_id) ? 'star' : 'staro'} color="gold" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <></>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={{
              uri: product.images[selectedImageIndex ?? 0]
            }}
            style={productDetailsStyle.firstImages}
          />
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {product.images.map((images: string, key: number) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedImageIndex(key)
                  }}
                  activeOpacity={0.5}
                  key={key}
                  style={[
                    productDetailsStyle.rowImages,
                    selectedImageIndex === key ? productDetailsStyle.pressedImage : null
                  ]}>
                  <Image
                    source={{
                      uri: images
                    }}
                    style={productDetailsStyle.images}
                  />
                </TouchableOpacity>
              )
            })}
          </ScrollView>
          <Text style={productDetailsStyle.description}>{product.description}</Text>
          <View style={productDetailsStyle.pricesContainer}>
            <Text style={productDetailsStyle.title}>{product.title}</Text>
            <Text style={productDetailsStyle.originalPrice}>${product.price}</Text>
            <Text style={productDetailsStyle.price}>
              ${(product.price - product.discountPercentage).toFixed(2)}
            </Text>
          </View>
          <Text>There is {product.stock} in stock</Text>

          <View style={productDetailsStyle.rateView}>
            <Text style={productDetailsStyle.rate}>{product.rating}</Text>
            <StarRating rating={product.rating} onChange={() => {}} />
          </View>
          <View>
            <View style={productDetailsStyle.productView}>
              <Feather name="align-left" size={20} />
              <Text style={productDetailsStyle.product}>{product.category} products</Text>
            </View>
            <View style={productDetailsStyle.descriptionView}>
              <Ionicons name="reorder-three-outline" size={24} />
              <Text style={productDetailsStyle.secondDescription}>{product.description}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              _id && setProductId([_id]),
                showMessage({
                  message: 'Added to your Bag!',
                  type: 'success',
                  icon: 'success',
                  hideStatusBar: true
                })
            }}>
            <View style={productDetailsStyle.pressable}>
              <Text style={productDetailsStyle.pressableText}>Add to Bag</Text>
              <Feather
                style={productDetailsStyle.pressableIcon}
                color={'white'}
                size={20}
                name="shopping-bag"
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

export default ProductDetails

const productDetailsStyle = StyleSheet.create({
  rate: {
    alignSelf: 'center',
    marginVertical: '5%'
  },
  rateView: {
    alignSelf: 'center',
    marginVertical: '10%'
  },
  productView: {
    flexDirection: 'row'
  },
  product: {
    marginLeft: '3%'
  },
  descriptionView: {
    flexDirection: 'row',
    marginVertical: '5%'
  },
  secondDescription: {
    marginLeft: '3%',
    flexWrap: 'wrap',
    flexShrink: 1
  },
  else: {
    marginTop: '10%'
  },
  pressableIcon: {
    alignSelf: 'center',
    marginLeft: '5%'
  },
  pressableText: {
    color: 'white',
    fontWeight: 'bold'
  },
  pressable: {
    backgroundColor: '#5EC401',
    marginBottom: '5%',
    padding: '3%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  firstImages: {
    alignSelf: 'center',
    width: 250,
    height: 250,
    borderRadius: 10
  },
  rowImages: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '10%',
    marginRight: 25
  },
  images: {
    width: 80,
    height: 100,
    borderRadius: 10
  },
  pressedImage: {
    borderWidth: 2,
    borderColor: 'green',
    padding: 10,
    borderRadius: 10
  },
  pricesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '5%'
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: '5%'
  },
  title: {
    alignSelf: 'center',
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 0.8
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#F37A20',
    fontSize: 16,
    alignSelf: 'center'
  },
  price: {
    alignSelf: 'flex-end',
    color: '#5EC401',
    fontWeight: 'bold',
    fontSize: 18
  }
})
