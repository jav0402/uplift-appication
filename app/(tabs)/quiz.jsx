import { View, Text,button, StyleSheet, ScrollView } from 'react-native'
import React, {useState , useEffect} from 'react'
import {RadioButton } from 'react-native-paper'


const shuffleArray=(array) => {
  let currenIndex = array.length, randomIndex;
  while (currenIndex !== 0){
    randomIndex = Math.floor(Math.random() * currenIndex)
    currenIndex--;
    [array[currenIndex],array[randomIndex]]=[
      array[randomIndex], array[currenIndex]
    ]
    return array;
  }
}

const quiz = () => {
  const [anxietyAns, setAnxietyAns] = useState(Array(6).fill(0))
  const [depressionAns, setDepressionAns] = useState(Array(6).fill(0))
  const [otherAns, setOtherAns] = useState(Array(6).fill(0))
  
  const [anxQn, setAnxQn] = useState([])
  const [depQn, setDepQn] = useState([])
  const [otherQn, setOtherQn] = useState([])

  const anxietyQuestionsList = [
    "I often feel anxious or worried.",
    "I have trouble sleeping or staying asleep due to anxiety.",
    "I find it difficult to relax or unwind.",
    "I frequently feel overwhelmed by my responsibilities.",
    "I avoid social interactions because of anxiety or stress.",
    "My anxiety makes it hard to focus on tasks."
  ];

  const depressionQuestionsList = [
    "I feel sad or hopeless more often than not.",
    "I struggle with feelings of worthlessness or guilt.",
    "I have difficulty enjoying activities that I used to find pleasurable.",
    "I find it hard to motivate myself to get things done.",
    "I feel detached or disconnected from the people around me.",
    "I have lost interest in things I used to enjoy."
  ];

  const otherQuestionsList = [
    "I experience mood swings that affect my daily life.",
    "I have trouble concentrating or making decisions.",
    "I feel tired or fatigued even after a full night's sleep.",
    "I have thoughts of self-harm or harming others.",
    "I feel that my mental health is impacting my physical health.",
    "I have physical symptoms like headaches or stomachaches that I believe are related to my mental state."
  ];
  
  
  return (
    <View>
      <Text>quiz</Text>
    </View>
  )
}

export default quiz