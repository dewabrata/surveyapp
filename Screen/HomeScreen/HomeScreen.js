import React, {useEffect,useState}from 'react'
import { StyleSheet } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Avatar, Button, Icon, List, ListItem } from '@ui-kitten/components';

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


  const renderItemAccessory = (props,param) => (
    <Button size='tiny' onPress={()=>{navigation.navigate('UpdateScreen',{dataID:param})}}>Update</Button>
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
      accessoryRight={(props)=>renderItemAccessory(props, item.key)}
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
