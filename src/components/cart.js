import React, { Component } from 'react';
import {Text,View,StyleSheet,ScrollView,TouchableOpacity,Image} from 'react-native';
import {navigate} from 'react-navigation';
import styles  from './style';
import store from './authStore';
import CategoryTile from './categoryTile';
import * as firebase from 'firebase';

class Cart extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        headerStyle: {backgroundColor: '#B40C56'},
        headerTitleStyle: {color: 'white'},
        headerBackTitleStyle: {color:'white'},
        headerTintColor:'white',
        title: "The Velvet Box",
    }
    render(){
        console.log('!!!!',store, store.getCart());
        let cartItems = store.getCart();
        return(
            <View style = {styles.maincontainer}>
              <ScrollView>
                {
                    cartItems.map((item, index) => {
                        return (
                            <CategoryTile data={item} navigate={navigate} type={'productDescription'} showPrice={true}/>
                        );
                    })
                }
                <Text style = {{position: 'relative', right: 150,left: 150 , marginVertical: 10,color: "#B40C56"}}>{'Total: Rs ' + store.getTotal()}</Text>
              </ScrollView>
            </View>

        )
    }
}
export default Cart;