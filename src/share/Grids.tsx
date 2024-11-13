import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { useEffect } from 'react'
import { useProductStore, ProductState } from '../../core/store/productStore.store'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList, routes } from '../utils/useAppNavigation'

type Pops = {
  display: boolean
  navigation: StackNavigationProp<RootStackParamList>
}

const Grids = ({ display, navigation }: Pops) => {
  const { fetchProductsData, products } = useProductStore((state: ProductState) => state)

  useEffect(() => {
    fetchProductsData()
  }, [])

  const uniqueCategories = [...new Set(products.map((item) => item.category.toLowerCase().trim()))]

  return display ? (
    <View style={baseGridsStyle.gridsScreen}>
      {products.map((data, key) => {
        return (
          <TouchableOpacity
            key={key}
            onPress={() => {
              navigation.navigate(routes.ProductDetails, {
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
        const representativeItem = products.find(
          (data) => data.category.toLowerCase().trim() === category
        )

        return (
          <TouchableOpacity
            key={categoryIndex}
            onPress={() => {
              navigation.navigate(routes.CategoryLists, {
                category: representativeItem && representativeItem.category.toUpperCase()
              })
            }}
            style={baseGridsStyle.gridsContainer}>
            <Image
              source={{
                uri: representativeItem && representativeItem.thumbnail
              }}
              style={baseGridsStyle.image}
            />
            <Text style={baseGridsStyle.text}>
              {representativeItem && representativeItem.category}
            </Text>
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
