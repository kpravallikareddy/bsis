import React, { Component } from 'react';
import { StyleSheet, View ,Text,Dimensions, ActivityIndicator,} from 'react-native';

// import PhoneInput from 'react-native-phone-input';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import AsyncStorage from '@react-native-community/async-storage';


export default  class auth extends React.Component {
  constructor() {
    super();
    this.state = {
    auth :''
    };
  }

  async componentDidMount() {
  
    const Authh =  await  AsyncStorage.getItem('Authentication')
const process_id=await  AsyncStorage.getItem('processidd')
const user_type_id=await  AsyncStorage.getItem('usertypeid')
    console.log('Authentication',Authh,process_id, user_type_id)
    if(process_id == 1 && user_type_id == 4 )
    {
      console.log('Authentication1',Authh,process_id, user_type_id)
      this.props.navigation.navigate('Bsinfo')
      // if(user_type_id == "4"){
      //   this.props.navigation.navigate('Bsinfo')
      // }
      // else if(user_type_id == "5"){
      //   this.props.navigation.navigate('Bsinfo')
      // }
      // else{
      // this.props.navigation.navigate('ShopDetails')
      // }
    }
    else if(process_id == 1 && user_type_id == 5 )
    {
      console.log('Authentication2',Authh,process_id, user_type_id)
      this.props.navigation.navigate('Bsinfo')
    } 
    else if(process_id == 1 && user_type_id == 2)
    {
      console.log('Authentication3',Authh,process_id, user_type_id)
      this.props.navigation.navigate('ShopDetails')
    } 
    else if(process_id == 1 && user_type_id == 3){
      console.log('Authentication4',Authh,process_id, user_type_id)
      this.props.navigation.navigate('Bsinfo')
      // if(user_type_id == "3"){
      // this.props.navigation.navigate('Bsinfo')
      // }
      // else{
      // this.props.navigation.navigate('Entershopid')
      // }

    }
    else if(process_id == 2 && user_type_id == 2){
      console.log('Authentication5',Authh,process_id, user_type_id)
      this.props.navigation.navigate('Entershopid')
    }
    else if(process_id == 3 && user_type_id == 2){
      console.log('Authentication6',Authh,process_id, user_type_id)
      this.props.navigation.navigate('CreateNewShop')
      
    }
    else
    {
      console.log('Authentication7',Authh,process_id, user_type_id)
     // this.props.navigation.navigate('LoginScreen')
     this.props.navigation.navigate('Loginselection')
    }
   
  }

  render() {
    return (
      <View style={styles.container}>
         <ActivityIndicator size='large' color='white' />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
  },
});

