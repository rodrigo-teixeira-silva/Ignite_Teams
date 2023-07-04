import AsyncStorage from "@react-native-async-storage/async-storage";

import { PayerStorageDTO} from "./PlayerStorageDTO";
import { PLAYER_COLLECTION } from '@storage/storageConfig'

export async function playerGetByGroup(group: string) {
    try{

const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);

    const players: PayerStorageDTO[] = storage ? JSON.parse(storage): [];

    return players;

    }catch(error){
        throw error;
    }
}