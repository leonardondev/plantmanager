import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Environment {
  key: string;
  title: string;
}

interface Plant {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: Array<string>;
  frequency: {
    times: number;
    repeat_every: string;
  }
}

export function PlantSelect() {
  const [environments,setEnvironments] = useState<Environment[]>([]);
  const [plants,setPlants] = useState<Plant[]>([]);
  const [filteredPlants,setFilteredPlants] = useState<Plant[]>([]);
  const [environmentSelected,setEnvironmentSelected] = useState('all');
  const [loading,setloading] = useState(true);
  
  
  useEffect(() => {
     api.get('/plants_environments?_sort=title&_order=asc')
     .then(response => {
        setEnvironments([
          { key: 'all', title: 'Todos' },
          ...response.data
        ])
     })
  },[]);

  useEffect(() => {
    api.get('/plants?_sort=name&_order=asc').then(response => {
      setPlants(response.data)
      setFilteredPlants(response.data)
      setloading(false)
    })
  },[]);

  function handleEnvironmentSelected(key: string) {
    setEnvironmentSelected(key);

    if(key === 'all') {
      setFilteredPlants(plants);
      return;
    }

    const filtered = plants.filter(plant => plant.environments.includes(key));
    setFilteredPlants(filtered);
  }

  return (
    loading ? (<Load />) : (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Header title="Olá" titleBold="Leonardo" />
          <Text style={styles.title}>
            Em qual hambiente
          </Text>
          <Text style={styles.subtitle}>
            você quer colocar sua planta?
          </Text>
        </View>

        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.environmentList}
            data={environments}
            renderItem={({item }) => (
              <EnvironmentButton
                title={item.title}
                active={item.key === environmentSelected}
                onPress={() => handleEnvironmentSelected(item.key)}
              />
            )}
          >
          </FlatList>
        </View>
          
        <View style={styles.plants}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={filteredPlants}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardPrimary data={item} />
            )}
          >      
          </FlatList>
        </View>
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 32,
  },

  title: {
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading,
    lineHeight: 23,
    marginTop: 15,
  },

  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.heading,
    lineHeight: 20,
  },

  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingHorizontal: 32,
    marginVertical: 32,
  },

  plants: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 8,
    justifyContent: 'center',
  },
})