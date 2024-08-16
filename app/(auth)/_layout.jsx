import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, Slot, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useAult } from '../../context/authContext'


const MainLayout =()=>{
  const {isAuthenticated}=useAult();
  const segments = useSegments();
  const router = useRouter();

  useEffect(()=>{
    if(typeof isAuthenticated=='undefined') return;
    const inApp = segments[0]=='(tabs)';
    if(isAuthenticated && !inApp){
      //redirect into home
      router.replace('home')
    }
    else if(isAuthenticated == false){
      //redirect to signin
      router.replace('Sign-in')
    }
  },[isAuthenticated])
  return <Slot/>
}

const authLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="Sign-in" options={{ headerShown: false,}}/>
        <Stack.screen name="Sign-up" options={{headerShown: false,}}/>
        
      </Stack>

      <StatusBar 
        backgroundColor='#161622'
        style='light'
      />
    </>

  )
}

export default authLayout