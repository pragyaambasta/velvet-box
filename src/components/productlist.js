import React, { Component } from 'react';
import {Text,View,StyleSheet,ScrollView,TouchableOpacity,ActivityIndicator} from 'react-native';
import {navigate} from 'react-navigation';
import styles  from './style';
import CategoryTile from './categoryTile';
import ProductlistTile from './productlist';
import {get} from 'lodash';
import Cart from './cart';
import * as firebase from 'firebase';

class ProducttileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsList: {},
            animating: true
        };
    }
    static navigationOptions = ({navigation}) => ({
        headerStyle: {backgroundColor: '#B40C56'},
        headerTitleStyle: {color: 'white'},
        title: "The Velvet Box",
        headerRight: (
            <TouchableOpacity style={styles.logoutButton}
             onPress ={() => {
              navigation.navigate('Cart', {firebase: firebase})   
            }}>
            <Text style={styles.logoutText}>Cart</Text>
            </TouchableOpacity>
        )
    })
    componentDidMount() {
        this.setFirebaseListener();
    }

    setFirebaseListener() {
    
        var productsRef = this.props.firebase.database().ref(this.props.category);
        var that = this;
        productsRef.on('value', function(snapshot) {
            that.setState({
                productsList: snapshot.val(),
                animating: false
            });
        });
        
        
    }
    render(){
        console.log('product list', this.props);
    const {navigate, navigation} = this.props.navigation;
    //console.log('render function', this.state.categoriesList);
    const categoryKeys = Object.keys(this.state.productsList);
    const categoryCount = categoryKeys.length;
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
                    console.log('iterating products', index, categoryCount);
                    if (index % 2 === 1) {
                        return null;
                    } else {
                            return (
                                <View style ={styles.container1} key={index}>
                                    <CategoryTile data={this.state.productsList[category]} navigate={navigate} type={'productDescription'} />
                                    <CategoryTile data={this.state.productsList[categoryKeys[index + 1]]}  navigate={navigate} type={'productDescription'} />
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
export default ProducttileList;
