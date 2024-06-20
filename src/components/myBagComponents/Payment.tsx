import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'

import PaymentScreen from './payments/PaymentScreen'

type Props = {
  quantity: number

  handleOnPlaceOrder: () => Promise<void>
}

const Payment = ({ quantity, handleOnPlaceOrder }: Props) => {
  return (
    <View style={styles.container}>
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
        {/* <Text style={styles.method}>Payment Method</Text> */}
        {/* <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setModalVisible(true)
          }}>
          <View style={styles.signCon}>
            <FontAwesome style={styles.sign} color="white" size={20} name="dollar" />
          </View>
          <Text style={styles.text}>Tap Here to select your Payment Method</Text>
          <AntDesign name="right" size={20} style={styles.right} />
        </TouchableOpacity> */}
        <PaymentScreen quantity={quantity} handleOnPlaceOrder={handleOnPlaceOrder} />
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
