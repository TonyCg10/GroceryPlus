import { StatusBar } from 'expo-status-bar'

import GlobalRoutes from './src/routes/GlobalRoutes'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <GlobalRoutes />
      </NavigationContainer>
    </>
  )
}
