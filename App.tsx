import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'

import GlobalRoutes from './src/routes/GlobalRoutes'
import FlashMessage from 'react-native-flash-message'

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <GlobalRoutes />
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  )
}
