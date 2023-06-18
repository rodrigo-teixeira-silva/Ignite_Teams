import { Header } from "@components/Header";
import { Container, Content, Icon} from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "style-components";

export function NewGroup (){
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
            />
           </Content>
        </Container>



    );




}