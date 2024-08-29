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
        const response = await axios.post(`http://${localIp}/data/quiz`, {user_id, anxiety, depression, other, date});
        if (response.status !== 200) throw new Error(response.data);

        return true
    } catch (error) {
        console.log(error);
        return false
    }
}
