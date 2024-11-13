import { SafeAreaView, ScrollView } from 'react-native'
import { basePagesStyle } from '../styles/baseStyle'
import { useAppNavigation } from '../utils/useAppNavigation'

import Feather from 'react-native-vector-icons/Feather'
import Header from '../share/utils/Header'
import Grids from '../share/Grids'
import React from 'react'

const Category = () => {
  const navigation = useAppNavigation()

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Category"
        actionRight={<Feather name="bell" size={20} />}
        navigation={navigation}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={basePagesStyle.gridsScroll}>
        <Grids display={false} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Category
