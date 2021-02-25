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
const InputScreen = () => {
    const [nama, setNama] = useState("")
    const [gender, setGender] = useState(0)
    const [umur, setUmur] = useState("")
    const [marital, setMarital] = useState(0)
    const [gps, setGps] = useState("")
    const [gambar,setGambar] = useState('https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/performer%20images/p844030/ChelseaIslan.jpg')
    // const [namaGambar,setNamaGambar] = useState()

    const renderOption = (title) => (

        <SelectItem key={title} title={title} />
    );
    
   useEffect(() =>{
   
    Geolocation.getCurrentPosition(info => {
    
    setGps(info.coords.longitude +";"+info.coords.latitude)
    
    });

   
   },[])
   
   
   const saveImage = () => {
   
    const namefile = ""+new Date();
   
    const reference = storage().ref(namefile);

    const pathToFile = gambar;
    // uploads file
    reference.putFile(pathToFile).then(() => {
         console.log("Uploaded")
         storage()
         .ref(namefile)
         .getDownloadURL().then((downloadData) =>{
            console.log(downloadData)
            console.log(namefile)
            saveData(downloadData,namefile)
         
         })
    });
   
   }
   
   const saveData = (downloadData,namaGambar) => {
     firestore()
    .collection('Users')
    .add({
      name: nama,
      gender: lstGender[gender.row],
      umur :umur,
      marital : lstMarital[marital.row],
      gps: gps,
      gambar: downloadData,
      namaGambar: namaGambar,
    })
    .then(() => {
      console.log('User added!');
    });
   
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
                    type={RNCamera.Constants.Type.back}
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
                <Button onPress={() => { saveImage() }}>
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

export default InputScreen

