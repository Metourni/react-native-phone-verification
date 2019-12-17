import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Strings from '../localization/strings';

class LanguageSelect extends React.Component {

    constructor(props) {
        super(props);
        global.lang = [
            {shortform: 'en', longform: 'English'},
            {shortform: 'fr', longform: 'French'},
        ];
    }

    setText(value) {

        Strings.setLanguage(value);
        this.props.navigation.navigate('Home', {JSON_Clicked_Item: value});
    }

//yarn add react-native-gesture-handler
    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={{marginTop: 60}}>
                    <Text style={styles.textHeading}>
                        Please Select Preferred Language
                    </Text>
                </View>
                <ScrollView style={{marginTop: 30, width: '80%'}}>
                    {global.lang.map(
                        (item, key) => (
                            <View style={styles.elementContainer} key={key}>
                                <Text
                                    ref={item.shortform}
                                    onPress={() => this.setText(item.shortform)}
                                    style={styles.text}>
                                    {item.longform}
                                </Text>
                                <View style={styles.separator}/>
                            </View>
                        ),
                    )}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    textHeading: {
        color: '#191919',
        fontSize: 30,
        textAlign: 'center',
    },
    img: {
        width: 64,
        height: 64,
        marginTop: 30,
    },
    elementContainer: {
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
    },
    text: {
        color: '#191919',
        fontSize: 25,
    },
    separator: {
        height: 0.5,
        width: '60%',
        backgroundColor: '#C2C2C2',
        marginTop: 10,
    },
});

export default LanguageSelect;
