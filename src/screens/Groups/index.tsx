import { useState } from 'react';
import { FlatList } from 'react-native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCards } from '@components/GroupsCard'
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';

export  function Groups() {
  const [groups, setGroups] = useState<[string]>(["Rodrigo"]);
 
  return (
    <Container>
      <Header />
      <Highlight
        title="Turmas"
        subtitle="Jogue com a sua turma"
      />

    <FlatList
      data={groups}
      keyExtractor = {item => item}
      renderItem={({ item }) => (
        <GroupCards
          title = {item}
        /> 
      )}    

    //  contentContainerStyle = {groups.length === 0 && { flex:1}}
       ListEmptyComponent={() => (
        <ListEmpty
          message="Que tal cadastrar a primeira turma?"
        />
       )}
    /> 
      <Button
      title = "crie uma nova turma"
     
      />
    </Container>
  );
}

