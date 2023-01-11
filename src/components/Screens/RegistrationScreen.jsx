import React, { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

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
  ImageBackground,
} from 'react-native';

const initialState = {
  login: '',
  email: '',
  password: '',
};

SplashScreen.preventAutoHideAsync();

const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [appIsReady, setAppIsReady] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get('window').width - 20 * 2
  );
  const [isSecuredText, setIsSecuredText] = useState(true);

  const btnWidthHandler = () => {
    setDimensions(Dimensions.get('window').width - 20 * 2);
  };

  useEffect(() => {
    dimensionsHandler = Dimensions.addEventListener('change', btnWidthHandler);
    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Roboto-Regular': require('../../../assets/fonts/Roboto-Regular.ttf'),
          'Roboto-Medium': require('../../../assets/fonts/Roboto-Medium.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(formState);
    setFormState(initialState);
  };

  const showPassword = () => {
    setIsSecuredText(!isSecuredText);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.image}
          source={require('../../Images/bgImage.jpg')}
        >
          <View style={styles.box}>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 20 : 120,
                  width: dimensions,
                }}
              >
                <View style={styles.imgFrame}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.btnAddWrap}
                  >
                    <Image
                      style={styles.btnAdd}
                      source="../../Images/add.png"
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.title}>Registration</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Login"
                  value={formState.login}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={value =>
                    setFormState(prevState => ({
                      ...prevState,
                      login: value,
                    }))
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  value={formState.email}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={value =>
                    setFormState(prevState => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                />
                <View style={styles.wrap}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={formState.password}
                    onFocus={() => setIsShowKeyboard(true)}
                    onChangeText={value =>
                      setFormState(prevState => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    secureTextEntry={isSecuredText}
                  />
                  <TouchableOpacity
                    style={styles.showPwdBtn}
                    activeOpacity={0.4}
                    onPress={showPassword}
                  >
                    <Text style={styles.textPwd}>Show</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.regBtn}
                  onPress={keyboardHide}
                >
                  <Text style={styles.btnText}>SIGN IN</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={styles.textNav}>
                    Do you have accaunt already? LOG IN
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  box: {
    position: 'relative',
    alignItems: 'center',
    minWidth: '100%',
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  form: {
    // marginBottom: 100,
  },
  imgFrame: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
    alignSelf: 'center',
    top: -60,
  },
  btnAdd: {
    position: 'absolute',
    top: 84,
    left: 107,
    width: 25,
    height: 25,
  },
  wrap: {
    position: 'relative',
  },
  textPwd: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
  showPwdBtn: {
    position: 'absolute',
    top: '45%',
    right: 16,
    margin: 0,
  },
  btnAddWrap: {
    flex: 1,
    position: 'relative',
  },

  title: {
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.01,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    color: '#212121',
    marginTop: 80,
    marginBottom: 10,
  },
  input: {
    fontFamily: 'Roboto-Regular',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
  },
  regBtn: {
    backgroundColor: '#FF6C00',
    height: 51,
    borderRadius: 50,
    marginTop: 43,
    marginBottom: 16,
    paddingVertical: 16,
  },
  btnText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: 'white',
    textAlign: 'center',
  },
  textNav: {
    color: '#1B4371',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: '16px',
    lineHeight: '19px',
  },
});

export default RegistrationScreen;
