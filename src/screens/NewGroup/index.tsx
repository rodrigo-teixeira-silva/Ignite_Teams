import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { groupCreate } from "@storage/group/groupCreate";
import { Alert } from 'react-native'

import { Container, Content, Icon} from "./styles";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Header } from "@components/Header";

import { Highlight } from "@components/Highlight";


export function NewGroup (){
const [group, setGroup] = useState('');

const navigation =useNavigation();

 async function handleNew(){
    
    try{
    if(group.trim().length === 0){
    return Alert.alert('Novo Grupo', 'Informe o nome da turma.');
}

    await groupCreate(group);
    navigation.navigate("players", { group });

    }catch(error){
        if(Error instanceof AppError){
    Alert.alert('novo grupo', Error.message);
    }else{
        Alert.alert('novo grupo', 'Não foi possível criar um novo grupo');
        console.log(error);
        }
    }
    

}
return(
    <Container>
       <Header  showBackButton />
       <Content>
            <Icon/>
                <Highlight
                    title ="Nova Turma"
                    subtitle="Crie a Turma Para adicionar as Pessos"
                />
            <Input
                placeholder="Nome da turma "
                onChangeText={setGroup}
            
            />

        <Button
                title="Criar"
                style={{marginTop: 20 }}
                onPress={handleNew}
            />
        </Content>
</Container>
);

}