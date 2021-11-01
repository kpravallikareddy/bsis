
import React from 'react'
import {
 Dimensions,Image, View,Text,TextInput,StyleSheet,TouchableOpacity,Alert, ScrollView,ActivityIndicator
} from 'react-native'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { set } from 'react-native-reanimated';


export default class CreateNewShop extends  React.Component {
  constructor(props){

    super(props);
   
    this.state={
        selectedValue:'',
        selectedValue2:'',
        state_data_Array:[],
city_data_array:[],
shopname:'',
shopowner:'',
shopaddress:'',
shopnumber:'',
city:'',
area:'',
state_id:'',
outletcode:"",
process_id:'',
isLoader:false
    }
  };
  async componentDidMount() {
    axios.get('https://www.brandspring.in/BSIS/api/get_state', {
     
   
})
.then((res)=> {
  this.state.state_data_Array.length=0;
  let myState = res.data.states.map((myValue,myIndex)=>{
      return(
        <Picker.Item label={myValue.state_name} value={myValue.state_id} key={myIndex}/>
        )
        });

        this.setState({
            state_data_Array:myState,
        })
       


}).catch((e) => {
    Alert.alert('enternal server error')

});


  }
  logout=async()=>{
    await  AsyncStorage.removeItem('processidd');
    //this.props.navigation.navigate('LoginScreen') 
    this.props.navigation.navigate('Loginselection');
  
    }
  selectStateIdData =(city_data)=>{
    console.log('ppppppppp',city_data)
//====================City========================
this.setState({state_id:city_data})
axios.get(`https://www.brandspring.in/BSIS/api/get_city/${city_data}`, {
     
   
})
.then((res)=> {
  console.log("/////////////",res.data)
  this.state.city_data_array.length=0;
  let mycity_name = res.data.cities.map((myValue,myIndex)=>{
        return(
        <Picker.Item label={myValue.city_name} value={myValue.city_id} key={myIndex}/>
        )
        });
        this.setState({
          city_data_array:mycity_name
      })
}).catch((e) => {
    Alert.alert('enternal server error')

});
}
  async createNewShop(){
     this.setState({isLoader:true})

const userid=await AsyncStorage.getItem('userid')
const processid=await AsyncStorage.getItem('processidd')
this.setState({process_id:processid})
    const shopname = this.state.shopname;
    const shopowner = this.state.shopowner;
    const shopaddress = this.state.shopaddress;
    const shopnumber = this.state.shopnumber;
    const city = this.state.city;
    const area = this.state.area;
    const state_id = this.state.state_id;

    const selectedValue2 = this.state.selectedValue2;
    
    if(shopname==""){
      
     Alert.alert('Please Fill Shopname Field')
     this.setState({isLoader:false})
    }
    else if(shopowner==""){
     Alert.alert('Please Fill Shopowner Field')
     this.setState({isLoader:false})

  }
    else if(shopaddress==""){
     Alert.alert('Please Fill Shopaddress Field')
     this.setState({isLoader:false})

  }
    else if(shopnumber==""){
     Alert.alert('Please Fill Shopnumber Field')
     this.setState({isLoader:false})

  }
    else if(city==""){
     Alert.alert('Please Fill City Field')
     this.setState({isLoader:false})

  }
    else if(area==""){
     Alert.alert('Please Fill area Field')
     this.setState({isLoader:false})

  }  
  else if(state_id==""){
     Alert.alert('Please Fill State Field')
     this.setState({isLoader:false})

  }
  else{
          
          console.log("LLLLLLLLLLLL",shopname,shopowner,shopaddress,shopnumber,city,area,state_id,selectedValue2)
          axios.post(`https://www.brandspring.in/BSIS/api/save-shop/${userid}`, {
            shop_name:shopname,
            shop_owner :shopowner,
            shop_address:shopaddress,
            mobile :shopnumber,
            city:city ,
            area:area,
            state :state_id,
            district :selectedValue2
     
  })
  .then((res)=> {
     console.log('222333333333333',res.data)
     this.setState({isLoader:false})
// if(this.state.process_id ==1){
//     this.props.navigation.navigate('BrandingInstallScreen',{outletcode:res.data.shop_id}) 
// }else if(this.state.process_id ==3){
  if(res.data.status ==1){
    AsyncStorage.setItem('outletcodee', this.state.outletcode)
    this.props.navigation.navigate('PreFrontPicture',{outletcode:JSON.stringify(res.data.shop_id)}) 
  }
  else {
    alert(res.data.message)
  }
// }

  
  }).catch((e) => {
      console.log('Internal server error', e);

      // Alert.alert('Internal server error')

  });

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
         <ScrollView>
     <View style={{padding:width/35}}>

     <TextInput 
              style={styles.input}
              mode='outlined'

      label="Shop Name"
 placeholderTextColor='red'
 placeholder="Shop Name"

    //   value={this.state.outletcode}
      onChangeText={(shopname) => this.setState({shopname})}

    />
     </View>
     <View style={{padding:width/35}}>

     <TextInput 
              style={styles.input}
              mode='outlined'

      label="Shop Owner"
 placeholderTextColor='red'
 placeholder="Shop Owner"

    //   value={this.state.outletcode}
      onChangeText={(shopowner) => this.setState({shopowner})}

    />
     </View><View style={{padding:width/35}}>

<TextInput 
         style={styles.input}
         mode='outlined'

 label="Shop Address"
placeholderTextColor='red'
placeholder="Shop Address"

//  value={this.state.outletcode}
 onChangeText={(shopaddress) => this.setState({shopaddress})}

/>
</View><View style={{padding:width/35}}>

<TextInput 
         style={styles.input}
         mode='outlined'

 label="Shop Mobile Number"
placeholderTextColor='red'
placeholder="Shop Mobile Number"
numeric
          keyboardType={'numeric'}
//  value={this.state.outletcode}
 onChangeText={(shopnumber) => this.setState({shopnumber})}

/>
</View><View style={{padding:width/35}}>

<TextInput 
         style={styles.input}
         mode='outlined'

 label="City"
placeholderTextColor='red'
placeholder="City"

//  value={this.state.outletcode}
 onChangeText={(city) => this.setState({city})}

/>
</View>
<View style={{padding:width/35}}>

     <TextInput 
              style={styles.input}
              mode='outlined'

      label="Area"
 placeholderTextColor='red'
 placeholder="Location"

    //   value={this.state.outletcode}
      onChangeText={(area) => this.setState({area})}

    />
     </View>
     <View style={{padding:width/150,marginLeft:width/15,marginTop:10,marginRight:width/15
      ,borderWidth:1,borderColor:'black',borderRadius:8}}>

     <Picker selectedValue={this.state.selectedValue} onValueChange={(valuee)=>this.selectStateIdData(valuee)}>
    <Picker.Item label="--Please Select State--" />
    {this.state.state_data_Array}

            </Picker>
     </View>
     <View style={{padding:width/150,marginLeft:width/15,marginTop:10,marginRight:width/15
      ,borderWidth:1,borderColor:'black',borderRadius:8}}>

     <Picker selectedValue={this.state.selectedValue2} onValueChange={(value)=>this.setState({selectedValue2:value})}>
    <Picker.Item label="--Please Select District--" />
    {this.state.city_data_array}

            </Picker>
     </View>
     </ScrollView>
     </View>
     {this.state.isLoader?(<ActivityIndicator  size="small" color="#0000ff" />):
     <View style={{flex:0.3,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
     <TouchableOpacity 
     style={{backgroundColor:"gray",borderRadius:5,width:width/3,height:height/15,justifyContent:'center',alignItems:'center',margin:10}} >
     <Text style={{fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>Previous </Text>
 </TouchableOpacity>
 <TouchableOpacity  
 onPress={()=>this.createNewShop()} 
//  onPress={()=>this.props.navigation.navigate('FrontImgScreen') }
 style={{backgroundColor:"red",borderRadius:5,width:width/3,height:height/15,justifyContent:'center',alignItems:'center'}}>
     <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Next </Text>
 </TouchableOpacity>
     </View>
     } 

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
    // backgroundColor:'white',
    borderWidth:1.5,
     color:"black",
    borderColor:'black'
    
 
   
},
btnContainer: {
    backgroundColor: "#2b003b",
    marginTop: 12,
},
});

