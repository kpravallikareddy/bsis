// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
// // import * as React from 'react';
// // import { Button, View, Text } from 'react-native';

// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';

// // import HomeScreen from './pages/HomeScreen';
// // import RegisterUser from './pages/RegisterUser';
// // import ViewAllUser from './pages/ViewAllUser';


// // const Stack = createStackNavigator();

// // const App = () => {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator initialRouteName="HomeScreen">
// //         <Stack.Screen
// //           name="HomeScreen"
// //           component={HomeScreen}
// //           options={{
// //             title: 'Home', //Set Header Title
// //             headerStyle: {
// //               backgroundColor: '#f4511e', //Set Header color
// //             },
// //             headerTintColor: '#fff', //Set Header text color
// //             headerTitleStyle: {
// //               fontWeight: 'bold', //Set Header text style
// //             },
// //           }}
// //         />
// //         <Stack.Screen
// //           name="Register"
// //           component={RegisterUser}
// //           options={{
// //             title: 'Register User', //Set Header Title
// //             headerStyle: {
// //               backgroundColor: '#f4511e', //Set Header color
// //             },
// //             headerTintColor: '#fff', //Set Header text color
// //             headerTitleStyle: {
// //               fontWeight: 'bold', //Set Header text style
// //             },
// //           }}
// //         />
// //           <Stack.Screen
// //           name="ViewAll"
// //           component={ViewAllUser}
// //           options={{
// //             title: 'View Users', //Set Header Title
// //             headerStyle: {
// //               backgroundColor: '#f4511e', //Set Header color
// //             },
// //             headerTintColor: '#fff', //Set Header text color
// //             headerTitleStyle: {
// //               fontWeight: 'bold', //Set Header text style
// //             },
// //           }}
// //         />
// //       </Stack.Navigator>
      
// //     </NavigationContainer>
// //   );
// // };

// // export default App;
// import React from 'react';
// import { createAppContainer ,createSwitchNavigator} from 'react-navigation';
// import { createStackNavigator} from 'react-navigation-stack';
// import HomeScreen from './pages/HomeScreen'; 
// import RegisterUser from './pages/RegisterUser'; 
// // import DeleteUser from './pages/DeleteUser';

// class App extends React.Component {
 
//     render() {
//       return  <AppContainer />;
//     }
//   }
//   export default App;
  
//   const HomeScreenNavigator = createStackNavigator({ 
//     HomeScreen:{
//       screen:HomeScreen,
  
//       navigationOptions:{ headerShown :false}
  
//     }
//   });
//   const RegisterUserNavigator = createStackNavigator({ 
//     RegisterUser:{
//       screen:RegisterUser,
  
//       navigationOptions:{ headerShown :false}
  
//     }
//   });
//   const appswitchNavigator=createSwitchNavigator({
//     HomeScreen :{screen:HomeScreenNavigator},
//     RegisterUser:{screen:RegisterUserNavigator},
  
//   }
//   ,{
//     initialRouteName:'RegisterUser',
//   }
//   )
//   const AppContainer = createAppContainer(appswitchNavigator);



// import * as React from 'react';
// import { Button, View, Text } from 'react-native';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import HomeScreen from './pages/HomeScreen';
// import RegisterUser from './pages/RegisterUser';
// import ViewAllUser from './pages/ViewAllUser';


// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="HomeScreen">
//         <Stack.Screen
//           name="HomeScreen"
//           component={HomeScreen}
//           options={{
//             title: 'Home', //Set Header Title
//             headerStyle: {
//               backgroundColor: '#f4511e', //Set Header color
//             },
//             headerTintColor: '#fff', //Set Header text color
//             headerTitleStyle: {
//               fontWeight: 'bold', //Set Header text style
//             },
//           }}
//         />
//         <Stack.Screen
//           name="Register"
//           component={RegisterUser}
//           options={{
//             title: 'Register User', //Set Header Title
//             headerStyle: {
//               backgroundColor: '#f4511e', //Set Header color
//             },
//             headerTintColor: '#fff', //Set Header text color
//             headerTitleStyle: {
//               fontWeight: 'bold', //Set Header text style
//             },
//           }}
//         />
//           <Stack.Screen
//           name="ViewAll"
//           component={ViewAllUser}
//           options={{
//             title: 'View Users', //Set Header Title
//             headerStyle: {
//               backgroundColor: '#f4511e', //Set Header color
//             },
//             headerTintColor: '#fff', //Set Header text color
//             headerTitleStyle: {
//               fontWeight: 'bold', //Set Header text style
//             },
//           }}
//         />
//       </Stack.Navigator>
      
//     </NavigationContainer>
//   );
// };

// export default App;

