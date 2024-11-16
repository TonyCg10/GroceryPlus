import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  RefreshControl
} from 'react-native'
import { basePagesStyle } from '../../styles/baseStyle'
import { ProductState, useProductStore } from '../../core/store/productStore.store'
import { UserState, useUserStore } from '../../core/store/userStore.store'
import { showMessage } from 'react-native-flash-message'
import { Product } from '../../core/database/GroceryData'

import Feather from 'react-native-vector-icons/Feather'
import Header from '../../share/utils/Header'
import ExpectedDateTime from './ExpectedDateTime'
import SelectLocation from './SelectLocation'
import ProductsSelected from './ProductsSelected'
import Payment from './Payment'
import NotFound from '../../../assets/AddtoBag-rafiki.svg'
import SheetModal from '../../share/utils/SheetModal'

const MyBag = ({ navigation }: any) => {
  const { fetchProductsData, productId, products, removeProductId, clearFn } = useProductStore(
    (state: ProductState) => state
  )

  const [quantity, setQuantity] = useState(0)
  const [productsID, setProductsID] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState(new Date())
  const [hour, setHour] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    fetchProductsData({
      _id: productId[0]
    }).then(() => {
      setIsLoading(false)
    })
  }, [productId])

  const handleOnPlaceOrder = async () => {
    //   try {
    //     if (productId.length !== 0 && date.toLocaleDateString() !== new Date().toLocaleDateString()) {
    //       const response = await axios.post(`${URL}/${ORDER}/create-orders`, {
    //         userId: user._id,
    //         products: productsID,
    //         issuedDate: date,
    //         hours: hour,
    //         status: 'ongoing'
    //       })
    //       if (response.status === 201) {
    //         showMessage({
    //           message: 'Order Added!',
    //           type: 'success',
    //           icon: 'success',
    //           hideStatusBar: true
    //         })
    //         console.log('Order Placed')
    //         setHour(null)
    //         clearFn()
    //       }
    //     } else {
    //       setModalVisible(true)
    //     }
    //   } catch (error) {
    //     console.log(error)
    //     setModalVisible(true)
    //   }
  }

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <SheetModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        content={
          date.toLocaleDateString() === new Date().toLocaleDateString()
            ? 'Select a date from tomorrow'
            : 'Select an horary'
        }
        redBtn={true}
        redContent="Hide"
        redAction={() => setModalVisible(false)}
      />
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll1}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={fetchProductsData} />
            }>
            <ProductsSelected
              product={products}
              removeProductId={removeProductId}
              setQuantitys={setQuantity}
              setProductsID={setProductsID}
            />
          </ScrollView>

          <View style={basePagesStyle.line} />

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll2}>
            <TouchableOpacity onPress={() => navigation.navigate('Searcher')} style={styles.addBtn}>
              <Text style={styles.addText}>Add More Product</Text>
            </TouchableOpacity>

            <ExpectedDateTime setDate={setDate} date={date} setHour={setHour} hourss={hour} />
            <SelectLocation />
            <Payment quantity={quantity} handleOnPlaceOrder={handleOnPlaceOrder} />
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
