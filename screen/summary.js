
import React from 'react'
import {
 Dimensions,Image, View,Text,StyleSheet,TouchableOpacity,Alert,ActivityIndicator
} from 'react-native'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import { Provider, TextInput } from 'react-native-paper';
import { RNCamera } from 'react-native-camera';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
var radio_props = [
  {label: 'Male    ', value:'Male' },
  {label: 'Female   ', value:'Female' },
  {label: 'Other    ', value:'Other' },

];

export default class bashments extends  React.Component {
  constructor(props){

    super(props);
   
    this.state={
      data:[],
selectedValue:'',
showCamera:false,
filepath: {
  data: '',
  uri: ''
},
fileData: '',
fileUri: '',
recee_total_work:0,
total_work:0,
isLoader:true
    }
  };

  async componentDidMount() {
  const userid=await AsyncStorage.getItem('userid')
  const process_id=await AsyncStorage.getItem('processidd')
console.log('========',process_id)
    axios.post(`https://www.brandspring.in/BSIS/api/todays-summary/${userid}`, {
     
        process_id:process_id
})
.then((res)=> {
  console.log('+++++}}}}}}}}}}}}}}}', res.data)
        this.setState({
          recee_total_work: res.data.recee_total_work,
          total_work:res.data.total_work,
          isLoader:false

      })
}).catch((e) => {
    Alert.alert('enternal server error')

});
  }
  ///=================================
  logout=async()=>{
  await  AsyncStorage.removeItem('processidd');
  this.props.navigation.navigate('Loginselection') 


  }
  goBackToHome =async()=>{
    const process_id=await  AsyncStorage.getItem('processidd')
        if(process_id ==1){
          this.props.navigation.navigate('ShopDetails')
        }else if(process_id ==2){
          this.props.navigation.navigate('Entershopid')
        }else if(process_id ==3){
          this.props.navigation.navigate('CreateNewShop')

        }
      }

render() {

    return (
<View style={styles.container}>
<View style={{padding:width/70,flexDirection:'row',backgroundColor:'red'}}>
     <View style={{flex:1,flexDirection:'row',margin:10}}>

<View style={{flex:2}}>

<Text style={{fontSize:18, color:'white'}}>Online Report System</Text>
</View>

{/* <View style={{flex:0.2}}>

<Icon name="cog-outline"  style={{fontSize :25}}/>

</View> */}
<View style={{flex:0.2}}>
<TouchableOpacity onPress={()=>this.logout()}>

<Icon name="logout"  style={{fontSize :25}}/>

</TouchableOpacity>
</View>

</View>

     </View>
     <View style={{flex:3}}>
<TouchableOpacity onPress={()=>this.goBackToHome()}>
     <View style={{padding:width/45}}>
     <Icon name="home"  style={{fontSize :25,right:0,position:'absolute',marginRight:width/12}}/>
     </View>
</TouchableOpacity>

{this.state.isLoader?(<ActivityIndicator  size="small" color="#0000ff" />):
<View style={{padding:width/45,marginTop:25,borderWidth:1,borderColor:'black',
marginLeft:width/20,marginRight:width/20,borderRadius:10,backgroundColor:'#38bf28'}}>
    <View style={{padding:width/45,flexDirection:'row',justifyContent:'space-between'}}>

<Text style={{fontSize:16,fontWeight:'bold'}}>Today's Summary </Text>
    </View>
    <View style={{padding:width/45,flexDirection:'row',justifyContent:'space-between'}}>

<Text>Reccee Total Work </Text>
<Text>{this.state.recee_total_work?this.state.recee_total_work:0}</Text>
    </View>
    <View style={{padding:width/45,flexDirection:'row',justifyContent:'space-between'}}>

<Text>Total Installation </Text>
<Text>{this.state.total_work?this.state.total_work:0}</Text>
    </View>
    <View style={{padding:width/45,flexDirection:'row',justifyContent:'space-between'}}>

<Text>Total Direct Fix</Text>
<Text>{this.state.total_work?this.state.total_work:0}</Text>
    </View>
  

</View>
 } 

     </View>
   

</View>
    )
     
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
},
inner: {
    // padding: 24,
    flex: 1,
    // justifyContent: "flex-end",
},
header: {
    fontSize: 36,
    marginBottom: 48,
},
lable:{
  fontSize:22,
  fontWeight:'bold',
  color:'black'
},
input: {
  height: height/18,
 borderRadius:8,
 marginLeft:width/25,
 marginRight:width/25,
 marginTop:0,
 marginBottom:0,
//  padding:7,
  backgroundColor:'white',
  // borderWidth:1,
  // borderColor:'black',
  //  color:"red"
  

 
},
btnContainer: {
    backgroundColor: "#2b003b",
    marginTop: 12,
},
});

