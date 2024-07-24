import { View, Text, ImageBackground, SafeAreaView } from 'react-native'
import React from 'react'
import {LinearGradient} from "expo-linear-gradient"
import { StatusBar } from 'expo-status-bar'



import beachimg from "@/assets/meditation-images/beach.webp"
import CustomButton from '@/componets/CustomButton'

const index = () => {
	const router = useRouter();
	return (
		<View className='flex-1'>
			<ImageBackground 
				source={beachimg}
				resizeMode='cover'
				className='flex-1'
			>
			<AppGradient colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
				>
					<SafeAreaView className='flex-1 mx-5 my-12 justify-between'>
					 
						<View>
							<Text className="text-center text-white font-bold text-4xl"> 
								UpLift
							</Text>
							<Text className="text-center text-white text-regular text-2xl mt-3"> 
								Description of application
							</Text>
						</View>

              <View>
                <CustomButton onPress={() => console.log("button pressed")} 
                title="get started"
                />
              </View>

						<StatusBar style="light"/>
					
					</SafeAreaView>
				</AppGradient>
				{/* <AppGradient colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}>

						<SafeAreaView className='flex-1 px-1 justify-between'>

							<View>
								<Text className="text-center text-white font-bold text-4xl">
									UpLift
								</Text>
								<Text className="text-center text-white text-regular text-2xl mt-3">
									Description of application
								</Text>
							</View>

							<View>
								<CustomButton
									// onPress={() => console.log("button pressed")}
									onPress={() => router.push('/nature')}
									title="Test"
								/>
							</View>
							<StatusBar style="light"/>
					
						</SafeAreaView>
				</AppGradient> */}
				{/* <Text>app</Text> */}

      </ImageBackground>
    </View>
  )
}

export default index