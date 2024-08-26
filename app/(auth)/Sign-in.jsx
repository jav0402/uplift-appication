// test comment
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


  const [isSubmiting,setIsSubmiting] = useState(false)
  
  const submit = () => {

    /*
    time spent trying to make this work for login and registration 
    
    expo eas 

    total hours spent = 3 
    */

    // if (form.email === "" || form.password === "") {
    //   Alert.alert("Error", "Please fill in all fields");
    // }

    // setSubmitting(true);

    // try {
    //   await signIn(form.email, form.password);
    //   const result = await getCurrentUser();
    //   setUser(result);
    //   setIsLogged(true);

    //   Alert.alert("Success", "User signed in successfully");
    //   router.replace("/home");
    // } 
    // catch (error) {
    //   Alert.alert("Error", error.message);
    // } 
    // finally {
    //   setSubmitting(false);
    // }
  }

  return (
    <SafeAreaView 
      className='bg-primary h-full'
    >
      <ScrollView >
        <View className='w-full flex-start h-full px-4 py-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className=' w-40 h-40 '
          />
          <Text className='text-2xl text-secondary font-semibold '>
            Login to Uplift
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
                //expo eas 
                handlePress={(submit) => router.push('/home')}
                containerStyles='mt-7 '
                isLoading={isSubmiting}
          />

          
        </View>

        
      </ScrollView>
      <View className='justify-center p-5 flex-row gap-2'>
            <Text className='text-lg'>
              Don't have an account?
            </Text>

            <Link href={'/Sign-up'} className='text-lg text-secondary'>
            Sign up here
            </Link>

          </View>

    </SafeAreaView>
  )
}

export default SignIn