import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, Redirect, Link} from 'expo-router';

import CustomButton from '../../components/customButton';
import { images } from '../../constants'
import FormField from '../../components/formField'

//register imports 
import { useAuth } from '../../context/authContext';

const SignUp = () => {
  const [form, setForm] = useState({
    email:'',
    password:'',
    confirm_password:'',
    userFullName:'',
    Username:''

  });
  const {register} = useAuth();
  console.log('reg function', register)

  const handleSignUp = () => {
    const { email, password, confirm_password, userFullName, Username } = form;
    
    // Basic validation (you can add more comprehensive validation)
    // if (!email || !password || !confirm_password || !userFullName || !Username) {
    //   if (!email ) {
    //     Alert.alert("Error", "Email left Empty");
    //     return;
    //   }
    //   else if(!Username){
    //     Alert.alert("Error", "fill in Username");
    //     return;
    // ``}
    //   else if(password == ''){
    //     Alert.alert("Error", "Passwords not filled in");
    //     return
    //   }
    //   else if (password != confirm_password) {
    //     Alert.alert("Error", "Passwords do not match");
    //     return;
    //   }
    //   else if(!userFullName){
    //     Alert.alert("Error", "fill in full name");
    //     return;
    //   }
    // }
    
      

    // Register the user using the SQLite logic
    // register(userFullName,Username, email, password);
    register(userFullName, Username, email, password)
    // Navigate to another screen after successful registration (e.g., home or login)
  };
  return (
    <SafeAreaView 
      className='bg-primary h-full'
    >
      <ScrollView>
        <View className='w-full justify-center h-full px-4 py-6'>
          <Image
            source={images.logo}
            resizeMode='conatin'
            className='w-[120] h-[120]'
          />
          <Text className='text-2xl text-secondary mt-10 font-psemibold text-semibold'>
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
            title='Username'
            value={form.phone_number}
            handleChangeText={(e) => setForm({ ...form, Username:e})}
            otherStyles='mt-7'
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
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-black-100 font-pregular '>
              Already have account?
            </Text>

            <Link href={'/Sign-in'} className='text-lg font-pregular text-secondary'>
            Sign In
            </Link>
          </View>

          <CustomButton
            title='Sign up'
            handlePress={handleSignUp}
            containerStyles='mt-7 '
          />

          <CustomButton
            title='index'
            handlePress={() => router.push('/home')}
            containerStyles='mt-7 '
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp