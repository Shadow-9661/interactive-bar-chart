import React from 'react';
import {View,Animated,StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';

export default class AnimatedBall extends React.Component{
    translateX = new Animated.Value(0);
    translateY = new Animated.Value(0);
   
    onGestureEvent = Animated.event([{
        nativeEvent:{
          translationX:this.translateX,
          translationY:this.translateY
        }
      }],{useNativeDriver:true})

    render(){
        return(
            <View style={styles.container}>
                <PanGestureHandler onGestureEvent={this.onGestureEvent}>
                    <Animated.View style={[{transform:[{translateX:this.translateX},{translateY:this.translateY}]},styles.ball]}/>
                </PanGestureHandler>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignContent:"center",
        flex:1
    },
    ball:{
        height:64,
        width:64,
        borderRadius:32,
        backgroundColor:"#4b3294"
    }
});
