import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot , Stack} from 'expo-router'

const RootLayout = () => {
 /*  return (
    <View style = {styles.container}>
      <Text>RootLayout</Text>
    </View>
  ) */
/*   return (
    <>
      <Text>Header</Text>
        <Slot />
      <Text>footer</Text>
    </>
  ) */
  return(
    <Stack>
      <Stack.Screen name = "index"options={{ headerShown: false}} />
    </Stack>
  )
}

export default RootLayout;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1 ,
        alignItems: 'center',
        justifyContent: 'center',
    }
})