/////////////////////===========================
// import React from 'react';
// import { createAppContainer ,createSwitchNavigator} from 'react-navigation';
// import { createStackNavigator} from 'react-navigation-stack';
// import SplashScreen from './screen/splashScreen'; 
// import LoginScreen from './screen/loginScreen'; 
// import ForgotScreen from './screen/forgotScreen'; 
// import Auth from './screen/auth'; 
// import ShopDetails from './screen/shopDetails'; 
// import VerifyDetailsScreen from './screen/verifyDetailsScreen'; 
// import BrandingInstallScreen from './screen/brandingInstall'; 
// import FrontImgScreen from './screen/frontImg'; 
// import Summary from './screen/summary'; 
// import CreateNewShop from './screen/createNewShop'; 
// import PreFrontPicture from './screen/preFrontPicture';
// import PostFrontPcture from './screen/postFrontPcture';
// import StoreFrontPicture from './screen/storeFrontPicture'; 
// import Entershopid from './screen/entershopid';
// import InstallationImage from './screen/installationImage'; 













// // import DeleteUser from './pages/DeleteUser';

// class App extends React.Component {
 
//     render() {
//       return  <AppContainer />;
//     }
//   }
//   export default App;
  
//   const SplashScreenNavigator = createStackNavigator({ 
//     SplashScreen:{
//       screen:SplashScreen,
  
//       navigationOptions:{ headerShown :false}
  
//     }
//   });
//   const AuthNavigator = createStackNavigator({ 
//     Auth:{
//       screen:Auth,
  
//       navigationOptions:{ headerShown :false}
  
//     }
//   });
//   const LoginScreenNavigator = createStackNavigator({ 

//     LoginScreen:{
//       screen:LoginScreen,
  
//       navigationOptions:{ headerShown :false}
  
//     }
//   }); 
//   const ForgotScreenNavigator = createStackNavigator({ 

//     ForgotScreen:{
//       screen:ForgotScreen,
  
//       navigationOptions:{ headerShown :false}
      
//     }
//   });
//   const ShopDetailsNavigator = createStackNavigator({ 

//     ShopDetails:{
//       screen:ShopDetails,
  
//       navigationOptions:{ headerShown :false}
      
//     }
//   });
//   const VerifyDetailsScreenNavigator = createStackNavigator({ 

//     VerifyDetailsScreen:{
//       screen:VerifyDetailsScreen,
  
//       navigationOptions:{ headerShown :false}
      
//     }
//   })
//   const BrandingInstallScreenNavigator = createStackNavigator({ 

//     BrandingInstallScreen:{
//       screen:BrandingInstallScreen,
  
//       navigationOptions:{ headerShown :false}
      
//     }
//   });
//   const FrontImgScreenNavigator = createStackNavigator({ 

//     FrontImgScreen:{
//       screen:FrontImgScreen,
  
//       navigationOptions:{ headerShown :false}
      
//     }
//   });
//   const SummaryNavigator = createStackNavigator({ 

//     Summary:{
//       screen:Summary,
  
//       navigationOptions:{ headerShown :false}
  
//     }
//   });
//   const CreateNewShopNavigator = createStackNavigator({ 

//     CreateNewShop:{
//       screen:CreateNewShop,
  
//       navigationOptions:{ headerShown :false}
  
//     }
//   })
//   const PreFrontPictureNavigator = createStackNavigator({ 

//     PreFrontPicture:{
//       screen:PreFrontPicture,
  
//       navigationOptions:{ headerShown :false}
  
//     }
//   })
//   const PostFrontPctureNavigator = createStackNavigator({ 

//     PostFrontPcture:{
//       screen:PostFrontPcture,
  
//       navigationOptions:{ headerShown :false}
      
//     }

//   });
//   const StoreFrontPictureNavigator = createStackNavigator({ 

//     StoreFrontPicture:{
//       screen:StoreFrontPicture,
  
//       navigationOptions:{ headerShown :false}
      
//     }
//   })
//   const EntershopidNavigator = createStackNavigator({ 

//     Entershopid:{
//       screen:Entershopid,
  
//       navigationOptions:{ headerShown :false}
  
//     }
//   });
//   const InstallationImageNavigator = createStackNavigator({ 

//     InstallationImage:{
//       screen:InstallationImage,
  
//       navigationOptions:{ headerShown :false}
  
//     },
//   });
//   const appswitchNavigator=createSwitchNavigator({
//     SplashScreen :{screen:SplashScreenNavigator},
//     LoginScreen:{screen:LoginScreenNavigator},
//     ShopDetails:{screen:ShopDetailsNavigator},
//     BrandingInstallScreen:{screen:BrandingInstallScreenNavigator},
//     FrontImgScreen:{screen:FrontImgScreenNavigator},
//     Summary:{screen:SummaryNavigator},
//     CreateNewShop:{screen:CreateNewShopNavigator},
//     PreFrontPicture:{screen:PreFrontPictureNavigator},
//     PostFrontPcture:{screen:PostFrontPctureNavigator},
//     StoreFrontPicture:{screen:StoreFrontPictureNavigator},
//     Entershopid:{screen:EntershopidNavigator},
//     InstallationImage:{screen:InstallationImageNavigator},
//     VerifyDetailsScreen:{screen:VerifyDetailsScreenNavigator},
//     ForgotScreen:{screen:ForgotScreenNavigator},
//     Auth:{screen:AuthNavigator},


//   }
//   ,{
//     initialRouteName:'SplashScreen',
//   }
//   )
//   const AppContainer = createAppContainer(appswitchNavigator);




