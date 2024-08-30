/**
 * TODO:
 * - Write a description for the file.
 */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";

// https://stackoverflow.com/questions/47417766/calling-locally-hosted-server-from-expo-app
const localIp = Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':3000');

/**
 * Sends a post request with user data to create a new user in the database.
 *
 * @param email - New user's email.
 * @param username - New username.
 * @param password - New password.
 * @returns Does not return anything.
 *
 */
export const createUser = async (email, name, password, phone_number) => {
    try {
        const response = await axios.post(`http://${localIp}/auth/register`, { email, name, password, phone_number });
        if (response.status !== 200) throw new Error(response.data);

        await signIn(email, password);
        return;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 *  Signs the user in. Saves the user token to the device's storage. Used so that the user remains signed in even after closing the app.
 *
 * @param email - User's email.
 * @param password - User's password.
 * @returns Returns an array [bool of if signin was successful, str of the server's response message].
 */
export const signIn = async (email, password) => {
    try {
        const response = await axios.post(`http://${localIp}/auth/login`, { email, password });

        const token = response.data.token;
        await AsyncStorage.setItem('token', token);

        return [true, response.data.message];

    } catch (err) {
        if (err.response.status === 401) {
            return [false, err.response.data];
        }
        console.error(err);
        return [false, 'An error occurred. Please try again.'];
    }
};

/**
 * Gets the user's data.
 *
 * @returns Returns user's data.
 *
 * @example
 * ```
 * Write me later.
 * ```
 */
export const getCurrentUser = async () => {
    try {
        const storedToken = await AsyncStorage.getItem('token');

        // If there is no stored token, return false
        if (!storedToken) return false;

        const response = await axios.get(`http://${localIp}/auth/user`, {
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        });
        if (response.status !== 200) throw new Error(response.data);
        return response.data;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Signs the user out. Removes the token from the device's storage.
 *
 * @returns Does not return anything.
 */
export const signOut = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch (err) {
        console.error(err);
    }
}
