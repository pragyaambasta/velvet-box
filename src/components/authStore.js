import { observable, action, computed } from 'mobx';
import {create,persist} from 'mobx-persist';
import localStorage from 'localStorage';


class AuthStore {
  @persist @observable email = '';

  @observable storeReady = false;
  // @persist @observable token = '';
  
  @action setEmail(email) {
      console.log('store setEmail called', email);
    this.email = email; 
  }

  @action getEmail() {
    console.log('store getEmail called', this.email);
    return this.email;
  }
  
  @action setUserToken(token) {
      console.log('store setUser Token',token);
    this.token = token;
  }

  @observable cart = [];

  @action addCart(item){
    this.cart.push(item);
  }

  @action getCart(){
    return this.cart;
  }

  @action  getTotal(){
    //return (this.cart.price * this.cart.length);
    var totalPrice = 0;
    for (var i=0; i< this.cart.length; i++) {
      if (this.cart[i].price) {
        totalPrice += this.cart[i].price;
      }
    }
    return totalPrice;
  }

  // @action login(email) {
  //   this.inProgress = true;
  //   this.errors = undefined;
  //   return agent.Auth.login(this.email, this.token)
  //     .then(({ user }) => commonStore.setToken(user.token))
  //     .then(() => userStore.pullUser())
  //     .catch(action((err) => {
  //       this.errors = err.response && err.response.body && err.response.body.errors;
  //       throw err;
  //     }))
  //     .finally(action(() => { this.inProgress = false; }));
  // }
//  @computed set email(value){
//     this.value.email = email
//      }
//  @computed set password(value){
//     this.value.password = password
//     }

    @action logout() {
      // this.email = ''; 
      store.setEmail('');
      console.log('??null??',this.email);
      // store.setToken(undefined);
      // userStore.forgetUser();
      // return Promise.resolve();
    }
}

const store = new AuthStore();
export default store;


// post hydration
// .then(() => console.log('some hydrated'))
