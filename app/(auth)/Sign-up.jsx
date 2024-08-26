import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, Redirect, Link } from 'expo-router';

import CustomButton from '../../components/customButton';
import { images } from '../../constants'
import FormField from '../../components/formField'
// import { AuthContext,register } from '../../context/authContext';

const SignUp = () => {
  const [form, setForm] = useState({
    email:'',
    password:'',
    confirm_password:'',
    userFullName:'',
    phone_number:''

  });

  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

   // Add form validation logic here
   const handleSignUp = () => {
    // Perform validation and sign up logic
    if (form.password !== form.confirm_password) {
      alert('Passwords do not match');
      return;
    }
    // Add actual sign-up logic here
    // router.push('/Sign-up');
  };

  return (
    <SafeAreaView className='bg-primary flex-1'>
     
      <ScrollView  contentContainerStyle={{ flexGrow: 1}}>
         {/* Logo and Heading */}
      <View className='items-center '>
            <Image
              source={images.logo}
              resizeMode='contain'
              className='w-40 h-40'
            />
            <Text className='text-2xl text-secondary font-semibold text-center'>
              Embark on Wellness
            </Text>
          </View>
        <View className='w-full px-6 py-8'>

          {step === 1 && (
            <>
          <FormField 
            title='Full name'
            value={form.userFullName}
            handleChangeText={(e) => setForm({ ...form, userFullName:e})}
            otherStyles='mb-4 '
            
          />

          <FormField 
            title='Mobile Number'
            value={form.phone_number}
            handleChangeText={(e) => setForm({ ...form, phone_number:e})}
            otherStyles='mb-4 border-secondary text-red-500 bg-primary'
            
            keyboardType='phone-pad'
          />

          <FormField 
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email:e})}
            otherStyles='mb-4'
            keyboardType='email-address'
            
          />
          <View className='flex-row justify-end'>
                <CustomButton title='Next' handlePress={handleNextStep} containerStyles='mt-6 w-1/3' />
          </View>
            </>
          )}

          {step === 2 && (
            <>
          <FormField 
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password:e})}
            otherStyles='mb-4'
            // placeholder='Enter your password'
            secureTextEntry
          />

          <FormField 
            title='Confirm Password'
            value={form.confirm_password}
            handleChangeText={(e) => setForm({ ...form, confirm_password:e})}
            otherStyles='mb-4'
            // placeholder='Confirm your password'
            secureTextEntry
          />
          
          <View className='flex-row justify-center px-3 '>
                <CustomButton title='Back' handlePress={handlePrevStep} containerStyles='mt-6 w-1/3 mr-3' />
                <CustomButton title='Sign up' handlePress={handleSignUp} containerStyles='mt-6 w-1/3 ml-2' />
              </View>

              <TouchableOpacity onPress={() => router.push('/home')} className='mt-4'>
                <Text className='text-lg text-center text-secondary'>
                  Go to Home
                </Text>
              </TouchableOpacity>
            </>
          )}

          
        </View>
      </ScrollView>
      <View className='p-5 flex-row justify-center items-center'>
            <Text className='text-lg'>
              Already have an account?
            </Text>
            <Link href='/Sign-in' className='text-lg text-secondary ml-2'>
              Sign In
            </Link>
          </View>
    </SafeAreaView>
  )
}

export default SignUp