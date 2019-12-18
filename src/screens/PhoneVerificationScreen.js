import React from 'react';

import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    Alert,
} from 'react-native';

import {Colors} from '../styles';
import Strings from '../localization/strings';

import Spinner from 'react-native-loading-spinner-overlay';
import Form from 'react-native-form';
import CountryPicker from 'react-native-country-picker-modal';

const API = {
    baseURI: 'http://192.168.0.172:3000',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 1000 * 2,
};

const MAX_LENGTH_CODE = 6;
const MAX_LENGTH_NUMBER = 10;

// if you want to customize the country picker
const countryPickerCustomStyles = {};

// your brand's theme primary color
const brandColor = Colors.PRIMARY;

export default class PhoneVerification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enterCode: false,
            spinner: false,
            country: {
                cca2: 'DZ',
                callingCode: '213',
            },
            code: '',
            phoneNumber: '',
        };

        this._textInput = React.createRef();
    }

    _getCode = () => {
        // Todo : check if valid number

        this.setState({spinner: true});

        setTimeout(async () => {
            try {

                let countryCode = this.state.country.callingCode;
                let phoneNumber = this._textInput._lastNativeText;
                let sent = false;

                await fetch(API.baseURI + '/auth/send-code', {
                    method: 'POST',
                    headers: API.headers,
                    body: JSON.stringify({
                        phoneNumber: phoneNumber,
                        countryCode: countryCode,
                    }),
                }).then(
                    (response) => {
                        if (response.status === 201) {
                            return response.json();
                        } else if (response.status === 404) {
                            throw 'Phone number doesn\'t exists';
                        } else {
                            throw 'Can\'t reach the server.';
                        }
                    },
                ).then((responseJson) => {
                    if (responseJson && responseJson.sent) {
                        sent = responseJson.sent;
                    } else {
                        throw 'Can\'t send code.';
                    }
                }).catch(error => {
                    console.log('Catch error : ', error);
                    throw 'Can\'t connect to the server';
                });


                this.setState({
                    spinner: false,
                    enterCode: true,
                    verification: sent,
                    phoneNumber: phoneNumber,
                });

                this._textInput.setNativeProps({text: ''});

                setTimeout(() => {
                    Alert.alert(Strings.Sent, Strings.CodeSent, [{
                        text: 'OK',
                        onPress: () => this._textInput.focus(),
                    }]);
                }, 100);

            } catch (err) {
                this.setState({spinner: false});
                setTimeout(() => {
                    Alert.alert('Oops!', err);
                }, 100);
            }

        }, 100);

    };

    _verifyCode = () => {

        this.setState({spinner: true});

        setTimeout(async () => {

            try {

                let countryCode = this.state.country.callingCode;
                let phoneNumber = this.state.phoneNumber;
                let code = this._textInput._lastNativeText;

                await fetch(API.baseURI + '/auth/verify-code', {
                    method: 'POST',
                    headers: API.headers,
                    body: JSON.stringify({
                        phoneNumber: phoneNumber,
                        countryCode: countryCode,
                        code: code,
                    }),
                }).then(
                    (response) => {
                        if (response.status === 201) {
                            return response.json();
                        } else if (response.status === 404) {
                            throw 'Phone number doesn\'t exists';
                        } else {
                            throw 'Can(t reach the server.';
                        }
                    },
                ).then((responseJson) => {
                    if (responseJson && responseJson.verified) {
                        console.log('Phone verified.');
                    } else {
                        throw 'Can\'t check the code, try to resend it again.';
                    }
                }).catch(error => {
                    console.log('Catch error :', error);
                    throw 'Can\'t connect to the server';
                });

                this._textInput.blur();
                this.setState({spinner: false});
                setTimeout(() => {
                    Alert.alert(Strings.Success, Strings.SuccessfullyVerifiedPhoneNumber);
                    this.props.navigation.navigate('Home');

                }, 100);

            } catch (err) {
                this.setState({spinner: false});
                setTimeout(() => {
                    Alert.alert('Oops!', err.message);
                }, 100);
            }

        }, 100);

    };

    _onChangeText = (val) => {
        if (!this.state.enterCode) {
            return;
        }
        if (val.length === MAX_LENGTH_CODE) {
            this._verifyCode();
        }
    };

    _tryAgain = () => {
        this._textInput.setNativeProps({text: ''});
        this._textInput.focus();
        this.setState({enterCode: false});
    };

    _getSubmitAction = () => {
        this.state.enterCode ? this._verifyCode() : this._getCode();
    };

    _changeCountry = (country) => {
        this.setState({country});
        this._textInput.focus();
    };

    _renderFooter = () => {

        if (this.state.enterCode) {
            return (
                <View>
                    <Text style={styles.wrongNumberText} onPress={this._tryAgain}>
                        {Strings.wrongNumber}
                    </Text>
                </View>
            );
        }

        return (
            <View>
                <Text style={styles.disclaimerText}>{Strings.DisclaimerTextSendCodeAction}</Text>
            </View>
        );

    };

    _renderCountryPicker = () => {

        if (this.state.enterCode) {
            return (
                <View/>
            );
        }

        return (
            <CountryPicker
                closeable
                style={styles.countryPicker}
                onChange={this._changeCountry}
                cca2={this.state.country.cca2}
                styles={countryPickerCustomStyles}
                translation='eng'

                countryCode={this.state.country.cca2}
                onSelect={this._changeCountry}/>
        );

    };

    _renderCallingCode = () => {

        if (this.state.enterCode) {
            return (
                <View/>
            );
        }

        return (
            <View style={styles.callingCodeView}>
                <Text style={styles.callingCodeText}>+{this.state.country.callingCode}</Text>
            </View>
        );

    };

    render() {

        let headerText = this.state.enterCode ? Strings.WhatIsYourVerificationCode : Strings.WhatIsYourPhoneNumber;
        let buttonText = this.state.enterCode ? Strings.VerifyConfirmationCode : Strings.SendConfirmationCode;
        let textStyle = this.state.enterCode ? {
            height: 50,
            textAlign: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            fontFamily: 'Courier',
        } : {};

        return (

            <View style={styles.container}>

                <Text style={styles.header}>{headerText}</Text>

                <Form style={styles.form}>

                    <View style={{flexDirection: 'row'}}>

                        {this._renderCountryPicker()}
                        {this._renderCallingCode()}

                        <TextInput
                            ref={component => this._textInput = component}
                            name={this.state.enterCode ? 'code' : 'phoneNumber'}
                            type={'TextInput'}
                            underlineColorAndroid={'transparent'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            onChangeText={this._onChangeText}
                            placeholder={this.state.enterCode ? '_ _ _ _ _ _' : Strings.PhoneNumber}
                            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                            style={[styles.textInput, textStyle]}
                            returnKeyType='go'
                            autoFocus
                            placeholderTextColor={brandColor}
                            selectionColor={brandColor}
                            maxLength={this.state.enterCode ? MAX_LENGTH_CODE : MAX_LENGTH_NUMBER}
                            onSubmitEditing={this._getSubmitAction}/>

                    </View>

                    <TouchableOpacity style={styles.button} onPress={this._getSubmitAction}>
                        <Text style={styles.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>

                    {this._renderFooter()}

                </Form>

                <Spinner
                    visible={this.state.spinner}
                    textContent={Strings.WaitMoment}
                    textStyle={{color: Colors.PRIMARY}}/>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    countryPicker: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    header: {
        textAlign: 'center',
        marginTop: 60,
        fontSize: 22,
        margin: 20,
        color: '#4A4A4A',
    },
    form: {
        margin: 20,
    },
    textInput: {
        padding: 0,
        margin: 0,
        flex: 1,
        fontSize: 20,
        color: brandColor,
    },
    button: {
        marginTop: 20,
        height: 50,
        backgroundColor: brandColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 16,
        fontWeight: 'bold',
    },
    wrongNumberText: {
        margin: 10,
        fontSize: 14,
        textAlign: 'center',
    },
    disclaimerText: {
        marginTop: 30,
        fontSize: 12,
        color: 'grey',
    },
    callingCodeView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    callingCodeText: {
        fontSize: 20,
        color: brandColor,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        paddingRight: 10,
    },
});
