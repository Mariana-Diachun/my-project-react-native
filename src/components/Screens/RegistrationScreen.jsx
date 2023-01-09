import React, { useState, useEffect } from "react";
import { Font } from "expo";
import AppLoading from "expo-app-loading";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  Keyboard,
  Dimensions,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
  });
};

const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(formState);
    setFormState(initialState);
  };

  if (!isReady) {
    return (
      <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)} />
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.keyboard}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? 10 : 66,
              width: dimensions,
            }}
          >
            <View style={styles.imgFrame}>
              <TouchableOpacity activeOpacity={0.6}>
                <Image style={styles.btnAdd} source="../../Images/add.png" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.title}>Registration</Text>
              <TextInput
                style={styles.input}
                placeholder="Login"
                value={formState.login}
                onChangeText={(value) =>
                  setFormState((prevState) => ({ ...prevState, login: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                value={formState.email}
                onChangeText={(value) =>
                  setFormState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={formState.password}
                onChangeText={(value) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
                secureTextEntry={true}
              />
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.regBtn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnText}>SIGN IN</Text>
              </TouchableOpacity>
              {isShowKeyboard ? null : (
                <>
                  <TouchableOpacity>
                    <Text style={styles.textNav}>
                      Do you have accaunt already? LOG IN
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    position: "relative",
    alignItems: "center",
    // minWidth: "100%",
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: "#FFFFFF",
    // paddingBottom: 30,
  },
  form: {
    marginHorizontal: 40,
  },
  imgFrame: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    alignSelf: "center",
    top: -60,
  },
  btnAdd: {
    color: "#FF6C00",
    position: "absolute",
    top: 84,
    left: 107,
    width: 25,
    height: 25,
  },
  title: {
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.01,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginTop: 80,
    marginBottom: 10,
  },
  input: {
    fontFamily: "Roboto-Regular",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  regBtn: {
    backgroundColor: "#FF6C00",
    height: 51,
    // width: 343,
    borderRadius: 50,
    marginTop: 43,
    marginBottom: 16,
    paddingVertical: 16,
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "white",
    textAlign: "center",
  },
  textNav: {
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: "16px",
    lineHeight: "19px",
  },
});

export default RegistrationScreen;
