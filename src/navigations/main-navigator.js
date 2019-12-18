import {createStackNavigator} from 'react-navigation-stack';

// Strings for multi languages
import Strings from '../localization/strings';

// App Screens
import HomeScreen from '../screens/HomeScreen';
import PhoneVerificationScreen from '../screens/PhoneVerificationScreen';
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';

// Navigator options
const MainNavigatorConfig = {
    initialRouteName: 'Main',
    header: null,
    headerMode: 'none',

    defaultNavigationOptions: {
        headerStyle: {
            //backgroundColor: primaryColor,
            elevation: 0,       //remove shadow on Android
            shadowOpacity: 0,   //remove shadow on iOS
            borderBottomWidth: 0,
        },
        //headerTintColor: mainBGColor,
        headerBackTitle: null,
    },
};

// Navigator
const MainNavigator = createStackNavigator({
    Home: {screen: HomeScreen, navigationOptions: {title: Strings.HomeHeader}},
    CheckPhone: {screen: PhoneVerificationScreen, navigationOptions: {title: Strings.PhoneVerificationHeader}},
    LanguageSelection: {screen: LanguageSelectionScreen, navigationOptions: {title: Strings.LanguageSelectionHeader}},
});

module.exports = MainNavigator;
