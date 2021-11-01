import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, TouchableOpacity,
  Image, Alert, Dimensions, ActivityIndicator
} from 'react-native';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';
import { Provider, TextInput } from 'react-native-paper';
//import messaging from '@react-native-firebase/messaging';
import firebase from 'react-native-firebase';
import PushNotification from 'react-native-push-notification';
// import GetLocation from 'react-native-get-location'
// import MapView  from 'react-native-maps';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: '',
      data: [],
      userValues: [],
      isLoader: false,
      selectedValue: '',
      latitude: "",
      longitude: "",
      fcm_token:'',
    };
  }
  async componentDidMount() {
    //old BASE_URL = https://www.brandspring.co.in/BSIS/
    axios.get('https://www.brandspring.in/BSIS/api/process-project-next', {
    })
      .then((res) => {
        console.log('+++++', res.data.projects)


        let myUsers = res.data.projects.map((myValue, myIndex) => {
          console.log('========', myValue.project_name)
          return (
            <Picker.Item label={myValue.project_name} value={myValue.id} key={myIndex} />
          )
        });
        this.setState({
          data: myUsers
        })
      }).catch((e) => {
        Alert.alert('enternal server error')

      });


    // ////////////////============********************************//////////////////////////////////////

    // GetLocation.getCurrentPosition({
    //     enableHighAccuracy: true,
    //     timeout: 15000,
    // })
    // .then(location => {
    //     console.log(location);
    //     this.setState({
    //       latitude:location.latitude,
    //       longitude:location.longitude
    //     })
    //     fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.latitude + ',' + location.longitude + '&key=' + 'AIzaSyANUak7seRUFnbf0BxDQU-iBomEaE_FJZs')
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //           var dd=responseJson;
    //           dd.results.map(ele=>{

    //             console.log("llllllllllll",ele.formatted_address);
    //           })

    // })
    // })
    // .catch(error => {
    //     const { code, message } = error;
    //     console.warn(code, message);
    // })

    this.checkPermission();
    this.createNotificationListeners();

    // PushNotification.configure({
    //   // (required) Called when a remote or local notification is opened or received
    //   onNotification: function(notification) {
    //     console.log('LOCAL NOTIFICATION ==>', notification)
    //   },
    
    //   popInitialNotification: true,
    //   requestPermissions: true
    // })
  }

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }

  onLogin = async () => {

    this.setState({ isLoader: true })

    // this.setState({loader:true})

    const { selectedValue, email, password } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (selectedValue == "") {

      Alert.alert('Please Select Process..')
      this.setState({ isLoader: false })

    }
    if (email == "") {

      Alert.alert('Please Fill Email Field')
      this.setState({ isLoader: false })

    }
    else if (password == "") {
      Alert.alert('Please Fill Password Field')
      this.setState({ isLoader: false })

    }

    //     else  if(reg.test(email) === false)
    //     {
    //       Alert.alert('Please Fill Vaild Email ')
    // this.setState({isLoader:false})

    //       }
    else {
      console.log(">??????????", this.state.selectedValue, this.state.email, this.state.password, this.state.fcm_token)

      axios.post('https://www.brandspring.in/BSIS/api/auth/login', {
        // project_id :this.state.selectedValue,
        process_id: this.state.selectedValue,
        email: this.state.email,
        password: this.state.password,
        fcm_token:this.state.fcm_token,

      })
        .then((res) => {
          console.log('99999999999', res.data)
          this.setState({ isLoader: false })
          if (res.data.process_id == 1 && res.data.user_type_id == 2) {
            AsyncStorage.setItem('Authentication', 'logged');
            AsyncStorage.setItem('userid', JSON.stringify(res.data.user_id))
            AsyncStorage.setItem('usertypeid', JSON.stringify(res.data.user_type_id))
            console.log('======Reccee=====', res.data)

            // AsyncStorage.setItem('outletcodee',res.data.outlet_code)

            AsyncStorage.setItem('processidd', JSON.stringify(res.data.process_id))
            AsyncStorage.setItem('projectidd', JSON.stringify(res.data.project_id))
            this.props.navigation.navigate('ShopDetails')
          } else if (res.data.process_id == 2 && res.data.user_type_id == 2) {
            console.log('======Installation=====', res.data)
            AsyncStorage.setItem('Authentication', 'logged');
            AsyncStorage.setItem('userid', JSON.stringify(res.data.user_id))
            AsyncStorage.setItem('usertypeid', JSON.stringify(res.data.user_type_id))
            // AsyncStorage.setItem('outletcodee',res.data.outlet_code)

            AsyncStorage.setItem('processidd', JSON.stringify(res.data.process_id))
            AsyncStorage.setItem('projectidd', JSON.stringify(res.data.project_id))
            this.props.navigation.navigate('Entershopid')

          } if (res.data.process_id == 3 && res.data.user_type_id == 2) {
            console.log('======Direct Fix=====', res.data)
            AsyncStorage.setItem('Authentication', 'logged');
            AsyncStorage.setItem('usertypeid', JSON.stringify(res.data.user_type_id))
            AsyncStorage.setItem('userid', JSON.stringify(res.data.user_id))
            // AsyncStorage.setItem('outletcodee',res.data.outlet_code)

            AsyncStorage.setItem('processidd', JSON.stringify(res.data.process_id))
            AsyncStorage.setItem('projectidd', JSON.stringify(res.data.project_id))
            this.props.navigation.navigate('CreateNewShop')

          }

        }).catch((e) => {
          alert('Something went wrong..')
          console.log('Something went wrong..');
          // Alert.alert('enternal server error')

        });

    }

  }


  

  //Check whether Push Notifications are enabled or not
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //Get Device Registration Token
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log('fcmToken:', fcmToken);
        this.setState({fcm_token:fcmToken});
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //Request for Push Notification
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // If user allow Push Notification
      this.getToken();
    } catch (error) {
      // If user do not allow Push Notification
      console.log('Rejected');
    }
  }

  async createNotificationListeners() {
    
    // If your app is in Foreground
   
    // this.notificationListener = firebase.notifications().onNotification((notification) => {
    //     const localNotification = new firebase.notifications.Notification({
    //       show_in_foreground: true,
    //     })
    //     .setNotificationId(notification.notificationId)
    //     .setTitle(notification.title)
    //     .setBody(notification.body)

    //     firebase.notifications()
    //       .displayNotification(localNotification)
    //       .catch(err => console.error(err));
    // });

    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
  });


    //If your app is in background

    // this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    //   const { title, body } = notificationOpen.notification;
    //   console.log('onNotificationOpened:');
    //   Alert.alert(title, body)
    // });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  });


    // If your app is closed

    // const notificationOpen = await firebase.notifications().getInitialNotification();
    // if (notificationOpen) {
    //   console.log('getInitialNotification:');
    // }

    const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  }

    // For data only payload in foreground

