import { View, Image, Text, Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
import { useGroceryData } from './utils/GroceryData'

type Pops = {
  display: boolean
  navigation: any
}

const Grids = ({ display, navigation }: Pops) => {
  const { groceryData } = useGroceryData()

  const uniqueCategories = [
    ...new Set(groceryData.map((item) => item.category.toLowerCase().trim())),
  ]

  return display ? (
    <View style={baseGridsStyle.gridsScreen}>
      {groceryData.map((data, key) => {
        return (
          <Pressable
            key={key}
            onPress={() => {
              navigation.navigate('ProductDetails', {
                id: data.id,
                description: data.description,
                images: data.images,
                title: data.title,
                price: data.price,
                rating: data.rating,
                stock: data.stock,
                discountPercentage: data.discountPercentage,
                thumbnail: data.thumbnail,
                category: data.category,
              })
            }}
            style={baseGridsStyle.gridsContainer}
          >
            <Image
              source={{
                uri: data.thumbnail,
              }}
              style={baseGridsStyle.image}
            />

            <Text style={baseGridsStyle.text}>{data.brand}</Text>
          </Pressable>
        )
      })}
    </View>
  ) : (
    <View style={baseGridsStyle.gridsScreen}>
      {uniqueCategories.map((category, categoryIndex) => {
        const representativeItem = groceryData.find(
          (data) => data.category.toLowerCase().trim() === category,
        )

        return (
          <Pressable
            key={categoryIndex}
            onPress={() => {
              navigation.navigate('CategoryLists', {
                category: representativeItem.category.toUpperCase(),
              })
            }}
            style={baseGridsStyle.gridsContainer}
          >
            <Image
              source={{
                uri: representativeItem.thumbnail,
              }}
              style={baseGridsStyle.image}
            />
            <Text style={baseGridsStyle.text}>
              {representativeItem.category}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export default Grids

const baseGridsStyle = StyleSheet.create({
  gridsScreen: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: '-2%',
  },
  gridsContainer: {
    backgroundColor: 'white',
    shadowColor: 'black',
    elevation: 4,
    flex: 1,
    marginVertical: '2%',
    marginHorizontal: '2%',
    height: 160,
    minWidth: 140,
    borderRadius: 10,
  },
  image: {
    alignSelf: 'center',
    flex: 1,
    width: 120,
    maxHeight: 130,
    borderRadius: 10,
    marginTop: 15,
  },
  text: {
    textAlign: 'center',
    marginTop: '5%',
  },
})
