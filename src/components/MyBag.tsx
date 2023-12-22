import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native'
import { basePagesStyle } from '../indexStyle/baseStyle'
import { ProductState, useProductStore } from '../../store/productStore.store'
import { useGroceryData } from '../share/utils/GroceryData'

import Feather from 'react-native-vector-icons/Feather'
import Header from '../share/utils/Header'

const MyBag = ({ navigation }) => {
  const { productId, removeProductId } = useProductStore(
    (state: ProductState) => state,
  )
  const { groceryData } = useGroceryData()

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="My Bag"
        actionRight={<Feather name="bell" size={20} />}
        navigation={navigation}
      />
      <View>
        {groceryData
          .filter((item) => productId.includes(item.id))
          .map((data, key) => {
            return (
              <View key={key}>
                <Image
                  source={{ uri: data.thumbnail }}
                  style={{ height: 100, width: 100 }}
                />
                <Text>{data.title}</Text>
                <TouchableOpacity onPress={() => removeProductId(data.id)}>
                  <Text>Remove</Text>
                </TouchableOpacity>
              </View>
            )
          })}
      </View>
    </SafeAreaView>
  )
}

export default MyBag
