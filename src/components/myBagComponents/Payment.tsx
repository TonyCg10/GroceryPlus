import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { CardField, useStripe } from '@stripe/stripe-react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SheetModal from '../../share/utils/SheetModal'
import InputUser from '../../share/utils/InputUser'
import PaymentScreen from './payments/PaymentScreen'

type Props = {
  quantity: number
}

const Payment = ({ quantity }: Props) => {
  const { createPaymentMethod } = useStripe()

  const [modalVisible, setModalVisible] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  })

  const handleAddPaymentMethod = async () => {
    // try {
    //   const paymentMethod = await createPaymentMethod({
    //     paymentMethodType: 'Card',
    //     card: {
    //       number: cardDetails.number,
    //       expMonth: cardDetails.expMonth,
    //       expYear: cardDetails.expYear,
    //       cvc: cardDetails.cvc
    //     }
    //   })
    //   console.log('paymentMethod ====================================')
    //   console.log(paymentMethod)
    //   console.log('====================================')
    //   Alert.alert('Success', 'Payment method added successfully')
    // } catch (error) {
    //   console.error(error)
    //   Alert.alert('Error', 'Failed to add payment method. Please try again.')
    // }
  }

  // useEffect(() => {
  //   const fetchPaymentMethods = async () => {
  //     try {
  //       const { paymentMethods } = await listPaymentMethods();
  //       setPaymentMethods(paymentMethods);
  //     } catch (error) {
  //       console.error('Error al obtener métodos de pago:', error);
  //     }
  //   };

  //   fetchPaymentMethods();
  // }, []);

  return (
    <View style={styles.container}>
      <SheetModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        content={'Select or add payment method'}
        greenBtn={true}
        greenContent="Add payment method"
        greenAction={() => {
          setModalVisible(false), handleAddPaymentMethod()
        }}
      />
      <View style={styles.totals}>
        <Text>Subtotal</Text>
        <Text>$ {quantity}</Text>
      </View>
      <View style={styles.totals}>
        <Text>Delivery Charge</Text>
        <Text>$ 10</Text>
      </View>
      <View style={styles.totals}>
        <Text>Total</Text>
        <Text>$ {quantity + 10}</Text>
      </View>
      <View>
        <Text style={styles.method}>Payment Method</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setModalVisible(true)
          }}>
          <View style={styles.signCon}>
            <FontAwesome style={styles.sign} color="white" size={20} name="dollar" />
          </View>
          <Text style={styles.text}>Tap Here to select your Payment Method</Text>
          <AntDesign name="right" size={20} style={styles.right} />
        </TouchableOpacity>
        <PaymentScreen quantity={quantity} />
      </View>
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({
  container: {
    marginVertical: '6%'
  },
  totals: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '2%'
  },
  method: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: '5%',
    marginBottom: '3%'
  },
  btn: {
    flexDirection: 'row',
    backgroundColor: 'rgba(54, 179, 126, 0.14)',
    padding: '3%',
    borderRadius: 10
  },
  signCon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5EC401',
    alignSelf: 'center'
  },
  sign: {
    alignSelf: 'center',
    marginTop: '25%'
  },
  text: {
    margin: '3%',
    width: '60%'
  },
  right: {
    flex: 1,
    alignSelf: 'center',
    marginLeft: '10%'
  }
})
