import { View, Text, ScrollView, Image, Alert ,KeyboardAvoidingView,Platform} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, Redirect, Link, useRouter } from 'expo-router';

import CustomButton from '../../components/customButton';
import { images } from '../../constants'
import FormField from '../../components/formField'

import Loading from '../../components/loading';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'


const ios = Platform.OS == ios

const SignUp = () => {

  const router = useRouter();
  const [loading,setLoading] = useState(false);

  const [isSubmiting,setIsSubmiting] = useState(false)
  

  const [form, setForm] = useState({
    email:'',
    password:'',
    confirm_password:'',
    userFullName:'',
    phone_number:''

  })  

  const handleReg = async() => {
    if(!form.email ){
      Alert.alert('Sign Up','Please fill email')

    }
    else if(form.password != form.confirm_password){
      Alert.alert('Sign Up','Passwords not the same')

    }
    else if(!form.userFullName || !form.phone_number){
      Alert.alert('Sign Up','Please fill all fields')

    }
    /*
    time spent trying to make this work for login and registration 

    total hours spent = 8
      
    */

    setItAuthenticated(true)


  }


  return (
    <KeyboardAvoidingView
    behavior={ios? 'padding':'height'}
    style={{flex: 1}}
>
    <ScrollView
        style={{flex: 1}}
        bounces={false}
        showsVerticalScrollIndicator={false}
    >
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
              Registration Uplift
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

            <FormField 
              title='Confirm Password'
              value={form.confirm_password}
              handleChangeText={(e) => setForm({ ...form, confirm_password:e})}
              otherStyles='mt-7'
            />
            
            <FormField 
              title='Full Name'
              value={form.userFullName}
              handleChangeText={(e) => setForm({ ...form, userFullName:e})}
              otherStyles='mt-7'
            />
            <FormField 
              title='Mobile Number'
              value={form.phone_number}
              handleChangeText={(e) => setForm({ ...form, phone_number:e})}
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
                  title='Register'
                  handlePress={handleReg}
                  containerStyles='mt-7 '
                  isLoading={isSubmiting}
                  />  
                )
              }
              
            </View>
            <View className='justify-center pt-5 flex-row gap-2'>
              <Text className='text-lg text-gray-100 font-pregular '>
                Already have an account?
              </Text>

              <Link href={'/Sign-in'} className='text-lg font-pregular text-secondary'>
              Sign in
              </Link>

            </View>
            <CustomButton
              title='index'
              handlePress={() => router.push('/home')}
              containerStyles='mt-7 '
            />
          </View>

          
        </ScrollView>
    </SafeAreaView>
    </ScrollView>

</KeyboardAvoidingView>
  )
}

export default SignUp