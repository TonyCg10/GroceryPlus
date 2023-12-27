import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { basePagesStyle } from '../indexStyle/baseStyle'
import { ScrollView } from 'react-native'
import { DataType, useGroceryData } from './utils/GroceryData'
import { ProductState, useProductStore } from '../../store/productStore.store'
import { useState } from 'react'

import Header from './utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import StarRating from 'react-native-star-rating-widget'

const ProductDetails = ({ route, navigation }) => {
  const { setProductId } = useProductStore((state: ProductState) => state)
  const { groceryData } = useGroceryData()

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const {
    id,
    description,
    images,
    title,
    price,
    rating,
    stock,
    discountPercentage,
    category,
  }: DataType = route.params

  const finalPrice = price - discountPercentage

  const handleImagePress = (key: number) => {
    setSelectedImageIndex(key)
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Product Details"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{
            uri: images[selectedImageIndex ?? 0],
          }}
          style={productDetailsStyle.firstImages}
        />
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {images.map((images: string, key: number) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleImagePress(key)
                }}
                activeOpacity={0.5}
                key={key}
                style={[
                  productDetailsStyle.rowImages,
                  selectedImageIndex === key
                    ? productDetailsStyle.pressedImage
                    : null,
                ]}
              >
                <Image
                  source={{
                    uri: images,
                  }}
                  style={productDetailsStyle.images}
                />
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        <Text style={productDetailsStyle.description}>{description}</Text>
        <View style={productDetailsStyle.pricesContainer}>
          <Text style={productDetailsStyle.title}>{title}</Text>
          <Text style={productDetailsStyle.price}>
            ${finalPrice.toFixed(2)}
          </Text>
        </View>
        <Text>There is {stock} in stock</Text>

        <View style={productDetailsStyle.rateView}>
          <Text style={productDetailsStyle.rate}>{rating}</Text>
          <StarRating rating={rating} onChange={() => {}} />
        </View>
        <View>
          <View style={productDetailsStyle.productView}>
            <Feather name="align-left" size={20} />
            <Text style={productDetailsStyle.product}>{category} products</Text>
          </View>
          <View style={productDetailsStyle.descriptionView}>
            <Ionicons name="reorder-three-outline" size={24} />
            <Text style={productDetailsStyle.secondDescription}>
              {description}
            </Text>
          </View>
        </View>
        <View style={productDetailsStyle.else}>
          <Text>You can alse see</Text>
          <View>
            {groceryData
              .filter((item) => item.category.includes(category))
              .map((data, key) => {
                return (
                  <View key={key} style={resultSyles.container}>
                    <TouchableOpacity
                      key={data.id}
                      onPress={() => {
                        navigation.navigate('ProductDetails', {
                          id: data.id,
                          description: data.description,
                          images: data.images,
                          title: data.title,
                          price: data.price,
                          rating: data.rating,
                          stock: data.stock,
                          discountPercentage: data.discountPercentage,
                          thumbnail: data.thumbnail,
                          category: data.category,
                        })
                      }}
                    >
                      <View style={resultSyles.contentContainer}>
                        <Image
                          source={{
                            uri: data.thumbnail,
                          }}
                          style={resultSyles.image}
                        />
                        <View style={resultSyles.info}>
                          <Text style={resultSyles.description}>
                            {data.description}
                          </Text>
                          <View style={resultSyles.textContainer}>
                            <View>
                              <Text style={resultSyles.price}>
                                ${data.price}
                              </Text>
                              <Text style={resultSyles.discountPercentage}>
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
            id && setProductId([id])
          }}
        >
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
    marginVertical: '5%',
  },
  rateView: {
    alignSelf: 'center',
    marginVertical: '10%',
  },
  productView: {
    flexDirection: 'row',
  },
  product: {
    marginLeft: '3%',
  },
  descriptionView: {
    flexDirection: 'row',
    marginVertical: '5%',
  },
  secondDescription: {
    marginLeft: '3%',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  else: {
    marginTop: '10%',
  },
  pressableIcon: {
    alignSelf: 'center',
    marginLeft: '5%',
  },
  pressableText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pressable: {
    backgroundColor: '#5EC401',
    marginBottom: '5%',
    padding: '3%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  firstImages: {
    alignSelf: 'center',
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  rowImages: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '10%',
    marginRight: 25,
  },
  images: {
    width: 80,
    height: 100,
    borderRadius: 10,
  },
  pressedImage: {
    borderWidth: 2,
    borderColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  pricesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '5%',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: '5%',
  },
  title: {
    alignSelf: 'center',
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontSize: 18,
  },
  price: {
    alignSelf: 'flex-end',
    color: '#5EC401',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

const resultSyles = StyleSheet.create({
  container: {
    margin: '4%',
  },
  contentContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  info: {
    marginLeft: '10%',
    width: '70%',
  },
  description: {
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  textContainer: {
    flexDirection: 'row',
  },
  price: {
    marginVertical: '20%',
  },
  discountPercentage: {
    color: '#F37A20',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignSelf: 'center',
    flex: 1,
  },
  pressable: {
    alignItems: 'flex-end',
  },
  insideButton: {
    backgroundColor: '#5EC401',
    borderRadius: 10,
    padding: '6%',
    color: 'white',
    flexDirection: 'row',
  },
})
