import { View, Text, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'

import Modal from 'react-native-modal'
import StarRating from 'react-native-star-rating-widget'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type Props = {
  modalVisible: boolean
  setModalVisible: (value: boolean) => void
  content: string
  box?: any
  rate?: boolean
  rating?: number
  setRating?: (value: number) => void
  greenAction?: (value?: any) => any
  greenBtn?: boolean
  greenContent?: string
  redAction?: (value?: any) => any
  redBtn?: boolean
  redContent?: string
}

const SheetModal = ({
  modalVisible,
  setModalVisible,
  rate,
  rating,
  setRating,
  content,
  box,
  greenAction,
  greenBtn,
  greenContent,
  redAction,
  redBtn,
  redContent
}: Props) => {
  return (
    <Modal
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDownBig'}
      backdropOpacity={0.15}
      isVisible={modalVisible}
      onBackdropPress={() => {
        setModalVisible(false)
      }}>
      <View
        style={{
          backgroundColor: 'white',
          padding: '10%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10
        }}>
        <Text style={stylesBtn.content}>{content}</Text>
        {box}
        {rate && (
          <View>
            <StarRating rating={rating} onChange={setRating} />
          </View>
        )}
        {greenBtn && (
          <TouchableOpacity style={stylesBtn.edit} onPress={greenAction}>
            <AntDesign size={22} color="white" name="checkcircle" />
            <Text style={stylesBtn.text}>{greenContent}</Text>
          </TouchableOpacity>
        )}
        {redBtn && (
          <TouchableOpacity style={stylesBtn.delete} onPress={redAction}>
            <MaterialIcons size={22} color="white" name="cancel" />
            <Text style={stylesBtn.text}>{redContent}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  )
}

const stylesBtn = StyleSheet.create({
  content: {
    marginVertical: '10%',
    fontSize: 20,
    fontWeight: '600'
  },
  box: {},
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    width: '90%'
  },
  edit: {
    backgroundColor: '#5EC401',
    padding: 10,
    borderRadius: 10,
    marginVertical: '2%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  delete: {
    backgroundColor: '#f66',
    padding: 10,
    borderRadius: 10,
    marginVertical: '2%',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default SheetModal
