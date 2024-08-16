import { View, Text } from 'react-native'
import React from 'react'
import lottieview from 'lottie-react-native'

const Loading = (size) => {
  return (
    <View style ={{heingth:size,aspectRatio:1}}>
        <LottieView style={{flex: 1}} source={require('../assets/loading_animation.json')} autoplay loop />
    </View>
  )
}

export default Loading