//     this.messageListener = firebase.messaging().onMessage
// ((message) => {
//       //process data message
//       console.log("Message", JSON.stringify(message));
//     });

this.messageListener = firebase.messaging().onMessage((message) => {
  //process data message
  console.log(JSON.stringify(message));
});

  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  render() {

    return (
      <View style={{ flex: 1 }} >

        <View style={{ height: height / 4, justifyContent: 'center', alignItems: 'center' }}>

          <Image source={require('../assets/images/logo.jpeg')} style={{ width: (width / 2) + ((width / 5)), height: height / 10, marginTop: 10 }} />
        </View>

        <View style={{ height: height / 5 }}>
          <View style={{ padding: width / 35, marginLeft: width / 25, }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: "red" }}> SignIn</Text>
          </View>

          <View style={{ height: height / 14, marginLeft: width / 15, marginRight: width / 14, borderWidth: 1, borderColor: 'black', borderRadius: 15 }}>
            {/* <RNPickerSelect
  placeholder={{
    label: 'Select a Category...',
    value: '',
}}
        // onValueChange={(value) =>this.selectCategory(value)}
        // items={['ibv','bvbvb']}
        // value={this.state.img_cat}
     
    /> */}
            <Picker selectedValue={this.state.selectedValue} onValueChange={(value) => this.setState({ selectedValue: value })}>
              <Picker.Item label="--Please Select Process--" />

              {this.state.data}
            </Picker>
          </View>
          <View style={{ padding: width / 35 }}>
            <TextInput
              style={styles.input}
              mode='outlined'

              label="Email/phonenumber"
              // value={text}
              onChangeText={(email) => this.setState({ email })}
            />
          </View>

          <View style={{ padding: width / 35 }}>

            <TextInput
              style={styles.input}
              mode='outlined'
              secureTextEntry={true}
              label="Password"
              // value={}
              onChangeText={(password) => this.setState({ password })}
            />
          </View>
          {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgotScreen')}>
 <View style={{padding:width/35}}>
   
 <Text style={{color:'red',right:0,position:'absolute',marginRight:width/12,fontSize:15}} >Forgot Password?</Text>
   
 </View>
 </TouchableOpacity> */}
          <View style={{ padding: width / 35 }}>
            {this.state.isLoader ? (<ActivityIndicator size="small" color="#0000ff" />) :
              <TouchableOpacity style={{ backgroundColor: "gray", padding: 10, marginLeft: width / 4, marginRight: width / 4 }}
                onPress={() => this.onLogin()}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red', textAlign: 'center' }}>Login </Text>
              </TouchableOpacity>
            }
          </View>
        </View>

      </View>
    );
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
  lable: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black'
  },
  input: {
    height: height / 15,
    borderRadius: 8,
    marginLeft: width / 25,
    marginRight: width / 25,
    marginTop: 0,
    marginBottom: 0,
    //  padding:7,
    backgroundColor: 'white',
    // borderWidth:1,
    //  color:"red"



  },
  btnContainer: {
    backgroundColor: "#2b003b",
    marginTop: 12,
  },
  spinnerTextStyle: {
    color: 'red',
  },
});
