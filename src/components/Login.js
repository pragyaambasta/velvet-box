import React, { Component } from 'react';
import {Text,View,TextInput,TouchableOpacity,Alert,StyleSheet,ScrollView, AsyncStorage} from 'react-native';
import {navigate} from 'react-navigation';
//import {GoogleSignin} from 'react-native-google-signin';
import Home from './Home';
import {firebaseConfig} from '../components/config';
import * as firebase from 'firebase';
import styles  from './style';
import {observer, inject} from 'mobx-react';
import {extendObservable,observable,computed,action} from 'mobx';
import store from './authStore';

firebase.initializeApp(firebaseConfig);

export default observer(
 class Login extends Component{
    constructor(props) {
        super(props);
        this.state ={
            email:'',
            password:'' 
        }
    }
    

    static navigationOptions = {
        headerStyle: {backgroundColor: '#B40C56'},
        headerTitleStyle: {color: 'white'},
        title: "The Velvet Box",
        
    }

    componentWillMount() {
        if (store.storeReady && store.getEmail() !== '') {
            this.props.navigation.navigate('Home', {firebase: firebase});
        }
    }

    handleEmail = (text) => {
        this.setState({email:text})
    }

    handlePassword = (text) => {
        this.setState({password:text})
    }

    render(){
        
        CheckTextInputIsEmptyOrNot = () =>{
            this.isAuthenticating = true
            const {email} = this.state;
            const {password} = this.state;
            const {store} = this.props.screenProps;
            if (email.trim() == ''|| password.trim() == '') {
                Alert.alert("please enter all the values.");
            }
            else {
                var that = this;
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                firebase.auth().signInWithEmailAndPassword(email,password)
                .then((responseData) => {
                    store.setEmail(email);
                    that.setState({email: '', password: ''});
                    // this.props.navigation.navigate('Home', {firebase: firebase})
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
            }
        }
        
        googlesignin = () =>{
            //console.log('googlesignin');
            //   var provider = new firebase.auth.GoogleAuthProvider();
            // firebase.auth().signInWithRedirect(provider);
            // firebase.auth().getRedirectResult().then(function(result){
            //    var token = result.credential.accessToken;
            //    currentUser = result.user;
            //      console.log(token);
            //})

        }
        if (this.props.screenProps.store.storeReady && this.state.email === '') {
            if (this.props.screenProps.store.getEmail() !== '') {
                this.props.navigation.navigate('Home', {firebase: firebase});
            }
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <TextInput style = {styles.input}
                        placeholder = "Email"
                        placeholderTextColor = "#B40C56"
                        autocapitalize = "none"
                        onChangeText ={this.handleEmail}
                        value={this.state.email}/>

                    <View>
                        <Text>{this.props.test}</Text>
                    </View>
                
                    <TextInput style = {styles.input}
                        placeholder = "Password"
                        placeholderTextColor = "#B40C56"
                        secureTextEntry
                        autocapitalize = "none"
                        onChangeText ={this.handlePassword}
                        value={this.state.password}/>

                    <TouchableOpacity
                        style = {styles.submitButton}
                        onPress = {() =>CheckTextInputIsEmptyOrNot()}
                    >
                        <Text style ={styles.submitButtonText}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity = {0.5}>
                        <Text style ={styles.forgotpassword}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress = {() => googlesignin()}
                        style ={styles.submitButton}
                    >
                        <Text style ={styles.submitButtonText}>Sign In with Google</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

});
//export default Login;
