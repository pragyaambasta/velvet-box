import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import Login from './components/Login';
import Home from './components/Home';
import ProductlistTile from './components/productlist';
import ProductDescription from './components/productdescription';
import store from './components/authStore';
import {create} from 'mobx-persist';
import localStorage from 'localStorage';
import {AsyncStorage} from 'react-native';
import Cart from './components/cart';

const hydrate = create({storage: AsyncStorage, jsonify: true});
// try {
//   var data = localStorage.getItem('email');
//   console.log('data!!!', data);
//   if (data === null) {
    // var obj = {email: ''};

//     localStorage.setItem('email', JSON.stringify(obj));
//     console.log('init local storage', localStorage.getItem('email'));
//   }
//  } catch(e) {
//   console.log('error in LS', e);
//  }
hydrate('email', store)
.then(() => {
  console.log('hydrated', store.getEmail());
  store.storeReady = true;
  console.log('@@@', store);
});

function mapNavigationStateParamsToProps(SomeComponent) {
  return class extends Component {
         static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
         render() {
                const {navigation: {state: {params}}} = this.props
                console.log('###', this.props);
                return <SomeComponent {...params} {...this.props} />
         }
  }
};

const AppNavigator = StackNavigator({
    Login: {screen:mapNavigationStateParamsToProps(Login)},
    Home: {screen: mapNavigationStateParamsToProps(Home)},
    ProductlistTile: {screen: mapNavigationStateParamsToProps(ProductlistTile)},
    ProductDescription: {screen:mapNavigationStateParamsToProps(ProductDescription)},
    Cart: {screen:mapNavigationStateParamsToProps(Cart)}
  });

class App extends Component {
  render() {
    return (
      <AppNavigator screenProps={{store: store}} />
    );
  }
}
  export default App;
  
  
