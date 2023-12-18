import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import { DataType } from '../../share/utils/GroceryData'

import Feather from 'react-native-vector-icons/Feather'

type Prop = {
  groceryData: DataType[]
  navigation: any
}

const PopularResults = ({ groceryData, navigation }: Prop) => {
  return (
    <ScrollView style={popularResultStyles.popularResultContainer}>
      <View style={popularResultStyles.popularResultItem}>
        {groceryData
          .map((data, key) => {
            return (
              <TouchableOpacity
                onPress={() =>
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
                }
                key={key}
              >
                <View style={popularResultStyles.brands}>
                  <Feather size={18} name="search" />
                  <Text style={popularResultStyles.popularText}>
                    {data.title}
                  </Text>
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
    marginHorizontal: '-5%',
  },
  popularResultItem: {
    marginLeft: '5%',
  },
  popularText: {
    fontSize: 16,
    marginLeft: '5%',
  },
  brands: {
    flexDirection: 'row',
    marginVertical: '6%',
  },
})
