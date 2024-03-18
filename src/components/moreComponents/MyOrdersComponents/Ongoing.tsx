import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import { useEffect, useState } from 'react'
import { ORDER, URL } from '../../../../express/utils'

import Empty from '../../../../assets/Empty-rafiki.svg'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import SheetModal from '../../../share/utils/SheetModal'

type Props = {
  products: any[]
  quantity: number[]
  orderId: number[]
  fetchOrders: () => Promise<void>
}

const Ongoing = ({ products, quantity, orderId, fetchOrders }: Props) => {
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalsVisible, setModalsVisible] = useState(0)

  const fetchOrder = () => {
    setLoading(true)
    setTimeout(async () => {
      await fetchOrders()
      setLoading(false)
    })
  }

  const handleRemoveOrder = async (id) => {
    try {
      await axios.delete(`${URL}/${ORDER}/delete-order/${id}`)
      fetchOrder()
      setModalVisible(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleOnRemoveProductOrder = async (id, itemId) => {
    try {
      await axios.delete(`${URL}/${ORDER}/delete-roduct-order/${id}/${itemId}`)
      fetchOrder()
      setModalVisible(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginTop: '5%' }}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchOrder} />}>
      {products !== undefined && products.length !== 0 ? (
        products.map((items, keys) => {
          return (
            <View
              key={keys}
              style={{
                backgroundColor: 'white',
                marginTop: '5%',
                borderRadius: 20,

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5
                },
                shadowOpacity: 0.2
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true), setModalsVisible(1)
                }}
                style={{
                  justifyContent: 'flex-end',
                  margin: '4%',
                  flexDirection: 'row',
                  marginBottom: '-2%'
                }}>
                <MaterialIcons name="cancel-schedule-send" color={'#f66'} size={20} />
              </TouchableOpacity>
              <View>
                {items
                  .map((item, key) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          padding: '5%'
                        }}>
                        <SheetModal
                          modalVisible={modalVisible}
                          setModalVisible={setModalVisible}
                          content={
                            modalsVisible === 1
                              ? 'Are you sure to close order?'
                              : 'Are you sure to delete this product'
                          }
                          redBtn={true}
                          greenBtn={true}
                          redContent={modalsVisible === 1 ? 'Cancel Order' : 'Delete Product'}
                          greenContent="Back"
                          redAction={() =>
                            modalsVisible === 1
                              ? handleRemoveOrder(orderId[keys])
                              : handleOnRemoveProductOrder(orderId[keys], item._id)
                          }
                          greenAction={() => setModalVisible(false)}
                        />
                        <View key={key}>
                          <TouchableOpacity
                            onPress={() => {
                              setModalVisible(true), setModalsVisible(2)
                            }}>
                            <MaterialIcons name="cancel" color={'#f66'} size={20} />
                          </TouchableOpacity>
                          <View
                            style={{
                              marginVertical: '5%',
                              borderRadius: 20,
                              overflow: 'hidden'
                            }}>
                            <Image source={{ uri: item.thumbnail }} width={75} height={75} />
                          </View>
                        </View>
                        <View
                          style={{
                            justifyContent: 'space-evenly',
                            flex: 0.8
                          }}>
                          <Text>Item: {item.title.toUpperCase()}</Text>
                          <Text>Quantity: {quantity[key]}</Text>
                        </View>
                      </View>
                    )
                  })
                  .slice(0, open ? items.length : 2)}
                {items.length > 2 && (
                  <TouchableOpacity
                    onPress={() => setOpen(!open)}
                    style={{
                      backgroundColor: !open ? '#5EC401' : '#FFAF19',
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                      flexDirection: 'row',
                      justifyContent: 'center'
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '2%',
                        fontSize: 16,
                        paddingRight: '5%'
                      }}>
                      {open ? 'Hide' : 'Open'}
                    </Text>
                    <SimpleLineIcons
                      color={'white'}
                      style={{ alignSelf: 'center' }}
                      name={open ? 'arrow-up' : 'arrow-down'}
                      size={16}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )
        })
      ) : (
        <Empty />
      )}
    </ScrollView>
  )
}

export default Ongoing
