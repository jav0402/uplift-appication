import React, { useState } from 'react'
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
const logo = require("../../assets/images/temp-up-100.png")
const facebook = require("../../assets/images/facebook-50.png")
const linkedin = require("../../assets/images/linkedin-50.png")
const instagram = require("../../assets/images/insta-50.png")

// contact me :)
// instagram: must_ait6
// email : mustapha.aitigunaoun@gmail.com

export default function LoginForm() {
    const [click,setClick] = useState(false);
    const {username,setUsername}=  useState("");
    const {password,setPassword}=  useState("");
  
    return (
    <SafeAreaView style={styles.container}>
        
        <Image source={logo} style={styles.image} resizeMode='contain' />
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder='EMAIL OR USERNAME' value={username} onChangeText={setUsername} autoCorrect={false}
        autoCapitalize='none' />
            <TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false}
        autoCapitalize='none'/>
        </View>

        {/* <View style={styles.rememberView}>
            <View style={styles.switch}>
                <Switch  value={click} onValueChange={setClick} trackColor={{true : "green" , false : "gray"}} />
                <Text style={styles.rememberText}>Remember Me</Text>
            </View>
            <View>
                <Pressable onPress={() => Alert.alert("Forget Password!")}>
                    <Text style={styles.forgetText}>Forgot Password?</Text>
                </Pressable>
            </View>
        </View> */}

        <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={() => Alert.alert("Login Successfuly!","see you in my instagram if you have questions : must_ait6")}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </Pressable>


            {/* <Text style={styles.optionsText}>OR LOGIN WITH</Text> */}
            <br />
        </View>
        

        {/* subject to changes */}
        {/* <View style={styles.mediaIcons}>
                <Image href="https://facebook.com" source={facebook} style={styles.icons}   />
                <Image href="https://instagram.com" source={instagram} style={styles.icons}  />
                <Image href="https://linkedin.com" source={linkedin} style={styles.icons}  />
        </View> */}

        <Text href="register" style={styles.footerText}>Don't Have Account?<Text  style={styles.signup}>  Sign Up</Text></Text>

        
    </SafeAreaView>
  )
}

//change style

const styles = StyleSheet.create({
  container : {
    alignItems : "center",
    paddingTop: 70,
  },
  image : {
    height : 160,
    width : 170
  },
  title : {
    fontSize : 30,
    fontWeight : "bold",
    textTransform : "uppercase",
    textAlign: "center",
    paddingVertical : 40,
    color : "red"
  },
  inputView : {
    gap : 15,
    width : "100%",
    paddingHorizontal : 40,
    marginBottom  :5
  },
  input : {
    height : 50,
    paddingHorizontal : 20,
    borderColor : "red",
    borderWidth : 1,
    borderRadius: 7
  },
  rememberView : {
    width : "100%",
    paddingHorizontal : 50,
    justifyContent: "space-between",
    alignItems : "center",
    flexDirection : "row",
    marginBottom : 8
  },
  switch :{
    flexDirection : "row",
    gap : 1,
    justifyContent : "center",
    alignItems : "center"
    
  },
  rememberText : {
    fontSize: 13
  },
  forgetText : {
    fontSize : 11,
    color : "red"
  },
  button : {
    backgroundColor : "red",
    height : 45,
    borderColor : "gray",
    borderWidth  : 1,
    borderRadius : 5,
    alignItems : "center",
    justifyContent : "center"
  },
  buttonText : {
    color : "white"  ,
    fontSize: 18,
    fontWeight : "bold"
  }, 
  buttonView :{
    width :"100%",
    paddingHorizontal : 50
  },
  optionsText : {
    textAlign : "center",
    paddingVertical : 10,
    color : "gray",
    fontSize : 13,
    marginBottom : 6
  },
  mediaIcons : {
    flexDirection : "row",
    gap : 15,
    alignItems: "center",
    justifyContent : "center",
    marginBottom : 23
  },
  icons : {
    width : 40,
    height: 40,
  },
  footerText : {
    textAlign: "center",
    color : "gray",
  },
  signup : {
    color : "red",
    fontSize : 13
  }
})