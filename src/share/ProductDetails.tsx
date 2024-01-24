import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { basePagesStyle } from '../indexStyle/baseStyle'
import { ScrollView } from 'react-native'
import { ProductState, useProductStore } from '../../store/productStore.store'
import { ProductDatabaseStore, useProductDatabaseStore } from '../../store/database/productDatabase'
import { useState } from 'react'
import { showMessage } from 'react-native-flash-message'

import Header from './utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import StarRating from 'react-native-star-rating-widget'

const ProductDetails = ({ route, navigation }) => {
  const { setProductId } = useProductStore((state: ProductState) => state)
  const { productsArray } = useProductDatabaseStore((state: ProductDatabaseStore) => state)

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [wish, setWish] = useState(false)

  const { id } = route.params
  const product = productsArray.find((product) => product.id === id)
  const parts = product.images.split(/[\\",]+/)
  const images = parts.filter((part) => part.trim() !== '').slice(1)
  const finalPrice = product.price - product.discountPercentage

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
            id && setProductId([id])
            setWish(!wish)
          }}>
          <AntDesign size={24} name={wish ? 'star' : 'staro'} color="gold" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{
            uri: images[selectedImageIndex ?? 0]
          }}
          style={productDetailsStyle.firstImages}
        />
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {images.map((images: string, key: number) => {
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
          <Text style={productDetailsStyle.price}>${finalPrice.toFixed(2)}</Text>
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
        <View style={productDetailsStyle.else}>
          <Text>You can also see</Text>
          <View>
            {productsArray
              .filter((item) => item.category.includes(product.category))
              .map((data, key) => {
                return (
                  <View key={key} style={resultStyles.container}>
                    <TouchableOpacity
                      key={data.id}
                      onPress={() => {
                        navigation.navigate('ProductDetails', {
                          id: data.id
                        })
                      }}>
                      <View style={resultStyles.contentContainer}>
                        <Image
                          source={{
                            uri: data.thumbnail
                          }}
                          style={resultStyles.image}
                        />
                        <View style={resultStyles.info}>
                          <Text style={resultStyles.description}>{data.description}</Text>
                          <View style={resultStyles.textContainer}>
                            <View>
                              <Text style={resultStyles.price}>${data.price}</Text>
                              <Text style={resultStyles.discountPercentage}>
                                off ${data.discountPercentage}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              })
              .slice(0, 2)}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            id && setProductId([id]),
              showMessage({
                icon: 'success',
                message: 'Added to your Bag!',
                type: 'success'
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
    fontSize: 18
  },
  price: {
    alignSelf: 'flex-end',
    color: '#5EC401',
    fontWeight: 'bold',
    fontSize: 18
  }
})

const resultStyles = StyleSheet.create({
  container: {
    margin: '4%'
  },
  contentContainer: {
    flexDirection: 'row',
    margin: 10
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10
  },
  info: {
    marginLeft: '10%',
    width: '70%'
  },
  description: {
    flexWrap: 'wrap',
    flexShrink: 1
  },
  textContainer: {
    flexDirection: 'row'
  },
  price: {
    marginVertical: '20%'
  },
  discountPercentage: {
    color: '#F37A20',
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonContainer: {
    alignSelf: 'center',
    flex: 1
  },
  pressable: {
    alignItems: 'flex-end'
  },
  insideButton: {
    backgroundColor: '#5EC401',
    borderRadius: 10,
    padding: '6%',
    color: 'white',
    flexDirection: 'row'
  }
})
