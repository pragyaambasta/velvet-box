import React, { Component } from 'react';
import {Text,View,StyleSheet,ScrollView,TouchableOpacity,ActivityIndicator} from 'react-native';
import {navigate} from 'react-navigation';
import styles  from './style';
import CategoryTile from './categoryTile';
import ProductlistTile from './productlist';
import ProductDiscription from './productdescription';
import Login from './Login';
import {get} from 'lodash';
import store from './authStore';
import { NavigationActions } from 'react-navigation';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoriesList: {},
            animating: true
        };
    }
    static navigationOptions = ({navigation}) => ({
        headerStyle: {backgroundColor: '#B40C56'},
        headerTitleStyle: {color: 'white'},
        headerLeft: null,
        title: "The Velvet Box",
        headerRight: (
            <TouchableOpacity style={styles.logoutButton}
             onPress ={() => {
                console.log('!!!navigation', navigation);
                navigation.state.params.logout();
                //navigation.dispatch(NavigationActions.back({key: 'Login'}));
                navigation.dispatch({ type: 'Navigation/BACK'})
            }}>
            <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        )
    })
    
    componentDidMount() {
        this.setFirebaseListener();
        this.props.navigation.setParams({logout: this.props.screenProps.store.logout});
    }

    setFirebaseListener() {
        var categoriesRef = this.props.firebase.database().ref('categories');
        var that = this;
        categoriesRef.on('value', function(snapshot) {
            that.setState({
                categoriesList: snapshot.val(),
                animating: false
            });
        });
        
    }
    
    // logout() {
    //      this.props.screenProps.store.logout();
    //      //else{ }
    //      this.props.navigation.navigate('Home', {firebase: firebase});
    // }

    render(){
    const {navigate, navigation} = this.props.navigation;
    const categoryKeys = Object.keys(this.state.categoriesList);
    const categoryCount = categoryKeys.length;
    var that = this;
    return(
        <View style = {styles.maincontainer}>
        {
            this.state.animating
            ?
            <ActivityIndicator color = '#B40C56'
                size = "large"
                style = {styles.activityIndicator}
                animating={this.state.animating} />
            :
            null
        }
        <ScrollView>
            {
                categoryKeys.map((category, index) => {
            
                    if (index % 2 === 0) {
                        return null;
                    } else {
                            return (  
                                <View style ={styles.container1} key={index}>
                                    <CategoryTile data={this.state.categoriesList[category]} navigate={navigate} firebase={that.props.firebase}/>
                                    <CategoryTile data={this.state.categoriesList[categoryKeys[index + 1]]}  navigate={navigate} firebase={that.props.firebase}/>
                                </View>
                            );
                        
                    }
                })
            }
        
        </ScrollView>
        </View>
     
    )
}
};
export default Home;
