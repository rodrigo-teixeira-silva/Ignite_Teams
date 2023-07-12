import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { groupGetAll } from '@storage/group/groupGetAll';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCards } from '@components/GroupsCard'
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';
import { Loading } from '@components/Loading';

export  function Groups() {

  const [isLoading, setIsLoading] = useState(true);

  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroup(){
    try{
      setIsLoading(true);

    const data = await groupGetAll();
    setGroups(data);
    setIsLoading(false);

    }catch(error){
      console.log(error);
    }
  }

  function handleOpenGroups(group: string){
    navigation.navigate('players', {group});
  }

  useFocusEffect(useCallback(() => {
  console.log("useFocusEffect executou")
  fetchGroup();
  }, []));
return (
    <Container>
      <Header />
      <Highlight
        title="Turmas"
        subtitle="Jogue com a sua turma"
      />
{isLoading ?<Loading/>:
    <FlatList
      data={groups}
      keyExtractor = {item => item}
      renderItem={({ item }) => (
        <GroupCards
          title = {item}
          onPress={() => handleOpenGroups(item)}
        /> 
      )}    

    //  contentContainerStyle = {groups.length === 0 && { flex:1}}
       ListEmptyComponent={() => (
        <ListEmpty
          message="Que tal cadastrar a primeira turma?"
        />
       )}
    /> 
  }
      <Button
      title = "crie uma nova turma"

      onPress={handleNewGroup}
      />
    </Container>
  );
}

