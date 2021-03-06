import React from 'react';
import {Button, Image, ScrollView, StyleSheet, View, Text, Platform} from 'react-native';
import Amplify, {API, Auth, graphqlOperation} from "aws-amplify";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'
import {Dimensions} from 'react-native'
import {listMoods} from "../src/graphql/queries";
import awsconfig from "../aws-exports";
import { Pedometer } from "expo";

Amplify.configure(awsconfig);


const screenWidth = Dimensions.get('window').width;


const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
    }]
};

const chartConfig = {
    backgroundColor: '#9013fe',
    backgroundGradientFrom: '#ff7888',
    backgroundGradientTo: '#ff7888',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    }
};

const style = {
    marginVertical: 8,
        borderRadius: 16
};

// each value represents a goal ring in Progress chart
let dataProgress = [0.4];

const commitsData = [
    {date: '2019-01-25', count: 1},
    {date: '2019-01-26', count: 2},
    {date: '2019-01-27', count: 3},
    {date: '2019-01-28', count: 4},
    {date: '2019-01-29', count: 5},
    {date: '2019-01-30', count: 2},
    {date: '2019-01-31', count: 3},
    {date: '2019-02-01', count: 2},
    {date: '2019-02-02', count: 4},
    {date: '2019-02-03', count: 2},
    {date: '2019-02-04', count: 4}
];

const dataPie = [
    { name: 'Stimmung', population: 21500000, color: '#A0B5FF', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Aktivität', population: 2800000, color: '#EFDB00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Schlaf', population: 527612, color: '#D772FF', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Stress', population: 8538000, color: '#F5795A', legendFontColor: '#7F7F7F', legendFontSize: 15 },
]

const last = commitsData => commitsData[commitsData.length - 1];


let allTodos = null;

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

    state = {
        isPedometerAvailable: "checking",
        pastStepCount: 0,
        currentStepCount: 0
    };

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({
                currentStepCount: result.steps,
        });
            dataProgress = [10000/result.steps]
        });

        Pedometer.isAvailableAsync().then(
            result => {
                this.setState({
                    isPedometerAvailable: String(result)
                });
            },
            error => {
                this.setState({
                    isPedometerAvailable: "Could not get isPedometerAvailable: " + error
                });
            }
        );

        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);
        Pedometer.getStepCountAsync(start, end).then(
            result => {
                this.setState({ pastStepCount: result.steps });
            },
            error => {
                this.setState({
                    pastStepCount: "Could not get stepCount: " + error
                });
            }
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    componentDidMount() {
        let id;
        Auth.currentUserInfo().then(user => id = user.id)
            .catch(err => console.log(err)).finally(async function () {
            const filter =
                {
                    filter: {
                        user: {contains: id},

                    }
                };
            allTodos = await API.graphql(graphqlOperation(listMoods, filter)).catch(err => console.log(err));
            allTodos.data.listMoods.items.forEach(function (currentValue) {
                console.log(JSON.stringify(currentValue.value));
                last(commitsData).count = last(commitsData).count + 1
            });
        });
        this._subscribe();
    };


    render() {
        return (
            <ScrollView style={styles.container}>
                {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
           <View>
               <Text style={styles.tabBarInfoText}>Stimmung</Text>
                            <LineChart
                                data={{
                                    labels: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'],
                                    datasets: [{
                                        data: [
                                            //allTodos.data.listMoods.items[0].value,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                        ]
                                    }]
                                }}
                                width={Dimensions.get('window').width} // from react-native
                                height={220}
                                chartConfig={{
                                    backgroundColor: '#ffffff',
                                    backgroundGradientFrom: '#ffffff',
                                    backgroundGradientTo: '#ffffff',
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(160, 181, 255)`,
                                    style: {
                                        borderRadius: 16
                                    }}}
                                bezier
                                style={style}
                            />
                        </View>
                <View>
                    <Text style={styles.tabBarInfoText}>Aktivität</Text>
                    <LineChart
                        data={{
                            labels: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'],
                            datasets: [{
                                data: [
                                    //allTodos.data.listMoods.items[0].value,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                ]
                            }]
                        }}
                        width={Dimensions.get('window').width} // from react-native
                        height={220}
                        chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(239, 219, 0)`,
                        style: {
                        borderRadius: 16
                    }}}
                        bezier
                        style={style}
                    />
                </View>
                <View>
                    <Text style={styles.tabBarInfoText}>Schlaf</Text>
                    <LineChart
                        data={{
                            labels: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'],
                            datasets: [{
                                data: [
                                    //allTodos.data.listMoods.items[0].value,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                ]
                            }]
                        }}
                        width={Dimensions.get('window').width} // from react-native
                        height={220}
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(215, 114, 255)`,
                            style: {
                                borderRadius: 16
                            }}}
                        bezier
                        style={style}
                    />
                </View>
                <View>
                    <Text style={styles.tabBarInfoText}>Stresspegel</Text>
                    <LineChart
                        data={{
                            labels: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'],
                            datasets: [{
                                data: [
                                    //allTodos.data.listMoods.items[0].value,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                ]
                            }]
                        }}
                        width={Dimensions.get('window').width} // from react-native
                        height={220}
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 120, 136)`,
                            style: {
                                borderRadius: 16
                            }}}
                        bezier
                        style={style}
                    />
                </View>
                <View>
                    <Text style={styles.tabBarInfoText}>Aktivität</Text>
                    <PieChart
                        data={dataPie}
                        width={screenWidth}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(239, 219, 0)`,
                            style: {
                                borderRadius: 16
                            }}}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                    />
                </View>

                {/*<View>*/}
                    {/*<LineChart*/}
                        {/*data={data}*/}
                        {/*width={screenWidth}*/}
                        {/*height={220}*/}
                        {/*chartConfig={chartConfig}*/}
                        {/*bezier*/}
                        {/*style={style}*/}
                    {/*/>*/}
                {/*</View>*/}
                <View>
                    <Text style={styles.tabBarInfoText}>Schrittmeter {this.state.pastStepCount} von 10000</Text>
                    <ProgressChart
                        data={dataProgress}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        style={style}
                    />
                </View>
                <View>
                    <Text style={styles.tabBarInfoText}>Trackzähler</Text>
                    <ContributionGraph
                        values={commitsData}
                        endDate={new Date('2019-02-04')}
                        numDays={60}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        style={style}
                    />
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
    developmentModeText: {
        marginBottom: 20,
        color: '#fff',
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
        color: '#fff',
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
        fontWeight: 'bold',
        flexDirection: "row",
        flex: 1,
        textAlignVertical: 'center',
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    bold: {
        fontWeight: 'bold',
        color: '#000',
        textAlignVertical: 'center',
    }
});
