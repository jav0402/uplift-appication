import { View, Text } from 'react-native';
import React,{createContext,useContext} from 'react';
import * as SQLite from 'expo-sqlite';



const AuthContext = createContext();
const db = SQLite.openDatabaseAsync('user.db');

export const AuthProvider = ({ children }) => {
const register = (userFullName,Username,email,password) =>{
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO users (userFullName,Username,email,password) VALUES (?,?,?,?);',
            [userFullName,Username,email,password],
            (_,result)=>{
                console.log('user registed successfuly',result);
                //send to signin pg
                router.push('/Sign-in');
            },
            (_,error) => {
                console.log('error register user',error);

                //return/stay on registeraiton pg
                return;
            }
        )
    })
}
return(
    <AuthContext.Provider value={{register}}>
        {children}
    </AuthContext.Provider>
)
}
export const useAuth = () => useContext(AuthContext);

