import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Product } from '../../core/database/GroceryData'
import { basePagesStyle } from '../../styles/baseStyle'
import { ProductState, useProductStore } from '../../core/store/productStore.store'
import { showMessage } from 'react-native-flash-message'

import Feather from 'react-native-vector-icons/Feather'

type Prop = {
  look: string
  productData: any[]
  navigation: any
  rate: number
}

const Results = ({ navigation, look, productData, rate }: Prop) => {
  const { setProductId, productId } = useProductStore((state: ProductState) => state)

  const handleAddToBag = (data) => {
    return (
      !productId.includes(data.id) && setProductId([data.id]),
      showMessage({
        message: 'Added to your Bag!',
        type: 'success',
        icon: 'success',
        hideStatusBar: true
      })
    )
  }

  return (
    <>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={resultSyles.scrollVertical}>
          {productData
            .map((data, key) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetails', {
                      _id: data._id
                    })
                  }
                  key={key}>
                  <Text style={resultSyles.scrollVerticalText}>{data.title}</Text>
                </TouchableOpacity>
              )
            })
            .slice(0, Math.random() * 10 + 8)}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={resultSyles.scrollHorizontal}>
        {productData
          .filter(
            (item) =>
              item.title.toLowerCase().trim().includes(look.toLowerCase()) ||
              (item.brand.toLowerCase().trim().includes(look.toLowerCase()) &&
                Math.floor(item.rating) == rate)
          )
          .map((data, key) => {
            return (
              <View key={key} style={resultSyles.container}>
                <TouchableOpacity
                  key={data.id}
                  onPress={() => {
                    navigation.navigate('ProductDetails', {
                      _id: data._id
                    })
                  }}>
                  <View style={resultSyles.contentContainer}>
                    <Image
                      source={{
                        uri: data.thumbnail
                      }}
                      style={resultSyles.image}
                    />
                    <View style={resultSyles.info}>
                      <Text style={resultSyles.description}>{data.description}</Text>
                      <View style={resultSyles.textContainer}>
                        <View>
                          <Text style={resultSyles.price}>${data.price}</Text>
                          <Text style={resultSyles.discountPercentage}>
                            off ${data.discountPercentage}
                          </Text>
                        </View>

                        <View style={resultSyles.buttonContainer}>
                          <TouchableOpacity
                            style={resultSyles.pressable}
                            onPress={() => handleAddToBag(data)}>
                            <View style={resultSyles.insideButton}>
                              <Feather
                                color={'white'}
                                size={20}
                                name="shopping-bag"
                                style={resultSyles.icon}
                              />
                              <Text style={resultSyles.add}>Add</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={basePagesStyle.line} />
              </View>
            )
          })}
      </ScrollView>
    </>
  )
}

export default Results

const resultSyles = StyleSheet.create({
  add: {
    color: 'white'
  },
  icon: {
    alignSelf: 'center',
    marginHorizontal: '10%'
  },
  scrollVertical: {
    paddingBottom: '2%',
    marginHorizontal: '-3%'
  },
  scrollVerticalText: {
    backgroundColor: 'silver',
    margin: 10,
    padding: 15,
    borderRadius: 10
  },
  scrollHorizontal: {
    backgroundColor: 'white',
    marginHorizontal: '-5%',
    maxHeight: '82%'
  },
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
    color: '#5EC401',
    marginVertical: '20%',
    fontWeight: '600'
  },
  discountPercentage: {
    color: '#F37A20',
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flex: 1,
    alignContent: 'flex-end',
    alignSelf: 'flex-end'
  },
  pressable: {
    alignItems: 'flex-end'
  },
  insideButton: {
    backgroundColor: '#5EC401',
    borderRadius: 10,
    padding: '6%',
    flexDirection: 'row'
  }
})
