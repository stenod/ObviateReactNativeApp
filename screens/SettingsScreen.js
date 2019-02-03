import React from 'react';
import {ExpoConfigView} from '@expo/samples';
import {AmplifyButton} from "aws-amplify-react-native";
import {Button, Image, ScrollView, StyleSheet, View, Text} from 'react-native';
import {Auth} from 'aws-amplify';

export default class SettingsScreen extends React.Component {
    static navigationOptions =
        {
            title: 'Einstellungen',
            headerStyle: {
                backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        };

    logout = () => {
        Auth.signOut({global: true})
            .then(data => this.setState({logout: true}))
            .catch(err => console.log(err));

    };


    render() {
        return (
            <ScrollView>
                <View>
                    <ExpoConfigView/>
                </View>
                <Button title={"Logout"} onPress={this.logout}/>
            </ScrollView>
        )
        /* Go ahead and delete ExpoConfigView and replace it with your
         * content, we just wanted to give you a quick view of your config */

    }
}
