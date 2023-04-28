import React, {Component,useRef,useEffect,useState} from 'react';
import {WebView} from 'react-native-webview';
import {Text, View, StyleSheet, BackHandler, Alert,SafeAreaView,ActivityIndicator,Platform, StatusBar,} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const  App = () =>  {
  const ref =useRef();
    const [canGoBack, setCanGoBack] = useState(false);

   useEffect(() => {
    const backAction = () => {
     
      if (canGoBack && ref.current){
        ref.current?.goBack();
      }else{
         Alert.alert('Hold on!', 'Are you sure you want to exit ?', [
        {
          text: 'No',
          onPress: () => null,
          
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
        
      ]);
      }
      

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [canGoBack]);



   
    return (
      <SafeAreaView style={styles.AndroidSafeArea}>
        <WebView
        ref={ref}
        source={{
          uri: 'https://egniol.co.in/'
        }}
         
        
              onLoadProgress={(event) => setCanGoBack(event.nativeEvent.canGoBack)}
              startInLoadingState
              renderLoading={()=>(
                <View style={{flex: 1}}>
                      <ActivityIndicator size="large" color="#00ff00" />

                </View>
                )}

      />
      </SafeAreaView>
    );
  
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex:1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});

export default App;