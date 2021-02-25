import React, { useState, useEffect } from 'react'

import { Layout, Text, Input, IndexPath, Select, SelectItem, Card, Avatar, Button } from '@ui-kitten/components';
import { RNCamera } from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const lstGender = ["Male", "Female"]
const lstMarital = ["Single", "Married"]
let camera = null;

const UpdateScreen = ({route,navigation}) => {
    const {dataID,dataName,dataUmur,dataGambar,urlGambar}=route.params;  
    const [nama, setNama] = useState(dataName)
    const [gender, setGender] = useState(0)
    const [umur, setUmur] = useState(dataUmur)
    const [marital, setMarital] = useState(0)
    const [gps, setGps] = useState("")
    const [gambar,setGambar] = useState(urlGambar)
    
    const renderOption = (title) => (

        <SelectItem key={title} title={title} />
    );
    
   useEffect(() =>{
   
    console.log(dataID)
    console.log(dataGambar)
    Geolocation.getCurrentPosition(info => {
    
    setGps(info.coords.longitude +";"+info.coords.latitude)
    
    });

   
   },[])
   
   
   const updateImage = () => {

   
    const reference = storage().ref(dataGambar);

    const pathToFile = gambar;
    if(urlGambar=== gambar){
        updateData(urlGambar,dataGambar)        
    }else{
    // uploads file
    reference.putFile(pathToFile).then(() => {
        console.log("Updated")

        storage()
        .ref(dataGambar)
        .getDownloadURL().then((downloadData) =>{
            console.log(downloadData)
            updateData(downloadData,dataGambar)
        })

   });
}

   
   }
   
   const updateData = (downloadData,namaGambar) => {
    firestore()
   .collection('Users')
   .doc(dataID)
   .update({
     name: nama,
     gender: lstGender[gender.row],
     umur :umur,
     marital : lstMarital[marital.row],
     gps: gps,
     gambar: downloadData,
     namaGambar: namaGambar,
   })
   .then(() => {
     console.log('User Updated!');
   });
   navigation.goBack();
  }

   const takePicture = async () => {
    console.log("test")
        if (camera) {
          const options = { quality: 0.5, base64: true };
          const data = await camera.takePictureAsync(options);
          console.log(JSON.stringify(data));
          setGambar(data.uri)
          console.log(data.uri);
        }
      };

    

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <Layout style={styles.container}>
            <Input style={styles.layout}
                placeholder='Masukan nama anda'
                value={nama}
                onChangeText={txtNama => setNama(txtNama)} />

            <Select style={styles.layout}
                selectedIndex={new IndexPath(gender)}
                placeholder='Default'
                value={lstGender[gender.row]}
                onSelect={index => setGender(index)}>
                {lstGender.map(renderOption)}
            </Select>
            <Input style={styles.layout}
                placeholder='Masukan umur anda'
                value={umur}
                onChangeText={txtUmur => setUmur(txtUmur)} />

            <Select style={styles.layout}
                selectedIndex={new IndexPath(marital)}
                placeholder='Marital Status'
                value={lstMarital[marital.row]}
                onSelect={index => setMarital(index)}>
                {lstMarital.map(renderOption)}
            </Select>
            <RNCamera
                    ref={ref => {
                        camera = ref;
                    }}
                    style={{flexDirection: 'row', justifyContent: 'center', height:100 , width:100 }}
                    type={RNCamera.Constants.Type.front}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}

                />
          
            <Card style={styles.containerPicture}>
                <Avatar style={styles.avatar} size='giant' source={{ uri: gambar }} />
               

                <Button onPress={() => takePicture()}>
                    Ambil Foto
            </Button>

            </Card>
            <Card style={styles.containerPicture}>
                <Input style={styles.layout}
                    placeholder='Masukan lokasi anda'
                    value={gps}
                    onChangeText={location => setGps(location)} />
                <Button onPress={() => { }}>
                    Ambil Lokasi
            </Button>
            </Card>
            <Card style={styles.containerPicture}>
                <Button onPress={() => { updateImage() }}>
                    Submit
            </Button>
            </Card>
        </Layout>
        </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    
    layout: {
        margin: 15,
        alignItems: 'center',
    },

    containerPicture: {


        flexDirection: 'column',
        justifyContent: 'space-between'

    },
    avatar: {
        alignItems: 'center',
        margin: 8,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
      },

});

export default UpdateScreen

