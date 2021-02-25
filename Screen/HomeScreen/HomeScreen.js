import React, {useEffect,useState}from 'react'
import {View, StyleSheet, Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Avatar, Button, Icon, List, ListItem } from '@ui-kitten/components';
import storage from '@react-native-firebase/storage';

const HomeScreen = ({navigation}) => {

  const [users, setUsers] = useState([]); // Initial empty array of users


  useEffect(() => {
    const dataa = firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const users = [];
  
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setUsers(users);
      });
    return () => dataa();
  }, [])

  const deleteData = (dataID,namaGambar) =>{
    console.log("delete : "+dataID)

    storage()
    .ref(namaGambar)
    .delete();

    firestore()
    .collection('Users')
    .doc(dataID)
    .delete()
    .then(()=>{
      Alert.alert("Data berhasil di hapus")
    });
  }

  const renderItemAccessory = (props,param) => (
    <View>
      <Button size='tiny' onPress={()=>{navigation.navigate('UpdateScreen',{
        dataID:param.key,
        dataName:param.name,
        dataUmur:param.umur,
        dataGambar:param.namaGambar,
        urlGambar:param.gambar,
      })}}>Update</Button>
      <Button size='tiny' onPress={()=>{deleteData(param.key,param.namaGambar)}}>Delete</Button>
    </View>    
  );

  const renderItemIcon = (props,gambar) => {
  console.log(props)
  return(
    <Avatar style={styles.avatar} size='giant' source={{uri:gambar}}  />
  )
  }


  const renderItem = ({ item, index }) => {
 
    console.log(item)
    return (
    <ListItem
      title={`${item.name} ${index + 1}`}
      description={`${item.gps} ${index + 1}`}
      accessoryLeft={(props)=>renderItemIcon(props,item.gambar)}
      accessoryRight={(props)=>renderItemAccessory(props, item)}
      gambar = {item.gambar}
    />
    )
  }
    
    
  
  ;
  
  
  return (
    <List
      style={styles.container}
      data={users}
      renderItem={renderItem}
    />
  );
};

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    maxHeight: 180,
  },
});
