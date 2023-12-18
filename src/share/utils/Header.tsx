import {
  TouchableOpacity,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native'
import { basePagesStyle } from '../../indexStyle/baseStyle'
import Feather from 'react-native-vector-icons/Feather'
import { useState } from 'react'

type Props = {
  title?: string
  actionRight?: any
  actionLeft?: any
  searcher?: boolean
  setLook?: (text: string) => void
  navigation?: any
}

const Header = ({
  title,
  actionRight,
  actionLeft,
  searcher,
  setLook,
  navigation,
}: Props) => {
  const [text, setText] = useState('')

  return (
    <View style={basePagesStyle.header}>
      <Pressable
        style={actionLeft && basePagesStyle.icon}
        onPress={() => {
          navigation.goBack()
        }}
      >
        {actionLeft}
      </Pressable>
      <View>
        {!!searcher && (
          <View style={headerStyle.searcherContainer}>
            <Feather style={headerStyle.searcherIcon} size={22} name="search" />
            <View>
              <Text style={headerStyle.searchText}>Search</Text>
              <TextInput
                placeholder="Search something"
                value={text}
                onChangeText={(text) => {
                  setText(text)
                  setLook && setLook(text)
                }}
                autoFocus
              />
            </View>
          </View>
        )}
      </View>
      <Text style={basePagesStyle.headerText}>{title}</Text>
      <TouchableOpacity
        style={basePagesStyle.notiIcon}
        onPress={() => {
          navigation.navigate('Notifications')
        }}
      >
        {actionRight}
      </TouchableOpacity>
    </View>
  )
}

export default Header

const headerStyle = StyleSheet.create({
  searcherContainer: {
    backgroundColor: '#D8D8D8',
    flexDirection: 'row',
    padding: '1%',
    minWidth: '90%',
    borderRadius: 10,
  },
  searchText: {
    color: '#5EC401',
    fontSize: 12,
  },
  searcherIcon: {
    alignSelf: 'center',
    marginHorizontal: '4%',
  },
})
