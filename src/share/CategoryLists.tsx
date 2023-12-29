import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { ProductState, useProductStore } from '../../store/productStore.store'
import { basePagesStyle } from '../indexStyle/baseStyle'

import Header from './utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useEffect } from 'react'
import {
  ProductDatabaseStore,
  useProductDatabaseStore,
} from '../../store/database/productDatabase'

const CategoryLists = ({ navigation, route }) => {
  const { setProductId } = useProductStore((state: ProductState) => state)

  const { category } = route.params
  const { productsArray } = useProductDatabaseStore(
    (state: ProductDatabaseStore) => state,
  )

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
                  <Image
                    source={{ uri: data.thumbnail }}
                    style={baseGridsStyle.image}
                  />
                  <Text style={baseGridsStyle.text}>{data.title}</Text>
                  <Text style={baseGridsStyle.price}>
                    ${finalPrice.toFixed(2)}
                  </Text>
                  <TouchableOpacity
                    style={baseGridsStyle.pressable}
                    onPress={() => setProductId([data.id])}
                  >
                    <View style={baseGridsStyle.pressableView}>
                      <Feather
                        style={baseGridsStyle.pressableIcon}
                        color={'white'}
                        size={20}
                        name="shopping-bag"
                      />
                      <Text style={baseGridsStyle.pressableText}>
                        Add to Bag
                      </Text>
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
    justifyContent: 'center',
  },
  pressableIcon: {
    alignSelf: 'center',
    marginRight: '5%',
  },
  pressableText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pressable: {
    backgroundColor: '#5EC401',
    padding: '3%',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginTop: '5%',
  },
  gridsScreen: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: '-2%',
  },
  gridsContainer: {
    flex: 1,
    marginVertical: '8%',
    marginHorizontal: '2%',
    minWidth: 120,
    borderRadius: 10,
  },
  image: {
    alignSelf: 'center',
    width: 180,
    height: 180,
    borderRadius: 10,
  },
  text: {
    marginTop: '5%',
    minHeight: 60,
  },
  price: {
    color: '#5EC401',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
