import React from 'react';
import LocalizedStrings from 'react-native-localization';

const Strings = new LocalizedStrings({
    en: {
        //Header
        Home: 'Home',

        WhatIsYourVerificationCode :"What's your verification code",
        WhatIsYourPhoneNumber :"What's your phone number",

        VerificationCode: 'verification code',
        PhoneNumber: 'phone number',

        SendConfirmationCode: 'Send confirmation code',
        VerifyConfirmationCode: 'Verify confirmation code',

        Sent: 'Sent',
        CodeSent: 'We\'ve sent you a verification code',

        SuccessfullyVerifiedPhoneNumber: 'You have successfully verified your phone number',
        WaitMoment: 'Wait one moment,plz...',

        DisclaimerTextSendCodeAction: 'By tapping "Send confirmation code" above, we will send you an SMS to confirm your phone number. Message &amp; data rates may apply.',
        wrongNumber: 'Enter the wrong number or need a new code?',

        //Alerts
        Success:"Success"
    },
    fr: {
        //Header
        Home: 'Accueil',

        VerificationCode: 'code de vérification',
        PhoneNumber: 'numéro de téléphone',

        SendConfirmationCode: 'Envoyer le code de confirmation',
        VerifyConfirmationCode: 'Vérifier le code de confirmation',

        Sent: 'Envoyé',
        CodeSent: 'Nous vous avons envoyé un code de vérification',

        SuccessfullyVerifiedPhoneNumber: 'Vous avez correctement vérifié votre numéro de téléphone',
        WaitMoment: 'Svp, Attendez un instant....',

        DisclaimerTextSendCodeAction: 'En appuyant sur "Envoyer le code de confirmation" ci-dessus, nous vous enverrons un SMS pour confirmer votre numéro de téléphone. Des tarifs de données de message peuvent s\'appliquer',
        wrongNumber: 'Saisissez le mauvais numéro ou avez besoin d\'un nouveau code?',

        //Alerts
        Success:"Succès"
    },
    ar: {},
});

module.exports = Strings;
