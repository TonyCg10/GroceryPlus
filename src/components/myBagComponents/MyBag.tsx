import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import {
  ProductState,
  useProductStore,
} from '../../../store/productStore.store'

import Feather from 'react-native-vector-icons/Feather'
import Header from '../../share/utils/Header'
import ExpectedDateTime from './ExpectedDateTime'
import SelectLocation from './SelectLocation'
import ProductsSelected from './ProductsSelected'
import Payment from './Payment'
import AntDesign from 'react-native-vector-icons/AntDesign'
import NotFound from '../../../assets/AddtoBag-rafiki.svg'

const MyBag = ({ navigation }) => {
  const { productId } = useProductStore((state: ProductState) => state)

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
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll1}
          >
            <ProductsSelected />
          </ScrollView>

          <View style={basePagesStyle.line} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll2}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('Searcher')}
              style={styles.addBtn}
            >
              <Text style={styles.addText}>Add More Product</Text>
            </TouchableOpacity>

            <ExpectedDateTime />
            <SelectLocation />
            <Payment />
            <TouchableOpacity style={styles.order}>
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
    flex: 1,
  },
  scroll2: {
    flex: 2,
    marginBottom: '20%',
  },
  addBtn: {
    marginVertical: '5%',
    backgroundColor: 'rgba(54, 179, 126, 0.14)',
    borderRadius: 10,
  },
  addText: {
    fontWeight: 'bold',
    color: '#5EC401',
    alignSelf: 'center',
    padding: '3%',
  },
  order: {
    flexDirection: 'row',
    backgroundColor: '#5EC401',
    marginVertical: '5%',
    padding: '3%',
    borderRadius: 10,
  },
  orderText: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: '40%',
  },
  notFoundSVG: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: '30%',
  },
  notText: {
    marginTop: '10%',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
