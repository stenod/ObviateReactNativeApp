import React from 'react';
import {PixelRatio, StyleSheet, Text, View, PanResponder, Animated, TouchableOpacity, Button} from 'react-native';
import {createActivity} from "../src/graphql/mutations";
import {API, Auth, graphqlOperation} from 'aws-amplify';
import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';

Amplify.configure(aws_exports);

const REACTIONS = [
    {
        label: "Worried",
        src: require('../assets/images/worried.png'),
        bigSrc: require('../assets/images/worried_big.png')
    },
    {label: "Sad", src: require('../assets/images/sad.png'), bigSrc: require('../assets/images/sad_big.png')},
    {
        label: "Strong",
        src: require('../assets/images/ambitious.png'),
        bigSrc: require('../assets/images/ambitious_big.png')
    },
    {label: "Happy", src: require('../assets/images/smile.png'), bigSrc: require('../assets/images/smile_big.png')},
    {
        label: "Surprised",
        src: require('../assets/images/surprised.png'),
        bigSrc: require('../assets/images/surprised_big.png')
    },
];


const WIDTH = 320;
const DISTANCE =  WIDTH / REACTIONS.length;
const END = WIDTH - DISTANCE;

export default class MoodRatingModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({value: 2});
        let userData = null;
        Auth.currentUserInfo().then(user => userData = user)
            .catch(err => console.log(err)).finally(() =>
            this.state = {user: userData});
        this._pan = new Animated.Value(2 * DISTANCE);
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {
                this._pan.setOffset(this._pan._value);
                this._pan.setValue(0);
            },
            onPanResponderMove: Animated.event([null, {dx: this._pan}]),
            onPanResponderRelease: () => {
                this._pan.flattenOffset();

                let offset = Math.max(0, this._pan._value + 0);
                if (offset < 0) return this._pan.setValue(0);
                if (offset > END) return this._pan.setValue(END);

                const modulo = offset % DISTANCE;
                offset = (modulo >= DISTANCE/2) ? (offset+(DISTANCE-modulo)) : (offset-modulo);

                this.updatePan(offset);
            }
        });
    }

    postActivity = async () => {
        const todoDetails = {
            input: {
                user: this.state.user.id,
                value: this.state.value,
            }};
        const newEvent = await API.graphql(graphqlOperation(createActivity, todoDetails));
        this.props.closeModal();
        alert(JSON.stringify(newEvent));
    };

    updatePan(toValue) {
        Animated.spring(this._pan, { toValue, friction: 7 }).start();
        let currentValue;
        switch (toValue) {
            case 0: currentValue = 0; break;
            case 64: currentValue = 1; break;
            case 128: currentValue =  2; break;
            case 192: currentValue =  3;break;
            case 265: currentValue =  4;break;
        }
        this.setState({value: currentValue})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrap}>
                    <Text style={styles.welcome}>
                        How are you feeling?
                    </Text>

                    <View style={styles.line} />

                    <View style={styles.reactions}>
                        {REACTIONS.map((reaction, idx) => {
                            const u = idx * DISTANCE;
                            let inputRange = [u-20, u, u+20];
                            let scaleOutputRange = [1, 0.25, 1];
                            let topOutputRange = [0, 10, 0];
                            let colorOutputRange = ['#999', '#ffffff', '#999'];

                            if (u-20 < 0) {
                                inputRange = [u, u+20];
                                scaleOutputRange = [0.25, 1];
                                topOutputRange = [10, 0];
                                colorOutputRange = ['#ffffff', '#999'];
                            }

                            if (u+20 > END) {
                                inputRange = [u-20, u];
                                scaleOutputRange = [1, 0.25];
                                topOutputRange = [0, 10];
                                colorOutputRange = ['#999', '#ffffff'];
                            }


                            return (
                                <TouchableOpacity onPress={() => this.updatePan(u)} activeOpacity={0.9} key={idx}>
                                    <View style={styles.smileyWrap}>
                                        <Animated.Image
                                            source={reaction.src}
                                            style={[styles.smiley, {
                                                transform: [{
                                                    scale: this._pan.interpolate({
                                                        inputRange,
                                                        outputRange: scaleOutputRange,
                                                        extrapolate: 'clamp',
                                                    })
                                                }]
                                            }]}
                                        />
                                    </View>

                                    <Animated.Text style={[styles.reactionText, {
                                        top: this._pan.interpolate({
                                            inputRange,
                                            outputRange: topOutputRange,
                                            extrapolate: 'clamp',
                                        }),
                                        color: this._pan.interpolate({
                                            inputRange,
                                            outputRange: colorOutputRange,
                                            extrapolate: 'clamp',
                                        })
                                    }]}>
                                        {reaction.label}
                                    </Animated.Text>
                                </TouchableOpacity>
                            );
                        })}
                        <Animated.View {...this._panResponder.panHandlers} style={[styles.bigSmiley, {
                            transform: [{
                                translateX: this._pan.interpolate({
                                    inputRange: [0, END],
                                    outputRange: [0, END],
                                    extrapolate: 'clamp',
                                })
                            }]
                        }]}>
                            {REACTIONS.map((reaction, idx) => {
                                let inputRange = [(idx-1)*DISTANCE, idx*DISTANCE, (idx+1)*DISTANCE];
                                let outputRange = [0, 1, 0];

                                if (idx === 0) {
                                    inputRange = [idx*DISTANCE, (idx+1)*DISTANCE];
                                    outputRange = [1, 0];
                                }

                                if (idx === REACTIONS.length - 1) {
                                    inputRange = [(idx-1)*DISTANCE, idx*DISTANCE];
                                    outputRange = [0, 1];
                                }
                                return (
                                    <Animated.Image
                                        key={idx}
                                        source={reaction.bigSrc}
                                        style={[styles.bigSmileyImage, {
                                            opacity: this._pan.interpolate({
                                                inputRange,
                                                outputRange,
                                                extrapolate: 'clamp',
                                            })
                                        }]}
                                    />
                                );
                            })}
                        </Animated.View>
                    </View>
                </View>
                <Button title={"Absenden"} onPress={this.postActivity}>
                </Button>
            </View>
        );
    }
}

const size = 42;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    wrap: {
        width: WIDTH,
        marginBottom: 50,
    },
    welcome: {
        fontSize: 18,
        textAlign: 'center',
        color: '#777',
        fontWeight: '600',
        fontFamily: 'space-mono',
        marginBottom: 50,
    },
    reactions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
    },
    smileyWrap: {
        width: DISTANCE,
        height: DISTANCE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    smiley: {
        width: size,
        height: size,
        borderRadius: size/2,
        backgroundColor: '#c7ced3',
    },
    bigSmiley: {
        width: DISTANCE,
        height: DISTANCE,
        borderRadius: DISTANCE/2,
        backgroundColor: '#ffb18d',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    bigSmileyImage: {
        width: DISTANCE,
        height: DISTANCE,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    reactionText: {
        fontSize: 12,
        textAlign: 'center',
        color: '#999',
        fontWeight: '400',
        fontFamily: 'space-mono',
        marginTop: 5,
    },
    line: {
        height: 4 / PixelRatio.get(),
        backgroundColor: '#eee',
        width: WIDTH - (DISTANCE-size),
        left: (DISTANCE-size) / 2,
        top: DISTANCE/2 + (2 / PixelRatio.get()),
    }
});
