import React from 'react';
import {View,Text, StyleSheet} from 'react-native';
import AnimatedBall from './src/AnimatedBall';
import Graph3 from './src/BarGraph';

export default class App extends React.Component{
  render(){
    return (
      <View style={styles.content}>
        <View style={styles.header}><Text style={styles.headerText}>{"React Native Gesture Handler"}</Text></View>
        <View style={styles.container1}>
          <Graph3/>
        </View>
        <View style={styles.container2}>
          <AnimatedBall/>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  content:{
    justifyContent:"center",
    alignItems:"center",
    flex:1
  },
  header:{
    height:100,
    borderBottomWidth:0.33,
    borderBottomColor:"#ccc",
    paddingTop:50,
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  container1:{
    height:300,
    width:"100%",
    borderBottomWidth:0.5,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white"
  },
  container2:{
    flex:1,
    backgroundColor:"#f0fcf2",
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  headerText:{
    fontSize:18,
    fontWeight:"500"}
});
