import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { basePagesStyle } from '../../styles/baseStyle'
import { Product } from '../../../core/database/GroceryData'

import Feather from 'react-native-vector-icons/Feather'

type Prop = {
  productData: any
  navigation: any
}

const PopularResults = ({ productData, navigation }: Prop) => {
  return (
    <ScrollView style={popularResultStyles.popularResultContainer}>
      <View style={popularResultStyles.popularResultItem}>
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
                <View style={popularResultStyles.brands}>
                  <Feather size={18} name="search" />
                  <Text style={popularResultStyles.popularText}>{data.title}</Text>
                </View>
                <View style={basePagesStyle.line} />
              </TouchableOpacity>
            )
          })
          .slice(Math.random() * 10, Math.random() * 10 + 5)}
      </View>
    </ScrollView>
  )
}

export default PopularResults

const popularResultStyles = StyleSheet.create({
  popularResultContainer: {
    backgroundColor: 'white',
    marginHorizontal: '-5%'
  },
  popularResultItem: {
    marginLeft: '5%'
  },
  popularText: {
    fontSize: 16,
    marginLeft: '5%'
  },
  brands: {
    flexDirection: 'row',
    marginVertical: '6%'
  }
})
