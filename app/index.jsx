import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    // <View style={styles.container}>
    <View className='flex-[1] items-center justify-center bg-white'>
      <SafeAreaView>

        <Text className='text-3xl'>UpLift</Text>
        <StatusBar style="auto" />
        <Link href={'/profile'} style={{color:'blue'}}> link to profile</Link>
      </SafeAreaView>

    </View>
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

