import { TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native'
import { basePagesStyle } from '../../styles/baseStyle'
import React, { useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList, routes } from '../../utils/useAppNavigation'

import Feather from 'react-native-vector-icons/Feather'

type Props = {
  title?: string
  actionRight?: React.ReactNode
  actionLeft?: React.ReactNode
  searcher?: boolean
  setLook?: (text: string) => void
  navigation?: StackNavigationProp<RootStackParamList> | undefined
}

const Header = ({ title, actionRight, actionLeft, searcher, setLook, navigation }: Props) => {
  const [text, setText] = useState('')

  return (
    <View style={basePagesStyle.header}>
      {actionLeft && (
        <TouchableOpacity
          style={basePagesStyle.icon}
          onPress={() => {
            if (navigation) {
              navigation.goBack()
            }
          }}>
          {actionLeft}
        </TouchableOpacity>
      )}
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
      {actionRight && (
        <TouchableOpacity
          style={basePagesStyle.notiIcon}
          onPress={() => {
            if (navigation) {
              navigation.navigate(routes.Notifications)
            }
          }}>
          {actionRight}
        </TouchableOpacity>
      )}
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
    borderRadius: 10
  },
  searchText: {
    color: '#5EC401',
    fontSize: 12
  },
  searcherIcon: {
    alignSelf: 'center',
    marginHorizontal: '4%'
  }
})
