import { View, Image, Text, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { PRODUCT, URL } from '../../express/utils'

import axios from 'axios'

type Pops = {
  display: boolean
  navigation: any
}

const Grids = ({ display, navigation }: Pops) => {
  const [productsArray, setProductsArray] = useState([])

  const uniqueCategories = [
    ...new Set(productsArray.map((item) => item.category.toLowerCase().trim()))
  ]

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

  return display ? (
    <View style={baseGridsStyle.gridsScreen}>
      {productsArray.map((data, key) => {
        return (
          <TouchableOpacity
            key={key}
            onPress={() => {
              navigation.navigate('ProductDetails', {
                _id: data._id
              })
            }}
            style={baseGridsStyle.gridsContainer}>
            <Image
              source={{
                uri: data.thumbnail
              }}
              style={baseGridsStyle.image}
            />

            <Text style={baseGridsStyle.text}>{data.brand}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  ) : (
    <View style={baseGridsStyle.gridsScreen}>
      {uniqueCategories.map((category, categoryIndex) => {
        const representativeItem = productsArray.find(
          (data) => data.category.toLowerCase().trim() === category
        )

        return (
          <TouchableOpacity
            key={categoryIndex}
            onPress={() => {
              navigation.navigate('CategoryLists', {
                category: representativeItem.category.toUpperCase()
              })
            }}
            style={baseGridsStyle.gridsContainer}>
            <Image
              source={{
                uri: representativeItem.thumbnail
              }}
              style={baseGridsStyle.image}
            />
            <Text style={baseGridsStyle.text}>{representativeItem.category}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Grids

const baseGridsStyle = StyleSheet.create({
  gridsScreen: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: '-2%'
  },
  gridsContainer: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.02,
    elevation: 6,
    flex: 1,
    marginVertical: '2%',
    marginHorizontal: '2%',
    height: 160,
    minWidth: 140,
    borderRadius: 10
  },
  image: {
    alignSelf: 'center',
    flex: 1,
    width: 120,
    maxHeight: 130,
    borderRadius: 10,
    marginTop: 15
  },
  text: {
    textAlign: 'center',
    marginTop: '5%'
  }
})
