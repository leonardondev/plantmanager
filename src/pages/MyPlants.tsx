import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { Header } from '../components/Header';
import { PlantCardSecundary } from '../components/PlantCardSecundary';


import colors from '../styles/colors';
import fonts from '../styles/fonts';
import waterdrop from '../assets/waterdrop.png' 
import { loadPlant, Plant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Load } from '../components/Load';



export function MyPlants() {
  const [myPlants,setMyPlants] = useState<Plant[]>([]);
  const [loading,setLoading] = useState(true);
  const [nextWatered,setNextWatered] = useState('');
  
  
  async function loadStorage() {
    const plantsStoraged = await loadPlant();

    const nextTime = formatDistance(
      new Date(plantsStoraged[0].dateTimeNotification).getTime(),
      new Date().getTime(),
      { locale: ptBR }
    )

    setNextWatered(
      `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`
    )

    setMyPlants(plantsStoraged);
    setLoading(false);
  }

  useEffect(() => {
     loadStorage();
  },[]);

  return (
    loading ? (<Load />) : (
      <View style={styles.container}>
        <Header />

        <View style={styles.spotlight}>
          <Image
            source={waterdrop}
            style={styles.spotlightImage}
          />
          <Text style={styles.spotlightText}>{nextWatered}</Text>
        </View>
        <View style={styles.plants}>
          <Text style={styles.plantsTitle}>Próxima regadas</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            data={myPlants}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardSecundary data={item} />
            )}
            onEndReachedThreshold={0.1}
            // onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
            // ListFooterComponent={
            //   loadingMore ? <ActivityIndicator color={colors.green} /> : null
            // }
          />
        </View>
      </View>
    )
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },

  spotlight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 110,
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  spotlightImage: {
    width: 60,
    height: 60,
  },

  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },

  plants: {
    flex: 1,
    width: '100%',
  },

  plantsTitle: {
    fontFamily: fonts.text,
    fontSize: 24,
    color: colors.heading,
    paddingVertical: 10,
  },
})