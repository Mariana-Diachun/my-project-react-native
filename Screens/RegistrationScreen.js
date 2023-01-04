import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [rightIconColor, setRightIconColor] = useState("#0C8A7B");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-slash");
      //setRightIconColor('#FF0000')
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-slash") {
      setRightIcon("eye");
      //setRightIconColor('#0C8A7B')
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.box}>
        <View
          style={{
            ...styles.form,
            marginBottom: isShowKeyboard ? 32 : 144,
          }}
        >
          <Text style={styles.title}>Registration</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Login"
              onFocus={() => setIsShowKeyboard(true)}
              value={state.login}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, login: value }))
              }
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Email address"
              onFocus={() => setIsShowKeyboard(true)}
              value={state.email}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={passwordVisibility}
              onFocus={() => setIsShowKeyboard(true)}
              value={state.password}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, password: value }))
              }
            />{" "}
            <TouchableOpacity onPress={handlePasswordVisibility}>
              <Icon name={rightIcon} size={25} color={rightIconColor} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={keyboardHide}
          >
            <Text style={styles.btnTitle}>SIGN IN</Text>
          </TouchableOpacity>
          <Text style={styles.textLink}>
            Do you have accaunt already? LOG IN
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "70%",
  },
  form: {
    marginHorizontal: 16,
    // marginBottom: 78,
  },
  title: {
    textAlign: "center",
    color: "#212121",
    fontSize: 30,
    fontWeight: "500",
    marginTop: 92,
    marginBottom: 33,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: { color: "#FFFFFF", fontSize: 16 },
  textLink: {
    color: "#1B4371",
    textAlign: "center",
    marginTop: 16,
  },
});
