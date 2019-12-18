import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Strings from './src/localization/strings';
import HomeScreen from './src/screens/HomeScreen';
import PhoneVerificationScreen from './src/screens/PhoneVerificationScreen';
import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';

const MainNavigator = createStackNavigator({
    Home: {screen: HomeScreen, navigationOptions: {title: Strings.HomeHeader}},
    CheckPhone: {screen: PhoneVerificationScreen, navigationOptions: {title: Strings.PhoneVerificationHeader}},
    LanguageSelection: {screen: LanguageSelectionScreen, navigationOptions: {title: Strings.LanguageSelectionHeader}},
});

const App = createAppContainer(MainNavigator);

export default App;
