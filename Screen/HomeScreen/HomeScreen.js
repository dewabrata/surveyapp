import React, {useEffect,useState}from 'react'
import {View,FlatList, StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {

  const [users, setUsers] = useState([]); // Initial empty array of users

  useEffect(() => {
    const dataa = firestore()
      .collection('users')
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


  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text category='h1'>HOME</Text> */}
      <FlatList data = {users} renderItem={({item})=>(
         <View style={{ height: 100, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>User email: {item.email}</Text>
         <Text>User Name: {item.name}</Text>
         <Text>User Alamat : {item.address}</Text>
       </View>
      )}/>
    </Layout>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    maxHeight: 180,
  },
});
