import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";

interface IProps {
  onOpenNewTransactionModal: () => void;
}

export function Header(props: IProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dtmoney" />
        <button type="button" onClick={props.onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
}
