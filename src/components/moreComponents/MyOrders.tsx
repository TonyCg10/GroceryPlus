import { View, Text, SafeAreaView } from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import { UserState, useUserStore } from '../../../store/userStore.store'
import { useEffect, useState } from 'react'
import {
  ProductDatabaseStore,
  useProductDatabaseStore
} from '../../../store/database/productDatabase'

import SegmentedControl from '@react-native-segmented-control/segmented-control'
import Header from '../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'

const MyOrders = ({ navigation }) => {
  const { productsArray, fetchProducts } = useProductDatabaseStore(
    (state: ProductDatabaseStore) => state
  )
  const { user, setUser } = useUserStore((state: UserState) => state)

  const [indexTab, setIndexTab] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Orders"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <View>
        <SegmentedControl
          values={['Ongoing', 'History']}
          onValueChange={(value) => setIndexTab(value)}
        />

        <View>
          {productsArray
            .filter((item) => user.productId.includes(item.id))
            .map((item, key) => {
              return (
                <View key={key}>
                  <Text>{item.brand}</Text>
                </View>
              )
            })}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MyOrders
