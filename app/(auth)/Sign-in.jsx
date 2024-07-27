import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, Redirect, Link } from 'expo-router';

import CustomButton from '../../components/customButton';
import { images } from '../../constants'
import FormField from '../../components/formField'

const SignIn = () => {
  const [form, setForm] = useState({
    email:'',
    password:''

  })

  return (
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

          <CustomButton
                title='Sign in'
                handlePress={() => router.push('/Sign-up')}
                containerStyles='mt-7 '
              />
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
  )
}

export default SignIn