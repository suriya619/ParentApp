import { Platform } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";

export const connectDB = () => {
    const dBConnection = Platform.OS === "ios" ? { name: "parentApp.db", createFromLocation: 1, location:'Library' } : { name: "parentApp.db", createFromLocation: 1 }
    const db = openDatabase(dBConnection, (res) => {
        console.log(res, 'db connection success')
     }, (err) => {
        console.log(err, 'db connection error')
     });
    return db;
}