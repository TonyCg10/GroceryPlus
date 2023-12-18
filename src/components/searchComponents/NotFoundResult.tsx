import { View, Text, StyleSheet } from 'react-native'

// import NotFound from '../../assets/AddtoBag-rafiki.svg'

const NotFoundResult = () => {
  return (
    <View style={notFoundStyles.notFoundContainer}>
      {/* <NotFound width={1000} style={notFoundSVG} /> */}
      <Text style={notFoundStyles.notFoundText}>
        Opps! We can't find your product
      </Text>
      <Text style={notFoundStyles.notFoundText}>
        But you can add it to wishlist
      </Text>
    </View>
  )
}

export default NotFoundResult

const notFoundStyles = StyleSheet.create({
  notFoundContainer: {
    alignSelf: 'center',
  },
  notFoundSVG: {
    marginVertical: '25%',
  },
  notFoundText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
})
