import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const appState = observable({
  count : 0
})
appState.increment = function() {
  this.count++;
}
appState.decrement = function() {
  this.count--;
}

@observer class Counter extends Component {
  render() {
    return (
      <View>
        <Text>Counter: {this.props.store.count}</Text>
        <View>
        <TouchableOpacity
            onPress = {this.handleInc}>
            <Text> + </Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity
            onPress = {this.handleDec}>
            <Text> - </Text>
        </TouchableOpacity>
        </View>

      </View>
    )
  }

  handleInc = () => {
    this.props.store.increment()
  }
  
  handleDec = () => {
    this.props.store.decrement()
  }
}
@observer class CounterDisplay extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        console.log('CounterDisplay', this.props);
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    render() {
      return (
        <View>
          <Text>Counter found: {1}</Text>
        </View>
      )
    }  
}
  
class CounterConnected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDisplayComponent: false
        };
    }

    render() {
        return(
        <View>
            <TouchableOpacity
                onPress = {() => this.setState({showDisplayComponent: !this.state.showDisplayComponent})}>
                <Text> Toggle </Text>
            </TouchableOpacity>
        
            <Counter store={appState} />
            {
                this.state.showDisplayComponent
                ?
                <CounterDisplay />
                :
                <View />
            }
        </View>
        );
    }
}
export default CounterConnected;