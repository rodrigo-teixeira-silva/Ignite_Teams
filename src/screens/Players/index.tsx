
import { useState, useEffect, useRef } from "react";
import { FlatList, Alert, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";

import { AppError } from "@utils/AppError";

import { PlayerAddByGroup } from "@storage/player/playerAddByGroup";
import {playerGetByGroupAndTeams } from "@storage/player/playersGetGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO"; 

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";


import { Container, Form, HeaderList, NumbersOfPlayers} from "./styles";

type RouteParms ={
    group:string;
}

export function Players() {
    const [newPlayerName, setNewplayerName] = useState('');
    const [team, setTeam] =useState('Time A');
    const[players, setPlayers] = useState <PlayerStorageDTO[]>([]);

    const route =useRoute();
    const {group} = route.params as RouteParms

    const newPlayersNameImputRef 
    = useRef<TextInput>(null);

    async function handleAddPlayer(){
        if (newPlayerName.trim().length === 0){
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
        }

        const newPlayer = {
            name: newPlayerName,
            team,        
        }
         try{
            await PlayerAddByGroup(newPlayer, group);
            fetchPlayersByteam();
            
         }catch(error){
                if(error instanceof AppError){
                Alert.alert('Nova pessoa', error.message);
            }else{
                console.log(error);
                Alert.alert('Nova pessoa', 'Erro ao adicionar adicionar');
            }
    }
 }

async function fetchPlayersByteam(){
    try{
        const playersByteam = await playerGetByGroupAndTeams(group, team);
        setPlayers(playersByteam);
    }catch(error){
        console.log(error);
        Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado');

    }  
}

useEffect(() => {
    fetchPlayersByteam();
},[team]);

 return (
    <Container>
        <Header showBackButton/>
        <Highlight
            title={group}
            subtitle="adiciona a  galera e separe os times"           
        />

    <Form>

        <Input
           onChangeText = {setNewplayerName}
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

        <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({ item })=> (
                
                <PlayerCard 
                name={item.name}
                onRemove={() => {}}
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
        <Button
            title="Remover turma"
            type="SECONDARY"
        />
    </Container>
  );
}
