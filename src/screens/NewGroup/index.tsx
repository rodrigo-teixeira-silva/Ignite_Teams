import { Header } from "@components/Header";
import { Container, Content, Icon} from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";

export function NewGroup (){
    const navigation =useNavigation();

function handleNew(){
    navigation.navigate("players", {group: "devs"});
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