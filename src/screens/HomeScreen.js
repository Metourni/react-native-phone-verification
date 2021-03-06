import React from 'react';

import {
    StyleSheet,
    View,
    Button,
    Text,
} from 'react-native';

import Strings from '../localization/strings';
import {Colors} from '../styles';

class HomeScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: Strings.HomeHeader,
        };
    };

    constructor() {
        super();
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <View style={styles.buttonContainerStyle}>
                    <Text>{Strings.PhoneNumber}</Text>
                </View>

                <View style={styles.buttonContainerStyle}>
                    <Button
                        title="Check phone number"
                        onPress={() => navigate('CheckPhone', {name: 'Jane'})}
                    />
                </View>

                <View style={styles.buttonContainerStyle}>
                    <Button
                        title="Change lang"
                        color="#ff6d00"
                        onPress={() => navigate('LanguageSelection')}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BG_PRIMARY_COLOR,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'left',
        marginStart: 22,
        marginTop: 18,
        fontWeight: '700',
    },
    buttonContainerStyle: {
        marginTop: 10,
        marginBottom: 10,
        color: 'red',
    },
});

export default HomeScreen;
