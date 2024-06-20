import { View, SafeAreaView } from 'react-native'
import { basePagesStyle } from '../../../styles/baseStyle'
import { useEffect, useState } from 'react'
import { ORDER, URL } from '../../../../express/utils'
import { Product } from '../../../../store/database/GroceryData'
import { useUserStore, UserState } from '../../../../store/userStore.store'

import SegmentedControl from '@react-native-segmented-control/segmented-control'
import Header from '../../../share/utils/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ongoing from './Ongoing'
import axios from 'axios'

const MyOrders = ({ navigation }) => {
  const { user } = useUserStore((state: UserState) => state)

  const [products, setProducts] = useState<Product[]>()
  const [quantity, setQuantity] = useState<number[]>()
  const [orderId, setOrderId] = useState<number[]>()

  const fetchOrders = async () => {
    try {
      const ordersArray = await axios.get(`${URL}/${ORDER}/get-orders/${user._id}`)

      console.log('#####')
      console.log(ordersArray.data.data)
      console.log('#####')

      if (ordersArray.status) {
        const orderProducts = ordersArray.data.data.map((pr) =>
          pr.products.map((id) => id.productId)
        )

        const orderIds = ordersArray.data.data.map((pr) => pr._id)
        setQuantity(ordersArray.data.data.map((pr) => pr.products.map((id) => id.quantity)))
        setProducts(orderProducts)
        setOrderId(orderIds)
      }
    } catch (error) {
      if (products !== undefined) console.error('Error fetching orders:', error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const [indexTab, setIndexTab] = useState('Ongoing')

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Orders"
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        navigation={navigation}
      />
      <View style={{ flex: 1 }}>
        <SegmentedControl
          backgroundColor="#FFAF19"
          activeFontStyle={{ fontSize: 16 }}
          values={['Ongoing', 'History']}
          selectedIndex={0}
          onValueChange={(value) => setIndexTab(value)}
        />

        {indexTab == 'Ongoing' ? (
          <Ongoing
            fetchOrders={fetchOrders}
            products={products}
            quantity={quantity?.flat()}
            orderId={orderId}
          />
        ) : (
          <View></View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default MyOrders
