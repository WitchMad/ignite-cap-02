import Modal from "react-modal";

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";

import closeImg from "../../assets/close.svg";
import React, { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";

interface IProps {
  isNewTransactionModalOpen: boolean;
  handleCloseNewTransactionModal: () => void;
}

export function NewTransactionModal(props: IProps) {
  const { createTransaction } = useTransactions()

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState("deposit");

  async function handleCreateNewTransaction(e: React.FormEvent) {
    e.preventDefault();
  
    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    props.handleCloseNewTransactionModal();

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
  }

  return (
    <Modal
      isOpen={props.isNewTransactionModalOpen}
      onRequestClose={props.handleCloseNewTransactionModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        className="react-modal-close"
        onClick={props.handleCloseNewTransactionModal}
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type="number" placeholder="Valor" value={amount} onChange={(e) => setAmount(Number(e.target.value))}/>
        <TransactionTypeContainer>
          <RadioBox type="button" onClick={() => setType("deposit")} isActive={type === 'deposit'} activeColor="green">
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox type="button" onClick={() => setType("withdraw")} isActive={type === 'withdraw'} activeColor="red">
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)}/>
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
