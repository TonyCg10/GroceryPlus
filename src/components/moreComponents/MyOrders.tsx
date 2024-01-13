import { View, Text, SafeAreaView, Button } from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import { UserState, useUserStore } from '../../../store/userStore.store'
import { useEffect, useState } from 'react'
import {
  ProductDatabaseStore,
  useProductDatabaseStore
} from '../../../store/database/productDatabase'

import Header from '../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'

const MyOrders = ({ navigation }) => {
  const { productsArray, fetchProducts } = useProductDatabaseStore(
    (state: ProductDatabaseStore) => state
  )
  const { user, setUser } = useUserStore((state: UserState) => state)

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
        <Button
          title="clear"
          onPress={() => {
            const ids = {
              productId: []
            }
            setUser(ids)
          }}
        />
        <View>
          {productsArray
            .filter((item) => user.productId.includes(item.id))
            .map((item) => {
              return (
                <View>
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
