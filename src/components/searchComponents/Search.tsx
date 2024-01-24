import { SafeAreaView, View, Text, Modal, TouchableOpacity } from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  ProductDatabaseStore,
  useProductDatabaseStore
} from '../../../store/database/productDatabase'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Header from '../../share/utils/Header'
import PopularResults from './PopularResults'
import Results from './Results'
import NotFoundResult from './NotFoundResult'

const Search = ({ navigation }) => {
  const { productsArray } = useProductDatabaseStore((state: ProductDatabaseStore) => state)

  const [look, setLook] = useState('')
  const [rate, setRate] = useState(0)

  const filteredData = productsArray.filter((item) => {
    const matches =
      item.title.toLowerCase().includes(look.toLowerCase()) ||
      item.brand.toLowerCase().includes(look.toLowerCase())

    return matches
  })

  const [modalVisible, setModalVisible] = useState(false)
  const filterModal = (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Rating</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setModalVisible(!modalVisible)
              setRate(5)
            }}>
            <Text style={styles.textStyle}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setModalVisible(!modalVisible)
              setRate(4)
            }}>
            <Text style={styles.textStyle}>4</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      {filterModal}
      <Header
        navigation={navigation}
        actionLeft={<AntDesign size={22} name="arrowleft" />}
        searcher={true}
        setLook={setLook}
      />
      {look == '' ? (
        <View style={searchPageStyles.headerContainer}>
          <Text style={searchPageStyles.headerText}>Popular Searches</Text>
          <PopularResults productData={productsArray} navigation={navigation} />
        </View>
      ) : (
        <View>
          {filteredData.length == 0 ? (
            <NotFoundResult />
          ) : (
            <View style={searchPageStyles.headerContainer}>
              <View style={searchPageStyles.resultContainer}>
                <Text style={searchPageStyles.headerText}>Search Result</Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible)
                  }}>
                  <Ionicons name="filter-outline" size={24} />
                </TouchableOpacity>
              </View>
              <Results
                navigation={navigation}
                look={look}
                productData={productsArray}
                rate={rate}
              />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  )
}

export default Search

const searchPageStyles = StyleSheet.create({
  headerText: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: '5%'
  },
  headerContainer: {
    marginVertical: '5%'
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    marginVertical: '3%'
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})
