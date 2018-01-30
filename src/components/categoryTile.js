import React, { Component } from 'react';
import {Text,View,StyleSheet,ScrollView,TouchableOpacity,Image,Alert} from 'react-native';
import {navigate} from 'react-navigation';
import styles  from './style';


const CategoryTile = (props) => {
    // const {navigate} = props.navigation;
    
    //console.log('tile', props);
     
    return(
        <TouchableOpacity accessible = {true}
            onPress = { () => {
               //console.log('navigate away', props); 
                if (props.type === 'productDescription') {
                    props.navigate('ProductDescription', {product: props.data});
                } 
                else{
                    props.navigate('ProductlistTile', {category: props.data.nodeName, firebase: props.firebase});
                }
        
            
        
            }}>
            {
                !props.data
                ?
                <View style ={styles.box2} />
                :
                <View style ={styles.maincontainer}>
                    <View style ={styles.box2}>
                        <Text style ={styles.textonimage}>{props.data.name}</Text>
                        <Image style ={styles.image}
                            source ={{uri: props.data.imageUrl}}/>
                    </View>
                    {
                        props.showPrice
                        ?
                        <View style={{position: 'relative', width: '100%', minHeight: 40, verticalAlign: 'middle'}}>
                        <Text style={{position: 'absolute', right: 10, marginVertical: 10,color: "#B40C56"}}>Price: Rs {props.data.price}</Text>
                        </View>
                        :
                        null
                    }
                </View>
            }
        </TouchableOpacity>
    )

}
export default CategoryTile;
    