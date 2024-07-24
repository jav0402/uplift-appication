import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const AppGradient = ({
    children, 
    colors,

}:{
    children: any;
    colors: string[];
}) => {
  return (
    <LinearGradient colors={colors}className='flex-1'>
      <SafeAreaView className='flex-1 px-5 py-3'>{children}</SafeAreaView>
    </LinearGradient>
  )
}

export default AppGradient;