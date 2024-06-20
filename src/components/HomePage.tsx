import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { basePagesStyle } from '../styles/baseStyle'
import { useFocusEffect } from '@react-navigation/native'

import Header from '../share/utils/Header'
import Grids from '../share/Grids'
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import React from 'react'

const HomePage = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (navigation.isFocused()) {
          return true
        }
        return false
      }

      navigation.addListener('beforeRemove', (e) => {
        if (e.data.action.type === 'GO_BACK' && onBackPress()) {
          e.preventDefault()
        }
      })

      return () => {
        navigation.removeListener('beforeRemove', (): void => {})
      }
    }, [navigation])
  )

  return (
    <SafeAreaView style={basePagesStyle.containerPage}>
      <Header
        title="Grocery Plus"
        actionRight={<Feather name="bell" size={20} />}
        navigation={navigation}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('MoreStack', { screen: 'MyAddress' })}
        style={styles.locationView}>
        <View style={styles.locationLeft}>
          <View style={styles.locationIconBack}>
            <EvilIcons color="white" size={28} name="location" style={styles.locationIcon} />
          </View>

          <View>
            <Text>Your Location</Text>
            <Text style={styles.locationAddress}>79 Agramonte, Holguin</Text>
          </View>
        </View>

        <Feather size={30} name="chevron-right" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.searcher}
        onPress={() => {
          navigation.navigate('Searcher')
        }}>
        <Feather style={styles.searcherIcon} size={24} name="search" />
        <Text style={styles.searcherText}>Search Anything</Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} style={basePagesStyle.gridsScroll}>
        <Grids display={true} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage

const styles = StyleSheet.create({
  locationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%'
  },
  locationLeft: {
    flexDirection: 'row'
  },
  locationIconBack: {
    backgroundColor: '#87DD39',
    alignSelf: 'center',
    borderRadius: 100,
    height: 40,
    width: 40,
    marginRight: '4%'
  },
  locationIcon: {
    alignSelf: 'center',
    marginTop: 5
  },
  locationAddress: {
    fontWeight: '500',
    fontSize: 16
  },
  searcher: {
    backgroundColor: '#dedad9',
    marginBottom: '4%',
    height: '6%',
    flexDirection: 'row',
    borderRadius: 10
  },
  searcherIcon: {
    alignSelf: 'center',
    marginHorizontal: '4%'
  },
  searcherText: {
    color: '#37474F',
    alignSelf: 'center',
    fontWeight: '500'
  }
})
