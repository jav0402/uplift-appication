import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'; // Import an icon from react-native-vector-icons
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import CustomButton from '../components/customButton';
import { RadioButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { sendQuizResults } from '../lib/data'
import { useGlobalContext } from '../context/GlobalProvider'

const ITEMS_PER_PAGE = 3;

const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ]
    }
    return array;
}


const quiz = () => {
    const navigation = useNavigation();
    const { user } = useGlobalContext()
    const [anxietyAns, setAnxietyAns] = useState(Array(6).fill(0))
    const [depressionAns, setDepressionAns] = useState(Array(6).fill(0))
    const [otherAns, setOtherAns] = useState(Array(6).fill(0))

    const [anxQn, setAnxQn] = useState([])
    const [depQn, setDepQn] = useState([])
    const [otherQn, setOtherQn] = useState([])


    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const allQuestions = [
        {
            category: 'Anxiety',
            text: "I often feel anxious or worried.",
            answer: '0'
        },
        {
            category: 'Anxiety',
            text: "I have trouble sleeping or staying asleep due to anxiety.",
            answer: '0'
        },
        {
            category: 'Anxiety',
            text: "I find it difficult to relax or unwind.",
            answer: '0'
        },
        {
            category: 'Anxiety',
            text: "I frequently feel overwhelmed by my responsibilities.",
            answer: '0'
        },
        {
            category: 'Anxiety',
            text: "I avoid social interactions because of anxiety or stress.",
            answer: '0'
        },
        {
            category: 'Anxiety',
            text: "My anxiety makes it hard to focus on tasks.",
            answer: '0'
        },
        {
            category: 'Depression',
            text: "I feel sad or hopeless more often than not.",
            answer: '0'
        },
        {
            category: 'Depression',
            text: "I struggle with feelings of worthlessness or guilt.",
            answer: '0'
        },
        {
            category: 'Depression',
            text: "I have difficulty enjoying activities that I used to find pleasurable.",
            answer: '0'
        },
        {
            category: 'Depression',
            text: "I find it hard to motivate myself to get things done.",
            answer: '0'
        },
        {
            category: 'Depression',
            text: "I feel detached or disconnected from the people around me.",
            answer: '0'
        },
        {
            category: 'Depression',
            text: "I have lost interest in things I used to enjoy.",
            answer: '0'
        },
        {
            category: 'Other',
            text: "I experience mood swings that affect my daily life.",
            answer: '0'
        },
        {
            category: 'Other',
            text: "I have trouble concentrating or making decisions.",
            answer: '0'
        },
        {
            category: 'Other',
            text: "I feel tired or fatigued even after a full night's sleep.",
            answer: '0'
        },
        {
            category: 'Other',
            text: "I have thoughts of self-harm or harming others.",
            answer: '0'
        },
        {
            category: 'Other',
            text: "I feel that my mental health is impacting my physical health.",
            answer: '0'
        },
        {
            category: 'Other',
            text: "I have physical symptoms like headaches or stomachaches that I believe are related to my mental state.",
            answer: '0'
        }
    ];

    useEffect(() => {
        setQuestions(shuffleArray(allQuestions));
    }, []);

    const handleAnsChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].answer = value;
        setQuestions(updatedQuestions);
    }

    const calculateScore = (category) => {
        return questions
            .filter(q => q.category === category)
            .reduce((acc, curr) => acc + parseInt(curr.answer), 0);
    }

    const handleSubmit = () => {
        // Check if all questions have been answered
        const allAnswered = questions.every((q) => q.answer !== '0');
        
        if (!allAnswered) {
            alert('Please answer all questions before submitting.');
            return;
        }
    
        const anxietyScore = calculateScore('Anxiety');
        const depressionScore = calculateScore('Depression');
        const otherScore = calculateScore('Other');
    
        const resultMessage = results(anxietyScore, depressionScore, otherScore)
        alert(resultMessage);
    
        const quizSent = sendQuizResults(user, anxietyScore, depressionScore, otherScore, new Date().toLocaleDateString());
        if (!quizSent) alert('Failed to send quiz results');
        else alert('Quiz results sent successfully');
    };

    const results = (anxScore, depScore, otherScore) => {
        let anxRes, depRes, otherRes;

        // anxiety result
        if (anxScore >= 6 && anxScore <= 12) {
            anxRes = `Low risk anxiety: ${anxScore}`;
        } else if (anxScore >= 13 && anxScore <= 18) {
            anxRes = `Moderate risk anxiety: ${anxScore}`;
        } else if (anxScore >= 19 && anxScore <= 30) {
            anxRes = `High risk anxiety: ${anxScore}`;
        }

        // depression result
        if (depScore >= 6 && depScore <= 12) {
            depRes = `Low risk depression: ${depScore}`;
        } else if (depScore >= 13 && depScore <= 18) {
            depRes = `Moderate risk depression: ${depScore}`;
        } else if (depScore >= 19 && depScore <= 30) {
            depRes = `High risk depression: ${depScore}`;
        }

        // other result
        if (otherScore >= 6 && otherScore <= 12) {
            otherRes = `Low risk other concerns: ${otherScore}`;
        } else if (otherScore >= 13 && otherScore <= 18) {
            otherRes = `Moderate risk other concerns: ${otherScore}`;
        } else if (otherScore >= 19 && otherScore <= 30) {
            otherRes = `High risk other concerns: ${otherScore}`;
        }

        return `${anxRes}\n${depRes}\n${otherRes}`;
    }

    const currentQuestions = questions.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

    const handleNextPage = () => {
        const currentQuestions = questions.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);
        
        // Check if all questions on the current page are answered
        const allAnswered = currentQuestions.every((q) => q.answer !== '0');
        
        if (!allAnswered) {
            alert('Please answer all questions before proceeding to the next page.');
            return;
        }
    
        // Move to the next page
        if ((currentPage + 1) * ITEMS_PER_PAGE < questions.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const progress = ((currentPage + 1) * ITEMS_PER_PAGE) / questions.length;

    return (
        <SafeAreaView style={styles.container}>
             
        <ScrollView>
            <TouchableOpacity onPress={() => navigation.goBack()} className='mb-5'>
                <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>
                Basic Self Evaluation Quiz
            </Text>
            <Text style={styles.subtitle}>
                5 for Strongly Agree & 1 for Strongly Disagree
            </Text>

            {currentQuestions.map((question, index) => (
                <View key={index} style={styles.questionContainer}>
                    <Text style={styles.questionText}>
                        {question.text}
                    </Text>
                    <RadioButton.Group
                        onValueChange={(value) => handleAnsChange(currentPage * ITEMS_PER_PAGE + index, value)}
                        value={question.answer}
                    >
                        <View style={styles.radioGroup}>
                            {[5, 4, 3, 2, 1].map(value => (
                                <View key={value} style={styles.radioButtonContainer}>
                                    <Text style={styles.radioLabel}>{value}</Text>
                                    <View style={styles.radioBackground}>
                                        <RadioButton value={value.toString()} />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </RadioButton.Group>
                </View>
            ))}

                  {/* Show pagination buttons */}
            <View style={styles.paginationContainer} className='flex-row justify-center'>
                {/* Show Previous button except on the first page */}
                {currentPage > 0 && (
                    <View style={{ flex: 1 }}>
                        <CustomButton
                            title="Previous"
                            handlePress={handlePreviousPage}
                            containerStyles="bg-secondary"
                            textStyles="text-primary"
                            isLoading={false}
                        />
                    </View>
                )}

                {/* Show Next or Submit button based on the page */}
                <View style={{ flex: 1}}>
                    {currentPage < Math.ceil(questions.length / ITEMS_PER_PAGE) - 1 ? (
                        <CustomButton
                            title="Next"
                            handlePress={handleNextPage}
                            containerStyles="bg-secondary"
                            textStyles="text-primary"
                            isLoading={false}
                        />
                    ) : (
                        <CustomButton
                            title="Submit"
                            handlePress={handleSubmit}
                            containerStyles="bg-secondary"  // Apply custom pale green color class
                            textStyles="text-white"
                            isLoading={false}
                        />
                    )}
                </View>
            </View>

            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
        </ScrollView>
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
container: {
    backgroundColor: '#F0EAD6', // primary color
    padding: 20,
    flex: 1
},
title: {
    fontFamily: 'Poppins-Bold', // using Poppins font
    fontSize: 24,
    color: '#1E1E2D', // black-100
    textAlign: 'center',
    marginBottom: 20
},
subtitle: {
    fontFamily: 'Poppins-ExtraLight', // using Poppins font
    fontSize: 14,
    color: '#1E1E2D', // black-100
    textAlign: 'center',
    marginBottom: 20
},
questionContainer: {
    marginBottom: 20
},
questionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#1E1E2D', // black-100
    marginBottom: 10
},
radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
},
radioButtonContainer: {
    marginHorizontal: 5
},
radioLabel: {
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'Poppins-Light',
    color: '#2F4F4F' // gray-100
},
radioBackground: {
    backgroundColor: '#FF8E01', // secondary-200
    borderRadius: 50,
    padding: 5
},
pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20
},
progressBar: {
    height: 10,
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 20
},
progressFill: {
    height: '100%',
    backgroundColor: '#FF8C00'
}
});

/*
Anxiety Score Range:
6-12: Low anxiety risk.
13-18: Moderate anxiety.
19-30: High anxiety.


Depression Score Range:
6-12: Low depression risk.
13-18: Moderate depression.
19-30: High depression.


Other Mental Health Concerns Score Range:
6-12: Low risk.
13-18: Moderate concern.
19-30: High concern.

*/
export default quiz
