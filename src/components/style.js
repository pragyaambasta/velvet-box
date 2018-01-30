import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container: {
      paddingTop: 200
    } ,
    input: {
      margin: 15,
      height: 40,
      borderColor: '#B40C56',
      borderWidth: 1,
      borderRadius: 20,
      fontWeight:'bold',
      paddingLeft: 20,
    },
    submitButton: {
      backgroundColor: '#B40C56',
      padding: 10,
      margin: 15,
      height: 40,
      borderRadius: 20
    },
    logoutButton: {
      backgroundColor: '#B40C56',
      padding: 10,
      margin: 15,
      height: 40,
      borderRadius: 20
    },
    submitButtonText:{
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    forgotpassword: {
      textAlign: 'center',
      color: '#B40C56'
    },
    maincontainer: {
        flex: 2,
        justifyContent: 'space-around',
        backgroundColor: 'white',
       
    },
    container1: {
        flex: 2,
        justifyContent: 'space-around',
        flexDirection: 'row',
        margin: 5,
        position: 'relative'
    
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color:'white'
    },
    text1:{
      fontSize: 10,
      textAlign: 'center',
      margin: 10,
      color:'black'
    },
        logoutText: {
          color: 'white'  
      },
    textonimage: {
     fontSize: 20,
     textAlign:'center',
     paddingTop: 20,
     color: '#B40C56',
     //backgroundColor: 'transparent'
    },
    image: {
     width:150,
     height:150
    },
    box1: {
        width: 150,
        height: 150,
        position: 'relative'
    
    },
    box2: {
       width: 150,
       height: 'auto',
       position: 'relative'
    },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
    }
    
    });
    export default styles;