import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import styled from "styled-components";
import { useCookies } from "react-cookie";

import voc from "./vocabulary";

const Page = styled.div`
  padding-top: 5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

const ButtonsContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  margin-top: 1rem;
  margin-left: 0.5rem;
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

function shuffle(array, exclude) {
  return array
    .filter((item) => !exclude || !exclude.includes(item.en))
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["exclude"]);

  const [list, setList] = useState(shuffle(voc, cookies.exclude));
  const [card, setCard] = useState(0);

  const [cardDirection, setCardDirection] = useState(false);
  const [hideResult, setHideResult] = useState(false);
  const [cardFlipSpeed, SetCardFlipSpeed] = useState(0.6);

  function nextCard() {
    setHideResult(true);
    setCardDirection(!cardDirection);
    setCard(card + 1);
    setTimeout(() => setHideResult(false), 1000);
  }
  function showBack() {
    setCardDirection(!cardDirection);
  }
  function handleShuffle(noExcludes = false) {
    setHideResult(true);
    SetCardFlipSpeed(0.1);
    setList(shuffle(voc, noExcludes ? [] : cookies.exclude));
    setCard(0);
    setCardDirection(false);
    setTimeout(() => {
      setHideResult(false);
      SetCardFlipSpeed(0.6);
    }, 1000);
  }
  function handleBack() {
    setCard(card - 1);
  }
  function handleExclude() {
    setCookie(
      "exclude",
      cookies.exclude ? [...cookies.exclude, list[card].en] : [list[card].en]
    );
    setList(list.filter((_, idx) => idx !== card));
  }
  function handleReset() {
    if (
      window.confirm("This will bring back all the excluded words. Continue?")
    ) {
      removeCookie("exclude");
      handleShuffle(true);
    }
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
            <Title>{list[card].en}</Title>
          </Card>
          <Card onClick={nextCard}>
            <Title>{!hideResult && list[card].pt}</Title>
          </Card>
        </ReactCardFlip>
        <Text>
          {card + 1} out of {list.length}
        </Text>
        <ButtonsContainer>
          <Button onClick={handleBack}>Back</Button>
          <Button onClick={handleExclude} disabled={card === 0}>
            Exclude
          </Button>
        </ButtonsContainer>
        <ButtonsContainer>
          <Button onClick={() => handleShuffle()}>Reshuffle</Button>
          <Button onClick={handleReset}>Reset</Button>
        </ButtonsContainer>
      </Container>
    </Page>
  );
}

export default App;
