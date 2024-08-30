import axios from 'axios';
import Constants from 'expo-constants';

// https://stackoverflow.com/questions/47417766/calling-locally-hosted-server-from-expo-app
const localIp = Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':3000');

/**
 * Sends a POST request to the server to input a new quiz entry for the user.
 *
 * @param anixety - Anxiety score
 * @param depression - Depression score.
 * @param other - others score.
 * @param date - date of quiz submission DD/MM/YY.
 * @returns Bool if the data has been successfully updated or not.
 *
 */
export const sendQuizResults = async (user, anxiety, depression, other, date) => {
    try {
        const user_id = user.id;
        const response = await axios.post(`http://${localIp}/data/quiz`, { user_id, anxiety, depression, other, date });
        if (response.status !== 200) throw new Error(response.data);

        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const factors = [
    'Work',
    'School',
    'Love',
    'Friends',
    'Family',
    'Money',
    'Health',
    'Life',
    'Others',
];

/**
 * Sends a POST request to the server to input a new mood entry for the user.
 *
 * @param user
 * @param mood
 * @param selectedFactors
 * @param data
 * @returns Bool if the data has been successfully updated or not.
 *
 */
export const sendMoodData = async (user, mood, selectedFactors, date) => {
    const user_id = user.id;

    const selectedFactorsCount = factors.reduce((acc, factor) => {
        acc[factor] = selectedFactors.includes(factor) ? 1 : 0;
        return acc;
    }, {});

    try {
        const response = await axios.post(`http://${localIp}/data/mood`, { user_id, mood, ...selectedFactorsCount, date });
        if (response.status !== 200) throw new Error(response.data);

        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

/**
 * Fetches mood data for a specific user.
 *
 * @param user - User object, user id is required.
 * @returns Returns an array of mood records for the specific user .
 *
 */
export const getMoodData = async (user) => {
    try {
        const response = await axios.get(`http://${localIp}/data/mood/${user.id}`);
        if (response.status === 404) return [];
        if (response.status === 500) throw new Error(response.data);

        const moodLogs = [];
        response.data.forEach(row => {
            dateParts = row.date.split('/');
            row.date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
            let newObj = {
                "mood": row.mood,
                "factors": Object.keys(row).filter(key => row[key] === 1 && factors.includes(key)),
                "date": row.date
            };
            moodLogs.push(newObj);
        });

        return moodLogs;
    } catch (error) {
        console.log(error);
        return []
    }
}
