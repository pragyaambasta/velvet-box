import React, { Component } from 'react';
import {Text,View,StyleSheet,ScrollView,TouchableOpacity,Image} from 'react-native';
import {navigate} from 'react-navigation';
import styles  from './style';
import {get} from 'lodash';
import store from './authStore';
import Cart from './cart';
import * as firebase from 'firebase';

class ProductDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ringDiscription: {}
        };
      console.log('%%%%%',store);
      this.addtoCart = this.addtoCart.bind(this);
    }
    static navigationOptions = {
        headerStyle: {backgroundColor: '#B40C56'},
        headerTitleStyle: {color: 'white'},
        headerBackTitleStyle: {color:'white'},
        headerTintColor:'white',
        title: "The Velvet Box",
    }

    addtoCart(){
        console.log('*****',store);
        store.addCart(this.props.product
            // this.props.product.name,
            // this.props.product.imageUrl,
            // this.props.product.price,
            // this.props.product.category,
            // this.props.product.description,
        );
        this.props.navigation.navigate('Cart', {firebase: firebase})
        
    }

    render(){
    
    //console.log('description screen', this.props);
    return(
        
        <View style = {styles.maincontainer}>
        <ScrollView>
            <View>
            <Text style ={styles.textonimage}>{this.props.product.name}</Text>
            <Image style ={{width:400,height:400}}
                source ={{uri: this.props.product.imageUrl}}/>
            <Text style ={styles.textonimage}>Price: Rs {this.props.product.price}</Text>
            <Text style = {styles.textonimage}>{this.props.product.category}</Text>
            <Text style ={styles.textonimage}>{this.props.product.description}</Text>
            <TouchableOpacity activeOpacity = {0.5}
            style = {styles.submitButton}
            onPress = {this.addtoCart}>
            <Text style = {styles.submitButtonText}>Add to Cart</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
     
    )
}
};
export default ProductDescription;
