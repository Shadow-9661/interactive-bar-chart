import React,{Component} from "react";
import { View ,Text,StyleSheet, SafeAreaView, Animated} from "react-native";
import { PanGestureHandler, TouchableOpacity, State as gestureState} from 'react-native-gesture-handler';


const data = [20,30,40,50,60,70,80,90,70,60,50,40,30,20,10,0,5,10,15];
const STEP = 15;

export default class Graph3 extends React.Component{
    translateX = new Animated.Value(0);
    lastOffset = { x: 0 };
    constructor(props,state){
        super(props,state);
        this.state = {
            selectedIndex:0,
            x:500
        }
    }
    onGestureEvent = Animated.event(
        [
          {
            nativeEvent: {
              translationX: this.translateX
            }
          }
        ],
        { useNativeDriver: true }
      );

    onHandlerStateChange = (event) => {
        if(event.nativeEvent.oldState === gestureState.ACTIVE){
            this.lastOffset.x += event.nativeEvent.translationX;
            const newOffset = this.lastOffset.x + event.nativeEvent.translationX;
            if (newOffset < 0) {
                this.lastOffset.x = 0;
            }else if(newOffset > this.state.x){
                this.lastOffset.x = this.state.x;
            }
            this.translateX.setOffset(this.lastOffset.x);
            this.translateX.setValue(0);
            this.setState({
                selectedIndex:Math.floor(Math.abs(this.lastOffset.x) / STEP)
            })
        }
      };

      updateSelectedIndex = (index) => {
        if(index != this.state.selectedIndex){
            this.setState({
                selectedIndex:index
            });
          }
      }
    
      handleOnPress = (index) => {
          this.lastOffset.x = index * STEP;
          this.translateX.setOffset(this.lastOffset.x);
          this.translateX.setValue(0);
          this.updateSelectedIndex(index);
      };

    render(){
        const xBoundary = this.translateX.interpolate({
            inputRange:[0,this.state.x],
            outputRange:[0,this.state.x],
            extrapolate:'clamp'
        })
        const translateX = Animated.add(Animated.subtract(xBoundary, Animated.modulo(xBoundary, STEP)), STEP / 2);
        
        return(
            <SafeAreaView style={styles.container}>
                <View style={{marginBottom:40,alignSelf:"flex-end"}}><Text style={{color:"#0ad15d"}}>{`Value : ${data[this.state.selectedIndex]}`}</Text></View>
                
                <View style={styles.graphContainer} onLayout={(event)=>{this.setState({x:event.nativeEvent.layout.width-STEP})}}>
                    {data.map((value,index)=>(
                        <TouchableOpacity key={index} onPress={this.handleOnPress.bind(this,index)}style={styles.bar}>
                            <View style={[{height:data[index]},styles.value]}/>
                        </TouchableOpacity>
                    ))}
                    <PanGestureHandler onGestureEvent={this.onGestureEvent} onHandlerStateChange={this.onHandlerStateChange}>
                        <Animated.View style={[{transform:[{translateX}]},styles.selectorContainer]}>
                            <View style={styles.selector}>
                                <View style={styles.topEndRing} />
                                <View style={styles.bottomEndRing} />
                            </View>
                        </Animated.View>
                    </PanGestureHandler>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    selectorContainer:{
        zIndex:2,
        alignSelf: "center",
        width: 20,
        height: 120,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        right: 10,
        position:"absolute",
        bottom:-15,
        left:-14
    },
    selector:{
        alignSelf: "center",
        width: 1,
        height: 120,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        backgroundColor: "black"
    },
    topEndRing:{
        borderColor: "black",
        borderWidth: 1,
        width: 6,
        height: 6,
        alignSelf: "center",
        position: "absolute",
        top: -6,
        borderRadius: 6
    },
    bottomEndRing:{
        borderColor: "black",
        borderWidth: 1,
        width: 6,
        height: 6,
        alignSelf: "center",
        position: "absolute",
        bottom: -6,
        borderRadius: 6
    },
    container:{
        display: "flex",
        flexWrap: "nowrap"
    },
    graphContainer:{
        flexDirection: "row"
    },
    bar:{
        zIndex: 1,
        width: 8,
        height: 100,
        backgroundColor: "#F8F9FA",
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,justifyContent: "center",
        marginRight: 7
    },
    value:{
        zIndex: 1,
        width: 8,
        position: "absolute",
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        bottom: 0,
        backgroundColor: "#03d7fc",
    }
});
