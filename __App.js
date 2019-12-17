import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Header from './Header';
import Frisbee from 'frisbee';
import Spinner from 'react-native-loading-spinner-overlay';
import Form from 'react-native-form';
import CountryPicker from 'react-native-country-picker-modal';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enterCode: false,
      spinner: false,
      country: {
        cca2: 'US',
        callingCode: '1',
      },
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Main Header" />
      </View>
    );
  }
}
/*
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
*/
