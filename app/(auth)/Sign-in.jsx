import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, Redirect, Link, useRouter } from 'expo-router';

import CustomButton from '../../components/customButton';
import { images } from '../../constants'
import FormField from '../../components/formField'

import Loading from '../../components/loading';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import customKeyboardView from '../../components/CustomKeyboardView';


const SignIn = () => {
  const router = useRouter();
  const [loading,setLoading] = useState(false);

  const [form, setForm] = useState({
    email:'',
    password:''

  })


  const [isSubmiting,setIsSubmiting] = useState(false)
  
  const handleLogin = async() => {
    if(!form.email || !form.password){
      Alert.alert('Sign In','Please fill all fields')

    }
    /*
    time spent trying to make this work for login and registration 

    total hours spent = 8
     
    */

    setItAuthenticated(true)


  }

  return (
    // <customKeyboardView>
      <SafeAreaView 
        className='bg-primary h-full'
      >
        <ScrollView>
          <View className='w-full justify-center h-full px-4 py-6'>
            <Image
              source={images.logo}
              resizeMode='conatin'
              className='w-[115] h-[35]'
            />
            <Text className='text-2xl text-white mt-10 font-psemibold text-semibold'>
              login to Uplift
            </Text>

            <FormField 
              title='Email'
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email:e})}
              otherStyles='mt-7'
              keyboardType='email-address'
            />
            <FormField 
              title='Password'
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password:e})}
              otherStyles='mt-7'
            />
            <View>
              {
                loading?(
                  <View className='flex-row justify-center'>
                    <Loading size={hp(6.5)}/>
                  </View>
                ):(
                  <CustomButton
                  title='Sign in'
                  handlePress={handleLogin}
                  containerStyles='mt-7 '
                  isLoading={isSubmiting}
                  />  
                )
              }
              
            </View>

            


            <View className='justify-center pt-5 flex-row gap-2'>
              <Text className='text-lg text-gray-100 font-pregular '>
                Don't have account?
              </Text>

              <Link href={'/Sign-up'} className='text-lg font-pregular text-secondary'>
              Sign up
              </Link>

            </View>
          </View>

          
        </ScrollView>

      </SafeAreaView>
    // </customKeyboardView>
  )
  
}

export default SignIn