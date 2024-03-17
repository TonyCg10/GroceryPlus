import { Platform, StyleSheet } from 'react-native'

const basePagesStyle = StyleSheet.create({
  containerPage: {
    marginTop: Platform.OS ==='android' ? '14%': '18%',
    flex: 1,
    marginHorizontal: '5%',
  },
  header: {
    flexDirection: 'row',
    marginBottom: '5%',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  icon: {
    alignSelf: 'center',
    marginRight: '5%',
  },
  notiIcon: {
    alignSelf: 'center',
    marginRight: 6,
    flex: 1,
    alignItems: 'flex-end',
  },
  gridsScroll: {
    marginBottom: '20%',
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    opacity: 0.1,
    marginHorizontal: '-5%',
  },
})

export { basePagesStyle }
