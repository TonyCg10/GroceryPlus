import { usePaymentSheet } from '@stripe/stripe-react-native'
import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { IP, PORT, PAYMENT } from '../../../../express/utils'

import axios from 'axios'
import AntDesign from 'react-native-vector-icons/AntDesign'

type Props = {
  quantity: number
}

const PaymentScreen = ({ quantity }: Props) => {
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet()
  const [ready, setReady] = useState(false)

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, setupIntent } = await fetchPaymentSheetParams()

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      setupIntentClientSecret: setupIntent,
      merchantDisplayName: 'GroceryPlus, Inc.',
      allowsDelayedPaymentMethods: true,
      returnURL: 'com.tony54.GroceryPlus://'
    })

    if (error) {
      console.error(`Error: ${error.code} ${error.message}`)
    } else {
      setReady(true)
    }
  }

  const fetchPaymentSheetParams = async () => {
    const response = await axios.post(`http://${IP}:${PORT}/${PAYMENT}/`, {
      amount: quantity + 10 * 100
    })
    const { paymentIntent, ephemeralKey, customer, setupIntent } = await response.data

    return {
      paymentIntent,
      ephemeralKey,
      customer,
      setupIntent
    }
  }

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet()

    if (error) {
      console.error(`Error: ${error.code} ${error.message}`)
    } else {
      setReady(true)
    }
  }

  useEffect(() => {
    initializePaymentSheet()
  }, [ready])

  return (
    <TouchableOpacity
      disabled={!ready || loading}
      onPress={openPaymentSheet}
      style={ready ? styles.order : styles.noOrder}>
      <Text style={styles.orderText}>Place Order</Text>
      <AntDesign color="white" size={20} name="arrowright" />
    </TouchableOpacity>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  order: {
    flexDirection: 'row',
    backgroundColor: '#5EC401',
    marginVertical: '5%',
    padding: '3%',
    borderRadius: 10
  },
  noOrder: {
    flexDirection: 'row',
    backgroundColor: '#F37A20',
    marginVertical: '5%',
    padding: '3%',
    borderRadius: 10
  },
  orderText: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: '40%'
  }
})
