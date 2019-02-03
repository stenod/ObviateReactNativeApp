import React from 'react';
import {Button, Image, ScrollView, StyleSheet, View} from 'react-native';
import {ExpoLinksView} from '@expo/samples';
import {API, Auth} from "aws-amplify";

export default class LinksScreen extends React.Component {
    static navigationOptions = {
        title: 'Auswertung',
        headerStyle: {
            backgroundColor: 'black',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props) {
        super(props);
        let userData = null;
        Auth.currentUserInfo().then(user => userData = user)
            .catch(err => console.log(err)).finally(function () {
                this.state = {user: userData};
                console.log(this.state);
        });
    }



    render() {
        return (
            <ScrollView style={styles.container}>
                {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
                <View style={styles.card}>
                    <View style={{marginLeft: 15, alignSelf: 'flex-start'}}>
                        <Image style={{width: 50, height: 50, resizeMode: 'contain', alignSelf: 'stretch'}} source={require('../assets/images/purple.png')} />
                    </View>
                    <View style={{ width: 120, alignSelf: 'flex-start'}}>
                        {/*<Button color="#000" title="Stimmung" style={styles.bold} onPress={}/>*/}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#000',
    },
});
