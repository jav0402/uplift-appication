import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated, Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/customButton';

export default function App() {

  // Animated values for position and rotation
  const imageTransform = useRef(new Animated.Value(0)).current;
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Define the background image animation
    Animated.timing(imageTransform, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // After the background image animation completes, start the bounce animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceValue, {
            toValue: -10, // Move up by 10 pixels
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(bounceValue, {
            toValue: 0, // Move back down
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, [imageTransform, bounceValue]);

  // Interpolating transform values
  const transformStyle = {
    transform: [
      {
        translateX: imageTransform.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -50], // Move slightly to the left
        }),
      },
      {
        translateY: imageTransform.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 145], // Move slightly down
        }),
      },
      {
        rotate: imageTransform.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '30deg'], // Rotate slightly clockwise
        }),
      },
    ],
  };

  return (
    // <View style={styles.container}>

      <SafeAreaView className='bg-primary flex-1'>
        <ScrollView contentContainerStyle={{height: '100%'}}>
          <View className='flex-1 relative items-center px-4 py-10'>

       {/* Animated Background Image */}
       <Animated.Image
          source={images.background} // Ensure this path is correct
          className='absolute bottom-0 left-0 h-[60%]'
          style={{
            width: '250%', // Ensure the image is large enough to move across the screen
            height: '150%',
            ...transformStyle,
          }}
          resizeMode='cover'
        />

        <View className='relative z-10 w-full justify-center items-center min-h-[50%] px-4 pt-10'>
        <Animated.Image 
              source={images.brain_meditation}
              style={{
                width: 380,
                height: 280,
                transform: [{ translateY: bounceValue }],
              }}
              resizeMode='contain'
            />
            
            {/* to change to our logo */}
            <Image 
              source={images.logo_white} 
              style={{ width: 300, height: 130, marginTop: 15 }}
              resizeMode='contain'
            />

            {/* requres text reposition */}
            <View >
              <Text className='text-3xl text-white font-bold text-center'>
                Prioritize mental health
              </Text>

              
              {/* this part is ommited {not in use} */}
              {/* 
              <Image 
              source={images.path}
                className='w-[136px] h-[15-px] absolute -bottom-2 -right-8'
                resizeMode='contain'
              /> 
              
              */}

              <CustomButton
                title='Login'
                handlePress={() => router.push('/Sign-in')}
                containerStyles='mt-3 '
              />

              <CustomButton
                title='Sign up'
                handlePress={() => router.push('/Sign-up')}
                containerStyles='mt-5 '
              />

              {/* subject to change dependign on the color */}

              <StatusBar 
                backgroundColor='#161622'
                style='light'
              />

            </View>
            {/* <Text className='text-3xl font-pblack '>UpLift</Text>

            <StatusBar style="auto" />

            <Link href={'/home'} style={{color:'blue'}}> link to profile</Link> */}
          </View>
          </View>
        </ScrollView>
      </SafeAreaView>


  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
}); */

