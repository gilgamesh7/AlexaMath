'use strict';

//import ask-sdk-core
const Alexa = require('ask-sdk-core');

//skill name
const appName = 'Clever Maya';

//code for the handlers
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        //welcome message
        let speechText = 'Hi ! I am Clever Maya ! I am the cleverest girl in the world!';
        //welcome screen message
        let displayText = "Hi ! I am Clever Maya !";
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, displayText)
            .getResponse();
    }
};

//implement custom handlers

const AddIntentHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
                handlerInput.requestEnvelope.request.intent.name === 'AddIntent';
    },
    handle(handlerInput){
        let speechText='';
        let displayText='';

        let intent=handlerInput.requestEnvelope.request.intent;
        let firstNumber=intent.slots.firstNumber.value;
        let secondNumber=intent.slots.secondNumber.value;

        if (firstNumber && secondNumber){
            // Perform operation
            let addResult = parseInt(firstNumber,10) + parseInt(secondNumber,10);
            speechText='Clever Maya says' + firstNumber + ' plus ' +  secondNumber +  ' is ' + addResult;
            displayText= '${addResult}';

            return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(appName,displayText)
            .withShouldEndSession(true)
            .getResponse();

        }else{
            // Ask for required input
            return handlerInput.responseBuilder
                    .addDelegateDirective(intent)
                    .getResponse();
        }


    }
};

const SubtractIntentHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
               handlerInput.requestEnvelope.request.intent.name === 'SubtractIntent';
    },
    handle(handlerInput){
        let speechText = '';
        let displayText = '';

        let intent=handlerInput.requestEnvelope.request.intent;
        let firstNumber = intent.slots.firstNumber.value;
        let secondNumber = intent.slots.secondNumber.value;

        if (firstNumber && secondNumber){
            let result = parseInt(secondNumber,10) - parseInt(firstNumber,10);
            speechText = 'Clever Maya says ' + secondNumber + ' minus ' + firstNumber + ' is ' + result;
            displayText = '${result}';

            return handlerInput.responseBuilder
                    .speak(speechText)
                    .withSimpleCard(appName,displayText)
                    .withShouldEndSession(true)
                    .getResponse();
        }else{
            return handlerInput.responseBuilder
                    .addDelegateDirective(intent)
                    .getResponse();
        }
    }
};

const MultiplyIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'MultiplyIntent';
    },
    handle(handlerInput){
        let intent=handlerInput.requestEnvelope.request.intent;
        let firstNumber=intent.slots.firstNumber.value;
        let secondNumber=intent.slots.secondNumber.value;

        if (firstNumber && secondNumber){
            let result = parseInt(firstNumber,10) * parseInt(secondNumber,10);
            let speechText=`Clever Maya says ${firstNumber} multiplied by ${secondNumber} is ${result}`;
            let displayText=`${result}`;

            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(appName,displayText)
                .withShouldEndSession(true)
                .getResponse();
        }else {
            return handlerInput.responseBuilder
                .addDelegateDirective(intent)
                .getResponse();
        }
    }
};

const DivisionIntentHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'DivisionIntent';
    },
    handle(handlerInput){
        let intent=handlerInput.requestEnvelope.request.intent;
        let firstNumber = intent.slots.firstNumber.value;
        let secondNumber = intent.slots.secondNumber.value;
        
        if (firstNumber && secondNumber){
            let result = parseInt(firstNumber,10) / parseInt(secondNumber,10);
            let speechText=`Clever Maya says ${firstNumber} divided by ${secondNumber} is ${result}`;
            let displayText=`${result}`;

            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(appName,displayText)
                .withShouldEndSession(true)
                .getResponse();
        }else{
            return handlerInput.responseBuilder
                .addDelegateDirective(intent)
                .getResponse();
        }
    }
};

const SqrtIntentHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'SqrtIntent';
    },
    handle(handlerInput){
        let intent = handlerInput.requestEnvelope.request.intent;
        let myNumber = intent.slots.myNumber.value;

        if (myNumber){
            let result = Math.sqrt(parseInt(myNumber,10));
            let speechText = `Clever Maya says that the square root of ${myNumber} is ${result}`;
            let displayText = `${result}`;

            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(appName,displayText)
                .withShouldEndSession(true)
                .getResponse();
        }else{
            return handlerInput.responseBuilder
                .addDelegateDirective(intent)
                .getResponse();
        }
    }
};

//end Custom handlers

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        //help text for your skill
        let speechText = 'You can say add 3 and 5 or subtract 6 from 12';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        let speechText = 'I am Clever maya and I say Goodbye';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

//Lambda handler function
//Remember to add custom request handlers here
exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
                         AddIntentHandler,
                         SubtractIntentHandler,
                         MultiplyIntentHandler,
                         DivisionIntentHandler,
                         SqrtIntentHandler,
                         HelpIntentHandler,
                         CancelAndStopIntentHandler,
                         SessionEndedRequestHandler).lambda();
