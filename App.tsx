import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto';

import { Loading } from '@components/Loading';

import { Players } from '@screens/Players';

import theme from './src/theme'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular,Roboto_700Bold });

//fontloaded indica que a minha fonte está carregando a
  return (   
    <ThemeProvider theme = {theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent

      />
    { fontsLoaded ?  <Players/> : <Loading/>} 
    </ThemeProvider>
);




  }
