import { StatusBar } from 'expo-status-bar';

import LoginScreen from './src/components/Screens/LoginScreen';

// import RegistrationScreen from './src/components/Screens/RegistrationScreen.jsx';

export default function App() {
  return (
    <>
      {/* <RegistrationScreen /> */}
      <LoginScreen />
      <StatusBar style="auto" />
    </>
  );
}
