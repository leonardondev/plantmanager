import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
  const [page,setPage] = useState(1);
  const [loadingMore,setLoadingMore] = useState(true);
  const [username,setUsername] = useState('');
  
  
  async function fetchPlants() {
    const { data } = await api.get(`/plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

    if (!data) {
      setloading(true);
    }

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data]);      
    } else{
      setPlants(data);
      setFilteredPlants(data);
    }

    setloading(false);
    setLoadingMore(false);
  }

  async function fetchEnvironments() {
    const { data} = await api.get('/plants_environments?_sort=title&_order=asc');

    setEnvironments([
      { key: 'all', title: 'Todos' },
      ...data
    ]);
  }

  async function loadStorageUserName() {
    const user = await AsyncStorage.getItem("@plantmanager:user");
    setUsername(user || '');
  }

  function handleEnvironmentSelected(key: string) {
    setEnvironmentSelected(key);

    if(key === 'all') {
      setFilteredPlants(plants);
      return;
    }

    const filtered = plants.filter(plant => plant.environments.includes(key));
    setFilteredPlants(filtered);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1 );

    fetchPlants()
  }
  
  useEffect(() => {
    fetchEnvironments(); 
  },[]);

  useEffect(() => {
    fetchPlants();
  },[]);

  useEffect(() => {
     loadStorageUserName();
  },[]);
  

  return (
    loading ? (<Load />) : (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Header title="Olá" titleBold={username} />
          <Text style={styles.title}>
            Em qual ambiente
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
            keyExtractor={item => String(item.key)}
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
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
            ListFooterComponent={
              loadingMore ? <ActivityIndicator color={colors.green} /> : null
            }
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