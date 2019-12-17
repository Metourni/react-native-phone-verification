import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './src/screens/HomeScreen';
import PhoneVerificationScreen from './src/screens/PhoneVerificationScreen';
import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';

const MainNavigator = createStackNavigator({
    Home: {screen: HomeScreen},
    CheckPhone: {screen: PhoneVerificationScreen},
    LanguageSelection: {screen: LanguageSelectionScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
