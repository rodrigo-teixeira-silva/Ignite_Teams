import { Header } from "@components/Header";
import { ButtonIcon } from "@components/ButtonIcon";
import { Highlight } from "@components/Highlight";

import { Container } from "./styles";

export function Players() {

    return (
        <Container>
            <Header showBackButton/>
            <Highlight
                title="Nome da turma "
                subtitle="adiciona a a galera e separe os times"           
            />

            <ButtonIcon/>
        </Container>
    );
}