////////////=======
import React from 'react';
import { createAppContainer ,createSwitchNavigator} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import SplashScreen from './screen/splashScreen'; 
import LoginScreen from './screen/loginScreen';
import Loginselection from './screen/loginselection'; 
import ForgotScreen from './screen/forgotScreen'; 
import Auth from './screen/auth'; 
import ShopDetails from './screen/shopDetails'; 
import VerifyDetailsScreen from './screen/verifyDetailsScreen'; 
import BrandingInstallScreen from './screen/brandingInstall'; 
import FrontImgScreen from './screen/frontImg'; 
import Summary from './screen/summary'; 
import CreateNewShop from './screen/createNewShop'; 
import PreFrontPicture from './screen/preFrontPicture';
import PostFrontPcture from './screen/postFrontPcture';
import StoreFrontPicture from './screen/storeFrontPicture'; 
import Entershopid from './screen/entershopid';
import InstallationImage from './screen/installationImage'; 
import Teamlogin from './screen/teamlogin';
import Bsinfo from './screen/bsinfo';
import Showdata from './screen/showdata';
//import MenuList from './screen/';
import MenuOverlay from './screen/menuOverlay';

// import DeleteUser from './pages/DeleteUser';

class App extends React.Component {
 
    render() {
      return  <AppContainer />;
    }
  }
  export default App;
  
  const SplashScreenNavigator = createStackNavigator({ 
    SplashScreen:{
      screen:SplashScreen,
  
      navigationOptions:{ headerShown :false}
  
    },
    Auth:{
      screen:Auth,
  
      navigationOptions:{ headerShown :false}
  
    }, 
    LoginScreen:{
      screen:LoginScreen,
  
      navigationOptions:{ headerShown :false}
  
    }, 
    Loginselection:{
      screen:Loginselection,
  
      navigationOptions:{ headerShown :false}
  
    }, 
    Teamlogin:{
      screen:Teamlogin,
  
      navigationOptions:{ headerShown :false}
  
    }, 
    MenuOverlay:{
      screen:MenuOverlay,
  
      navigationOptions:{ headerShown :false}
  
    }, 
    Bsinfo:{
      screen:Bsinfo,
  
      navigationOptions:{ headerShown :false}
  
    }, 
    Showdata:{
      screen:Showdata,
  
      navigationOptions:{ headerShown :false}
  
    }, 
    ForgotScreen:{
      screen:ForgotScreen,
  
      navigationOptions:{ headerShown :false}
      
    },
    ShopDetails:{
      screen:ShopDetails,
  
      navigationOptions:{ headerShown :false}
      
    },
    VerifyDetailsScreen:{
      screen:VerifyDetailsScreen,
  
      navigationOptions:{ headerShown :false}
      
    },
    BrandingInstallScreen:{
      screen:BrandingInstallScreen,
  
      navigationOptions:{ headerShown :false}
      
    },
    FrontImgScreen:{
      screen:FrontImgScreen,
  
      navigationOptions:{ headerShown :false}
      
    },
    Summary:{
      screen:Summary,
  
      navigationOptions:{ headerShown :false}
  
    },
    CreateNewShop:{
      screen:CreateNewShop,
  
      navigationOptions:{ headerShown :false}
  
    },
    PreFrontPicture:{
      screen:PreFrontPicture,
  
      navigationOptions:{ headerShown :false}
  
    },
    PostFrontPcture:{
      screen:PostFrontPcture,
  
      navigationOptions:{ headerShown :false}
      
    },
    StoreFrontPicture:{
      screen:StoreFrontPicture,
  
      navigationOptions:{ headerShown :false}
      
    },
    Entershopid:{
      screen:Entershopid,
  
      navigationOptions:{ headerShown :false}
  
    },
    InstallationImage:{
      screen:InstallationImage,
  
      navigationOptions:{ headerShown :false}
  
    },
  });
  const appswitchNavigator=createSwitchNavigator({
    Auth:{screen:Auth},
    LoginScreen:{screen:LoginScreen},
    Loginselection:{screen:Loginselection},
    Teamlogin:{screen:Teamlogin},
    MenuOverlay:{screen:MenuOverlay},
    Bsinfo:{screen:Bsinfo},
    Showdata:{screen:Showdata},
    SplashScreen :{screen:SplashScreenNavigator},
    ShopDetails:{screen:ShopDetails},
    BrandingInstallScreen:{screen:BrandingInstallScreen},
    FrontImgScreen:{screen:FrontImgScreen},
    Summary:{screen:Summary},
    CreateNewShop:{screen:CreateNewShop},
    PreFrontPicture:{screen:PreFrontPicture},
    PostFrontPcture:{screen:PostFrontPcture},
    StoreFrontPicture:{screen:StoreFrontPicture},
    Entershopid:{screen:Entershopid},
    InstallationImage:{screen:InstallationImage},
    VerifyDetailsScreen:{screen:VerifyDetailsScreen},
    ForgotScreen:{screen:ForgotScreen},


  }
  ,{
    initialRouteName:'SplashScreen',
  }
  )
  const AppContainer = createAppContainer(appswitchNavigator);



