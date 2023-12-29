import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import { useEffect } from 'react'
import {
  UserDatabaseStore,
  useUserDatabaseStore,
} from '../../../store/database/userDatabase'
import {
  useProductDatabaseStore,
  ProductDatabaseStore,
} from '../../../store/database/productDatabase'
import { useGroceryData } from '../../../store/database/GroceryData'

import GroceryPlus from '../../../assets/GroceryPlus.svg'

const Landing = ({ navigation }) => {
  const { initializeUserDB, deleteUsersTable } = useUserDatabaseStore(
    (state: UserDatabaseStore) => state,
  )

  const { initializeProductDB, deleteProductTable } = useProductDatabaseStore(
    (state: ProductDatabaseStore) => state,
  )

  const { fetched } = useGroceryData()

  useEffect(() => {
    initializeProductDB()
    initializeUserDB()
  }, [initializeUserDB, initializeProductDB])

  useEffect(() => {
    fetched()
  }, [])

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <View style={landingStyles.container}>
        <View style={landingStyles.icon}>
          <GroceryPlus width={260} height={260} />
        </View>
        <View style={landingStyles.options}>
          <TouchableOpacity
            style={landingStyles.login}
            onPress={() => navigation.navigate('LoginPage')}
          >
            <Text style={landingStyles.text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={landingStyles.signUp}
            onPress={() => {
              // deleteUsersTable()
              // deleteProductTable()
              navigation.navigate('SignUpPage')
            }}
          >
            <Text style={landingStyles.text}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Landing

const landingStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    flex: 1,
  },
  options: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  login: {
    padding: '4%',
    minWidth: '65%',
    backgroundColor: '#00C896',
    marginVertical: '3%',
    borderRadius: 10,
  },
  signUp: {
    padding: '4%',
    minWidth: '65%',
    backgroundColor: '#5EC401',
    marginVertical: '3%',
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
})
