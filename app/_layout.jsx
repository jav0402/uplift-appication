import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot , SplashScreen, Stack ,useRouter,useSegments} from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useAult,authcontextProvider } from '../context/authContext'

// import { GlobalProvider } from '../context/GloblProvider'

SplashScreen.preventAutoHideAsync();




// const MainLayout =()=>{
//   const {isAuthenticated}=useAult();
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(()=>{
//     if(typeof isAuthenticated=='undefined') return;
//     const inApp = segments[0]=='(tabs)';
//     if(isAuthenticated && !inApp){
//       //redirect into home
//       router.replace('home')
//     }
//     else if(isAuthenticated == false){
//       //redirect to signin
//       router.replace('Sign-in')
//     }
//   },[isAuthenticated])
//   return <Slot/>
// }


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
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black":require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),

  })

  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  },[fontsLoaded, error])

  if(!fontsLoaded && !error) return null;

  return(
    // <GlobalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
      </Stack>
    // </GlobalProvider>
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