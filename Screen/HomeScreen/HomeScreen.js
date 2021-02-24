import React, {useEffect}from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {

  useEffect(() => {
    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
      });
    return () => {

    }
  }, [])


  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>HOME</Text>
    </Layout>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
