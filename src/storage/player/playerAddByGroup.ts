import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { playersGetByGroup } from './playersGetByGroup'
import { PlayerStorageDTO } from './PlayerStorageDTO';

export async function PlayerAddByGroup(newPlayer:PlayerStorageDTO, group: string ){
    try{
        /*
           logica @ignite-teams:players-rocketseat:[]
        */
        const storedPlayers = await playersGetByGroup(group);

        const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name);

        if(playerAlreadyExists.length > 0){
            throw new AppError('Essa pessoa já esta adicionada em um time');
        }

        const storage = JSON.stringify([...storedPlayers, newPlayer]);

        await AsyncStorage.setItem (`${PLAYER_COLLECTION}-${group}`,'');
        }catch(error){
        throw (error);
        }
    }  