import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import styled from "styled-components";

import voc from "./vocabulary";

const Page = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6e6e6;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.text`
  font-size: 22px;
`;

const Text = styled.text`
  font-size: 18px;
  padding-top: 2rem;
`;

const Card = styled.div`
  width: 300px;
  height: 350px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  background-color: white;
  cursor: pointer;
`;

const Button = styled.button`
  margin-top: 1rem;
  color: #494949 !important;
  text-decoration: none;
  background: #ffffff;
  padding: 5px;
  border: 1px solid #494949 !important;
  border-radius: 5px;
  display: inline-block;
  transition: all 0.4s ease 0s;
  cursor: pointer;
  font-size: 16px;
`;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function App() {
  const [currVoc, setCurrVoc] = useState(voc.map((x) => x));
  const [card, setCard] = useState(getRandomInt(voc.length - 1));
  const [cardDirection, setCardDirection] = useState(false);
  const [hideResult, setHideResult] = useState(false);
  const [cardFlipSpeed, SetCardFlipSpeed] = useState(0.6);

  function nextCard() {
    setHideResult(true);
    setCardDirection(!cardDirection);
    currVoc.splice(card, 1);
    setCard(getRandomInt(currVoc.length - 1));
    setTimeout(() => setHideResult(false), 1000);
  }
  function showBack() {
    setCardDirection(!cardDirection);
  }
  function restart() {
    setHideResult(true);
    SetCardFlipSpeed(0.1);
    setCurrVoc(voc.map((x) => x));
    setCard(getRandomInt(currVoc.length - 1));
    setCardDirection(false);
    setTimeout(() => {
      setHideResult(false);
      SetCardFlipSpeed(0.6);
    }, 1000);
  }
  return (
    <Page>
      <Container>
        <ReactCardFlip
          isFlipped={cardDirection}
          containerStyle={{ width: "300px" }}
          flipSpeedBackToFront={cardFlipSpeed}
          flipSpeedFrontToBack={cardFlipSpeed}
        >
          <Card onClick={showBack}>
            <Title>{currVoc[card].en}</Title>
          </Card>
          <Card onClick={nextCard}>
            <Title>{!hideResult && currVoc[card].pt}</Title>
          </Card>
        </ReactCardFlip>
        <Text>
          {currVoc.length - 1} out of {voc.length - 1}
        </Text>
        <Button onClick={restart}>Restart</Button>
      </Container>
    </Page>
  );
}

export default App;
