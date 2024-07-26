import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/customButton';

export default function App() {
  return (
    // <View style={styles.container}>

      <SafeAreaView className='bg-primary h-full'>
        <ScrollView contentContainerStyle={{height: '100%'}}>
          <View className='w-full justify-center items-center min-h-[85vh] px-4'>
            
            {/* to change to our logo */}
            <Image 
              source={images.logo} 
              className='w-[130px] h-[84px]'
              resizeMode='contain'
            />

            <Image 
              source={images.cards}
              className='max-w-[380px] w-full h-[300px]'
              resizeMode='contain'
            />

            {/* requres text reposition */}
            <View >
              <Text className='text-3xl text-white font-bold text-center'>
                prioratize mental health with {' '}
                <Text className='text-secondary-200'>UpLift</Text>
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
                title='cont with email'
                handlePress={() => router.push('/Sign-in')}
                containerStyles='mt-7 '
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
        </ScrollView>
      </SafeAreaView>


  );
}

//just to push


/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
}); */

