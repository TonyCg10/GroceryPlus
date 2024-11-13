import { usePaymentSheet } from '@stripe/stripe-react-native'
import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { PAYMENT, URL } from '../../../../express/utils'
import { UserState, useUserStore } from '../../../../core/store/userStore.store'

import axios from 'axios'
import AntDesign from 'react-native-vector-icons/AntDesign'

type Props = {
  quantity: number

  handleOnPlaceOrder: () => Promise<void>
}

const PaymentScreen = ({ quantity, handleOnPlaceOrder }: Props) => {
  const { user } = useUserStore((state: UserState) => state)

  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet()
  const [ready, setReady] = useState(false)

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet()

    if (!error) {
      setReady(true)
      try {
        const response = await axios.post(`${URL}/${PAYMENT}/create-payments-intents`, {
          amount: quantity * 100,
          email: user.email
        })

        const { paymentIntent, ephemeralKey, customer } = await response.data

        if (response.status === 200) {
          await handleOnPlaceOrder()
        }

        return {
          paymentIntent,
          ephemeralKey,
          customer
        }
      } catch (error) {
        console.error('Error creating payment:', error)
      }
    }
  }

  const fetchSetupIntents = async () => {
    const response = await axios.post(`${URL}/${PAYMENT}/set-up-intents`, {
      email: user.email
    })

    const { setupIntents } = await response.data

    return {
      setupIntents
    }
  }

  useEffect(() => {
    const initializePaymentSheet = async () => {
      const { setupIntents } = await fetchSetupIntents()
      const { paymentIntent, ephemeralKey, customer } = await openPaymentSheet()

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerEphemeralKeySecret: ephemeralKey,
        customerId: customer,
        merchantDisplayName: 'GroceryPlus, Inc',
        setupIntentClientSecret: setupIntents,
        returnURL: 'com.tony54.GroceryPlus://MyBag',
        appearance: {
          font: {
            scale: 1.1
          },
          shapes: {
            borderRadius: 10,
            borderWidth: 4,
            shadow: {
              opacity: 0
            }
          },
          colors: {
            light: {
              componentBackground: '#F5F5F5',
              secondaryText: '#000000',
              componentDivider: '#ffffff',
              componentBorder: '#ffffff'
            },
            dark: {
              componentBackground: '#050505',
              secondaryText: '#ffffff',
              componentDivider: '#000000',
              componentBorder: '#000000'
            }
          },
          primaryButton: {
            colors: {
              light: {
                background: '#009C53'
              },
              dark: {
                background: '#009C53'
              }
            }
          }
        }
      })

      if (!error) {
        setReady(true)
      } else {
        console.error(error)
      }
    }

    initializePaymentSheet()
  }, [])

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
    marginTop: '15%',
    padding: '3%',
    borderRadius: 10
  },
  noOrder: {
    flexDirection: 'row',
    backgroundColor: '#F37A20',
    marginVertical: '5%',
    marginTop: '15%',
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
