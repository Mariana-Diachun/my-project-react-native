import { StatusBar } from "expo-status-bar";

import { View, StyleSheet, ImageBackground } from "react-native";
// import LoginScreen from "./src/components/Screens/LoginScreen";

import RegistrationScreen from "./src/components/Screens/RegistrationScreen.jsx";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("./src/Images/bgImage.jpg")}
      >
        <RegistrationScreen />
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
