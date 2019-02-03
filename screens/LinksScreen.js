import React from 'react';
import {Button, Image, ScrollView, StyleSheet, View, Text} from 'react-native';
import {ExpoLinksView} from '@expo/samples';
import {API, Auth} from "aws-amplify";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
const screenWidth = Dimensions.get('window').width


const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        data: [ 20, 45, 28, 80, 99, 43 ],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
    }]
};

const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
};

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
                <View>
                    <Text>
                        Bezier Line Chart
                    </Text>
                    <LineChart
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                            datasets: [{
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
                            }]
                        }}
                        width={Dimensions.get('window').width} // from react-native
                        height={220}
                        chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>
                <View>
                    <LineChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
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
});
