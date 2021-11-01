import React from 'react';
import { View,Text ,ImageBackground,Image,Dimensions,TouchableOpacity,Alert} from 'react-native';
import { color } from 'react-native-reanimated';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import axios from 'axios';
// import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class landingPage extends React.Component {
    constructor(props) {
        super(props);
  this.state = {
    showRealApp: false,
    value: 0.2,
    // quizesDetails:[]
    quiz_name:'',
    no_of_test_papper:'',
    quiz_time:'',
    quiz_prize:'',
    showModel:false,
    quiz_image_url:null,
    quiz_id :'',
    is_bought:false,
    papper_id :'',
    test_series_name:''
    // qplus_room_id:'',
    // user_id:''
  }
}
async componentDidMount(){
  
  const quiz_id = await this.props.navigation.getParam('quiz_id');
  const is_bought = await this.props.navigation.getParam('is_bought');
  const paper_id = await this.props.navigation.getParam('paper_id');
  const test_series_name = await this.props.navigation.getParam('test_series_name');

  // const user_id=await AsyncStorage.getItem('user_id')
  console.log('111111111111',quiz_id,is_bought,paper_id,test_series_name)
this.setState({
  is_bought :is_bought,
  quiz_id :quiz_id,
  papper_id :paper_id,
  test_series_name :test_series_name
})
  axios.get(`https://www.webapplicationindia.com/demo/quidsinapi/api/qdetails/${quiz_id}`,{
})
.then((res)=> {

    this.setState({
      no_of_test_papper:res.data.no_of_test_papper,
      quiz_name :res.data.quiz_name,
      quiz_time:res.data.quiz_time,
      quiz_prize:res.data.quiz_prize,
      quiz_image_url:res.data.quiz_image_url,
      quiz_id :quiz_id,
      // user_id : user_id
    })

}).catch((e) => {
console.log('enternal server error', e);

});
}
 payMent(){
  this.setState({showModel :true})
}
showAlert1() {  
  Alert.alert(  
      'Alert Title',  
      'Are you sure?',  
      [  
          {  
              text: 'Cancel',  
              onPress: () => console.log('Cancel Pressed'),  
              style: 'cancel',  
          },  
          {text: 'OK', 
          onPress: () => this.props.navigation.navigate('QuizeScreen',{quiz_id:this.state.quiz_id,papper_id :this.state.papper_id,test_series_name:this.state.test_series_name})},  
      ]  
  );  
}
render() {
  // console.log('========',this.state.qplus_room_id,this.state.user_id)
return (
    <ImageBackground  source={require('../assets/Background.png')} style={styles.container} >


<View style={{flex:0.8,justifyContent:'center',flexDirection:'row',alignItems:'center',backgroundColor:'#fafafafa'}}>
<View style={{flex:1.9}}>
<Image source={require('../assets/loginlogo.png')}  style={{width :(width/3)+20,height:(height/15)+5,marginTop:height/90,
  marginLeft:15}}/>
</View>
{/* <View style={{flex:0.3}}>
<TouchableOpacity  onPress={() => this.props.navigation.openDrawer()}>
<Image source={require('../assets/Shape1.png')}  style={{width :width/15,height:height/34,marginTop:30}}/>
</TouchableOpacity>
</View>                          */}
 </View>
    <View style={{flex:0.6,justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
<View style={{flex:1,backgroundColor:'#9c27b0',height:height/9}}>
  
</View>
</View>
    {this.state.quiz_image_url?<View style={{flex:0.8,borderRadius:150,marginLeft:(width/3)+22,marginRight:(width/3)+18,bottom:45}}>

    <Image source={{ uri: this.state.quiz_image_url }} style={{width: (width/3)-(width/15), height: (width/3)-(width/15),borderRadius:(width/3)/2}}/>

   </View>:<View style={{flex:0.8,borderRadius:150,marginLeft:(width/3)+22,marginRight:(width/3)+18,bottom:45}}>
   <Image source={require('../assets/images3.jpg')} style={{width: (width/3)-(width/15), height: (width/3)-(width/15),borderRadius:(width/3)/2}} />

    {/* <Image source={{ uri: this.state.quiz_image_url }} style={{width: (width/3)-(width/15), height: (width/3)-(width/15),borderRadius:(width/3)/2}}/> */}

   </View>}
   <View style={{flex:0.12,justifyContent:'center',alignItems:'center'}}>
       <Text style={{fontSize:18,fontWeight:'bold'}}>{this.state.quiz_name}</Text>
</View>
<View style={{flex:3.5,borderRadius:30,backgroundColor:'white',marginTop:25}}>
<View style={{flex:0.25,marginTop:20}}>

<Text style={{fontSize:15,fontWeight:'bold',color:'black',textAlign:'center'}}>
  About Institute</Text>
</View>
<View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>

<Text style={{fontSize:12,color:'black',textAlign:'center'}}>About the institute information for the user</Text>
</View>
<View style={{flex:0.2,borderBottomWidth:3,marginLeft:80,marginRight:80,borderColor:'#ffaf10'}}>
<Text style={{textAlign:'center',color:'blue'}}>See More</Text>
</View>
<View style={{flex:0.4,backgroundColor:'#ffaf10', justifyContent:'center',alignItems:'center',marginTop:10}}>
<Text style={{ fontSize:18,fontWeight:'bold',justifyContent:'center',alignItems:'center',color:'white'}}>Examination Name</Text>
</View>
<View style={{flex:0.3, justifyContent:'center',alignItems:'center'}}>
<Text style={{ fontSize:15,justifyContent:'center',alignItems:'center',color:'black',fontWeight:'bold'}}>About The Test Series</Text>
</View>
<View style={{flex:1,marginLeft:30,marginRight:30,borderRadius:15,  
backgroundColor:'white',elevation:10,padding:10
   }}>
<View style={{flex:1, flexDirection:'row',marginLeft:20,marginRight:20,justifyContent:'space-between'}}>
{/* <View style={{flex:0.5}}> */}
<Text style={{ fontSize:15}}>Prize Money</Text>
    
{/* </View>
<View style={{flex:0.5}}> */}
<Text style={{ fontSize:15,textAlign:'right'}}>{this.state.quiz_prize}<Icon name="currency-inr"  size={16}  style={{marginLeft:(width/2)+(width/4)}}/></Text>

{/* </View> */}

</View>
<View style={{flex:1,  flexDirection:'row',marginLeft:20,marginRight:20,justifyContent:'space-between'}}>
{/* <View style={{flex:1.5}}> */}
<Text style={{ fontSize:15}}>Number of test paper</Text>
    
{/* </View>
<View style={{flex:0.8}}> */}
<Text style={{ fontSize:15,textAlign:'right'}}>
  {this.state.no_of_test_papper} 
  </Text>

{/* </View> */}

</View>
{/* <View style={{flex:1, flexDirection:'row',marginLeft:20,marginRight:20,justifyContent:'space-between'}}>
<Text style={{ fontSize:15}}>No. of Questions per test</Text>
<Text style={{ fontSize:15}}></Text>
</View> */}
{/* <View style={{flex:1, flexDirection:'row',marginLeft:20,marginRight:20,justifyContent:'space-between'}}>
<Text style={{ fontSize:15}}>Paper</Text>
<Text style={{ fontSize:15,textAlign:'right'}}>{this.state.quiz_time}</Text>
</View> */}
<View style={{flex:1, flexDirection:'row',marginLeft:20,marginRight:20,justifyContent:'space-between'}}>
{/* <View style={{flex:1.5}}> */}
<Text style={{ fontSize:15}}>Time</Text>
    
{/* </View>
<View style={{flex:1}}> */}
<Text style={{ fontSize:15,textAlign:'right'}}>{this.state.quiz_time} min/T.P.</Text>

{/* </View> */}
</View>
</View>
<View style={{flex:0.3,marginTop:15,borderTopWidth:3,marginLeft:70,marginRight:70,justifyContent:'center',
alignItems:'center',borderColor:'#ffaf10'}}>
<Text style={{fontSize:15,fontWeight:'bold'}}>Rules</Text>
</View>
<View style={{flex:0.4,justifyContent:'center',alignItems:'center'}}>
<Text style={{fontSize:12,color:'black'}}>1.User needs to complete the test paper on time</Text>
</View>
<View style={{flex:0.3,marginLeft:80,marginRight:80,borderBottomWidth:3,borderColor:'#ffaf10'}}>
<Text style={{textAlign:'center',color:'blue'}}>See More</Text>
</View>
 <View style={{flex:0.2,marginLeft:80,marginRight:80}}>
{/* <Text style={{textAlign:'center',color:'blue'}}>See More</Text> */}
</View>
</View>
<View style={{flex:0.3,backgroundColor:'#9c27b0', justifyContent:'center',alignItems:'center',marginTop:10,bottom:5}}>
{this.state.is_bought == true?(<TouchableOpacity onPress={()=>this.props.navigation.navigate('InstitutionTestSeriesByNow',{quiz_id :this.state.quiz_id,quiz_prize :this.state.quiz_prize })}>

<Text style={{ fontSize:18,fontWeight:'bold',justifyContent:'center',alignItems:'center',color:'white'}}>Buy The Test Series</Text>
</TouchableOpacity>):(
  <TouchableOpacity onPress={()=>this.showAlert1()}>

  <Text style={{ fontSize:18,fontWeight:'bold',justifyContent:'center',alignItems:'center',color:'white'}}>Play Now</Text>
  </TouchableOpacity>
)}
{/* <Modal
           visible={this.state.showModel}
           >
        <WebView 
     
          source={{
            uri: `http://webapplicationindia.com/demo/quidsinapi/api/enter-room?user_id=${this.state.user_id}&room_id=${this.state.qplus_room_id}&amount=1`
          }}
          style={{ marginTop: 50}}
        />
        </Modal> */}
</View>

    </ImageBackground>
    )
}
}
    var styles = {
        container: {
          flex:1,
        //   backgroundColor:'gray'
        },
    }