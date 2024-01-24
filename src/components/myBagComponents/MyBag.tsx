import { SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import { ProductState, useProductStore } from '../../../store/productStore.store'
import { useState } from 'react'
import { UserState, useUserStore } from '../../../store/userStore.store'
import { ip } from '../authComponents/utils/utils'
import { showMessage } from 'react-native-flash-message'

import Feather from 'react-native-vector-icons/Feather'
import Header from '../../share/utils/Header'
import ExpectedDateTime from './ExpectedDateTime'
import SelectLocation from './SelectLocation'
import ProductsSelected from './ProductsSelected'
import Payment from './Payment'
import AntDesign from 'react-native-vector-icons/AntDesign'
import NotFound from '../../../assets/AddtoBag-rafiki.svg'
import axios from 'axios'

const MyBag = ({ navigation }) => {
  const { productId, clearFn, removeProductId } = useProductStore((state: ProductState) => state)
  const { user, setUser } = useUserStore((state: UserState) => state)
  const [ids] = useState<number[]>([])

  const handleOnPlaceOrder = async () => {
    try {
      productId.forEach((p) => {
        ids.push(p)
      })

      const response = await axios.put(`http://${ip}:2020/update/${user._id}`, {
        productId: ids
      })

      if (response.status === 200) {
        if (productId.length !== 0) {
          setUser({ productId: ids })
          clearFn()
          showMessage({
            icon: 'success',
            message: 'Order Added!',
            type: 'success'
          })
          console.log('User updated successfully')
        }
      } else {
        throw new Error('Failed to update user')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="My Bag"
        actionRight={<Feather name="bell" size={20} />}
        navigation={navigation}
      />
      {productId.length == 0 ? (
        <View style={styles.notFoundSVG}>
          <NotFound />
          <Text style={styles.notText}>Still no products on your cart!</Text>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll1}>
            <ProductsSelected productId={productId} removeProductId={removeProductId} />
          </ScrollView>

          <View style={basePagesStyle.line} />

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll2}>
            <TouchableOpacity onPress={() => navigation.navigate('Searcher')} style={styles.addBtn}>
              <Text style={styles.addText}>Add More Product</Text>
            </TouchableOpacity>

            <ExpectedDateTime />
            <SelectLocation />
            <Payment productId={productId} />
            <TouchableOpacity onPress={() => handleOnPlaceOrder()} style={styles.order}>
              <Text style={styles.orderText}>Place Order</Text>
              <AntDesign color="white" size={20} name="arrowright" />
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  )
}

export default MyBag

const styles = StyleSheet.create({
  scroll1: {
    flex: 1
  },
  scroll2: {
    flex: 2,
    marginBottom: '20%'
  },
  addBtn: {
    marginVertical: '5%',
    backgroundColor: 'rgba(54, 179, 126, 0.14)',
    borderRadius: 10
  },
  addText: {
    fontWeight: 'bold',
    color: '#5EC401',
    alignSelf: 'center',
    padding: '3%'
  },
  order: {
    flexDirection: 'row',
    backgroundColor: '#5EC401',
    marginVertical: '5%',
    padding: '3%',
    borderRadius: 10
  },
  orderText: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: '40%'
  },
  notFoundSVG: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: '30%'
  },
  notText: {
    marginTop: '10%',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
