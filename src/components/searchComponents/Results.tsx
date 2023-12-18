import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native'
import { DataType } from '../../share/utils/GroceryData'
import { basePagesStyle } from '../../indexStyle/baseStyle'

import Feather from 'react-native-vector-icons/Feather'

type Prop = {
  look: string
  groceryData: DataType[]
  navigation: any
  rate: number
}

const Results = ({ navigation, look, groceryData, rate }: Prop) => {
  return (
    <>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={resultSyles.scrollVertical}
        >
          {groceryData
            .map((data, key) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetails', {
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
                  }
                  key={key}
                >
                  <Text style={resultSyles.scrollVerticalText}>
                    {data.title}
                  </Text>
                </TouchableOpacity>
              )
            })
            .slice(0, Math.random() * 10 + 8)}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={resultSyles.scrollHorizontal}
      >
        {groceryData
          .filter(
            (item) =>
              item.title.toLowerCase().trim().includes(look.toLowerCase()) ||
              (item.brand.toLowerCase().trim().includes(look.toLowerCase()) &&
                Math.floor(item.rating) == rate),
          )
          .map((data, key) => {
            return (
              <View key={key} style={resultSyles.container}>
                <Pressable
                  key={data.id}
                  onPress={() => {
                    navigation.navigate('ProductDetails', {
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
                >
                  <View style={resultSyles.contentContainer}>
                    <Image
                      source={{
                        uri: data.thumbnail,
                      }}
                      style={resultSyles.image}
                    />
                    <View style={resultSyles.info}>
                      <Text style={resultSyles.description}>
                        {data.description}
                      </Text>
                      <View style={resultSyles.textContainer}>
                        <View>
                          <Text style={resultSyles.price}>${data.price}</Text>
                          <Text style={resultSyles.discountPercentage}>
                            off ${data.discountPercentage}
                          </Text>
                        </View>

                        <View style={resultSyles.buttonContainer}>
                          <Pressable style={resultSyles.pressable}>
                            <View style={resultSyles.insideButton}>
                              <Feather
                                color={'white'}
                                size={20}
                                name="shopping-bag"
                                style={resultSyles.icon}
                              />
                              <Text style={resultSyles.add}>Add</Text>
                            </View>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </View>
                </Pressable>
                <View style={basePagesStyle.line} />
              </View>
            )
          })}
      </ScrollView>
    </>
  )
}

export default Results

const resultSyles = StyleSheet.create({
  add: {
    color: 'white',
  },
  icon: {
    alignSelf: 'center',
    marginHorizontal: '10%',
  },
  scrollVertical: {
    paddingBottom: '8%',
    marginHorizontal: '-3%',
  },
  scrollVerticalText: {
    backgroundColor: 'silver',
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  scrollHorizontal: {
    backgroundColor: 'white',
    marginHorizontal: '-5%',
    maxHeight: '77  %',
  },
  container: {
    margin: '4%',
  },
  contentContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  info: {
    marginLeft: '10%',
    width: '70%',
  },
  description: {
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  textContainer: {
    flexDirection: 'row',
  },
  price: {
    marginVertical: '20%',
  },
  discountPercentage: {
    color: '#F37A20',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  pressable: {
    alignItems: 'flex-end',
  },
  insideButton: {
    backgroundColor: '#5EC401',
    borderRadius: 10,
    padding: '6%',
    flexDirection: 'row',
    width: '70%',
  },
})
