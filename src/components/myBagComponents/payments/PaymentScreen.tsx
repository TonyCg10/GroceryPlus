import { usePaymentSheet } from '@stripe/stripe-react-native'
import { useEffect, useState } from 'react'
import { Alert, Button } from 'react-native'
import { IP, PORT, PAYMENT } from '../../../../express/utils'

import axios from 'axios'

type Props = {
  quantity: number
}

const PaymentScreen = ({ quantity }: Props) => {
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet()
  const [ready, setReady] = useState(false)

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams()

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: 'GroceryPlus, Inc.',
      allowsDelayedPaymentMethods: true,
      returnURL: 'groceryplus://',
      defaultBillingDetails: {
        name: 'Jane Doe'
      }
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
    const { paymentIntent, ephemeralKey, customer } = await response.data

    return {
      paymentIntent,
      ephemeralKey,
      customer
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

  return <Button disabled={!ready} title="Checkout" onPress={openPaymentSheet} />
}

export default PaymentScreen
