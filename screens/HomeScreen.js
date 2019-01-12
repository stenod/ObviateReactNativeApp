import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    View,
    Button,
    PixelRatio,
    PanResponder,
    Animated,
} from 'react-native';
import {WebBrowser} from 'expo';

import {MonoText} from '../components/StyledText';
import awsconfig from "../aws-exports";
import Analytics from '@aws-amplify/analytics';
import Modal from "react-native-modal";
import RatingScreen from "../screens/RatingScreen"



export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleAnalyticsClick = this.handleAnalyticsClick.bind(this);
        this.state = {resultHtml: <Text></Text>, eventsSent: 0,isModalVisible: false
        };
    };



    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    render() {
        return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.welcomeContainer}>
                  {/*  <Image
                        source={
                            __DEV__
                                 ? require('../assets/images/logo.png')
                                 : require('../assets/images/logo.png')
                        }
                        style={styles.welcomeImage}
                    />*/}
                </View>

                <View style={styles.card}>
                    <Image style={{}} source={require('../assets/images/purple.png')} />
                    <Button color="#000" title="Stimmung" style={styles.bold} onPress={this._toggleModal}/>
                </View>

                <View style={styles.card}>
                    <Image source={require('../assets/images/yellow.png')} />
                    <Button color="#000" title="Aktivität" style={styles.bold} onPress={this._toggleModal}/>
                </View>

                <View style={styles.card}>
                    <Image source={require('../assets/images/pink.png')} />
                    <Button color="#000" title="Schlaf" style={styles.bold} onPress={this._toggleModal}/>
                </View>

                <View style={styles.card}>
                    <Image source={require('../assets/images/orange.png')} />
                    <Button color="#000" title="Stresspegel" style={styles.bold} onPress={this._toggleModal}/>
                </View>


                <View style={{ flex: 1 }}>
                    <View style={styles.analyticsContainer}>
                    <Button title="Stimmung tracken" onPress={this._toggleModal}/>
                    </View>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{ flex: 1 }}>
                            <RatingScreen/>
                            <Button title={"Absenden"} onPress={this._toggleModal}>
                            </Button>
                        </View>
                    </Modal>
                </View>

                <View style={styles.analyticsContainer}>
                    <Text>Welcome to your React Native App with Amplify!</Text>
                    <Button title="Generate Analytics Event" onPress={this.handleAnalyticsClick}/>
                    {this.state.resultHtml}
                </View>

                <View style={styles.getStartedContainer}>
                    {this._maybeRenderDevelopmentModeWarning()}

                    <Text style={styles.getStartedText}>Get started by opening</Text>

                    <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                        <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
                    </View>

                    <Text style={styles.getStartedText}>
                        Healthy Me macht voll Spaß
                    </Text>
                </View>

                <View style={styles.helpContainer}>
                    <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
                        <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.tabBarInfoContainer}>
                <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

                <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
                    <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
                </View>
            </View>
        </View>
        )};

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
                    Learn more
                </Text>
            );

            return (
                <Text style={styles.developmentModeText}>
                    Development mode is enabled, your app will be slower but you can use useful development
                    tools. {learnMoreButton}
                </Text>
            );
        } else {
            return (
                <Text style={styles.developmentModeText}>
                    You are not in development mode, your app will run at full speed.
                </Text>
            );
        }
    }

    _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    };

    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
            'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
        );
    };

    handleAnalyticsClick() {
        Analytics.record('AWS Amplify Tutorial Event')
            .then((evt) => {
                const url = 'https://console.aws.amazon.com/pinpoint/home/?region=us-east-1#/apps/' + awsconfig.aws_mobile_analytics_app_id + '/analytics/events';
                let result = (
                    <View>
                        <Text>Event Submitted.</Text>
                        <Text>Events sent: {++this.state.eventsSent}</Text>
                        <Text style={styles.link} onPress={() => Linking.openURL(url)}>
                            View Events on the Amazon Pinpoint Console
                        </Text>
                    </View>
                );
                this.setState({
                    'resultHtml': result
                });
            });
    };
}

const size = 42;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    analyticsContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    link: {
        color: 'blue'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 20,
        borderColor: '#000',
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
        fontWeight: 'bold'
    },
    bold: {
        fontWeight: 'bold',
        color: '#000',
    }
});
