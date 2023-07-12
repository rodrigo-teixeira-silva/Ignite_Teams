import { useState, useEffect, useRef } from 'react';
import { FlatList, Alert, TextInput } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { PlayerAddByGroup } from '@storage/player/playerAddByGroup';
import { groupRemoveByName } from '@storage/group/groupeRemoveByName';
import { playersRemoveByGroup } from '@storage/player/playerRemoveByGroups';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupsAndTeam';

import { AppError } from "@utils/AppError";

import { Input } from "@components/Input";
import { Button } from '@components/Button';
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from '@components/ListEmpty';
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from '@components/PlayerCard';
import { Loading } from '@components/Loading';

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";


type RouteParams = {
  group: string;
}

export function Players() {

  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute();

  const { group } = route.params as RouteParams;
  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.');
    }
  
  const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await PlayerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
      fetchPlayersByTeam();
    }catch (error) {
      if(error instanceof AppError){
        Alert.alert('Nova pessoa', error.message);
      } else{
        console.log(error);
        Alert.alert('Nova pessoa', 'Não foi possível adicionar.');
      }
    }
  }

  async function fetchPlayersByTeam(){
    try{
        setIsLoading(true);

        const playersByTeam = await playersGetByGroupAndTeam( group, team );
        setPlayers(playersByTeam);
        setIsLoading(false);
    }catch(error){
      console.log(error)
      Alert.alert('Não foi possível carregar as pessoas do time selecionado');
      }
  }

  async function handlePlayerRemove(playerName:string) {
  try{
    await playersRemoveByGroup(playerName, group);
    fetchPlayersByTeam();

  }catch{
    console.error();
    Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa');
  
  }
  }

  async function groupRemove(){
    try{
      await groupRemoveByName(group);
      navigation.navigate('groups');

    }catch{
      console.error();
      Alert.alert('Remove grupo', 'Não foi possível remover grupo.');
    }

  }
  
  async function handleGroupRemove() {
    Alert.alert(
      'remover',
      'Deseja remover o grupo?',
      [
        { text: 'não', style: 'cancel'},
        { text: 'sim', onPress: () => groupRemove()}
      ]
    );
  }

useEffect(() => {
console.log('useEffect executou');
fetchPlayersByTeam();
}, [team]);

return (
  <Container>
    <Header showBackButton/>
      <Highlight
        title={group}
        subtitle="adiciona a  galera e separe os times"           
    />

    <Form>
      <Input
        inputRef={newPlayerNameInputRef}
        onChangeText = {setNewPlayerName}
        value={newPlayerName}
        placeholder="Nome da Pessoa"
        autoCorrect = {false}
        onSubmitEditing={handleAddPlayer}
        returnKeyType="done"
      />

    <ButtonIcon icon="add" 
        onPress={handleAddPlayer}
    />
    </Form>
      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item=>item}
          renderItem={({ item })=>(
        <Filter
          title={item}
          isActive ={item === team}
          onPress={() =>setTeam(item)}
      />

    )}
      horizontal
    />

  <NumbersOfPlayers>
    {players.length}
  </NumbersOfPlayers>
    </HeaderList>
{
  isLoading ? <Loading/> :

  <FlatList
    data={players}
    keyExtractor={item => item.name}
    renderItem={({ item })=> (           
      <PlayerCard
        name={item.name}
        onRemove={() => handlePlayerRemove(item.name)}
      />
    )}

    ListEmptyComponent={() =>(
  <ListEmpty
    message="Não há pessoas nesse time"
  />
        
  )}
    showsVerticalScrollIndicator= {false}
    contentContainerStyle ={[
    {paddingBottom: 100},
     players.length === 0 && {flex: 1}
  ]}
  />

}
  <Button
    title="Remover turma"
    type="SECONDARY"
    onPress={handleGroupRemove}
  />
  
</Container>
  );
}
