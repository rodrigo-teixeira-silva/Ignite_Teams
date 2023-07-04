import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { playerGetByGroup } from './playersGetByGroup'
import { PayerStorageDTO } from './PlayerStorageDTO';



export async function PlayerAddByGroup(newPlayer :PayerStorageDTO , group: string ){
    try{
        const storedPlayers = await playerGetByGroup(group);

        const playerAlreadyExits = storedPlayers.filter(player => player.name === newPlayer.name);

        if(playerAlreadyExits.length>0){
            throw new AppError('Essa pessoa já esta adicionada em um time');
        }

        const storage = JSON.stringify([...storedPlayers, newPlayer]);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`,'storage');

    }catch(error){
    throw (error);
    }
}  