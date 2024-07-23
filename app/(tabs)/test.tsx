import { StyleSheet, Image, Platform } from 'react-native';
import { Slot } from 'expo-router';
const rooylayout = () => {
    return (
        <>
            <text>header</text>
            <Slot />
            <text>footer</text>
        </>
    )
}
export default rooylayout