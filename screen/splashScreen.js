
import React from 'react'
import {
 Dimensions,Image, View
} from 'react-native'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
export default class bashments extends  React.Component {
  constructor(props){

    super(props);
   
    this.state={
      
    }
  };
  componentDidMount(){
    setTimeout(()=>{
      this.props.navigation.navigate('Auth') 
     
    },3000)
  }
render() {

    return (
<View style={styles.container}>
        
<Image source={require('../assets/images/logo.jpeg')}  style={{width :(width)-(width/5),height:(height/13)}}/>

</View>
    )
}
}
var styles = {
    container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      
      
    }
  }