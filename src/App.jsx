// 로고 가져오기
import "./App.css";
import { useState } from "react";

// 컴포넌트 간결하게 만들어주기 map, filter 함수
// useState로 입력한 task 내용 리렌더링 해주기

// 구조분해할당 & props 추출
function Cards({ title, context, onDelete, onDone }) {
  const onDelHandler = () => {
    onDelete(title, context);
  };

  const onDoneHandler = () => {
    onDone(title, context);
  };

  return (
    <div className="cardStyle">
      <div>My Task</div>
      <div className="cardTitle">{title}</div>
      <div className="cardContext">{context}</div>
      <div className="cardBtnArea">
        <button className="deleteBtn" onClick={onDelHandler}>
          삭제하기
        </button>
        <button className="doneBtn" onClick={onDoneHandler}>
          완료
        </button>
      </div>
    </div>
  );
}

// 완료 카드
function DoneCards({ title, context, onDelete, onUnDone }) {
  const onDelHandler = () => {
    onDelete(title, context);
  };

  const onUnDoneHandler = () => {
    onUnDone(title, context);
  };

  return (
    <div className="cardStyle">
      <div>My Task</div>
      <div className="cardTitle">{title}</div>
      <div className="cardContext">{context}</div>
      <div className="cardBtnArea">
        <button className="deleteBtn" onClick={onDelHandler}>
          삭제하기
        </button>
        <button className="backToWorkBtn" onClick={onUnDoneHandler}>
          완료 취소
        </button>{" "}
      </div>
    </div>
  );
}

function App() {
  const [title, setTitle] = useState(""); // 1. task 리렌더링을 위한 상태변수와 상태변경함수, useState함수 세팅
  const [context, setContext] = useState("");
  const [cards, setCards] = useState([]); // cards 영역, array는 []로 처리
  const [doneCards, setDoneCards] = useState([]); // 완료cards 영역

  // 2-2. task 내용 submit handler
  const onSubmitHandler = () => {
    setCards([...cards, { title, context }]); // 불변성: distructuring 후 신규 카드 추가
    setTitle(""); // title 필드 초기화
    setContext(""); // context 필드 초기화
    validateTitlearea(); // 유효성 검사
    validateContextarea(); // 유효성 검사
  };

  // *** 조건문으로 핸들러 함수 하나로 처리할 수 있을 것 같음 !바꿔보기 ***
  const onDeleteHandler = (cardTitle, cardContext) => {
    const updatedCards = cards.filter(
      (card) => card.title !== cardTitle || card.context !== cardContext
    );
    // card.title과 클릭한 카드의 타이틀이 같지않거나 card.context와 클릭한 카드 내용이 같지 않은 것들을 필터링해주고 그걸 state로 리렌더링해준다.
    setCards(updatedCards);
  };

  const onDoneHandler = (cardTitle, cardContext) => {
    const updatedCards = cards.filter(
      (card) => card.title !== cardTitle || card.context !== cardContext
    );
    const doneCard = cards.find(
      (card) => card.title === cardTitle && card.context === cardContext
    );

    setCards(updatedCards);
    setDoneCards([...doneCards, doneCard]);
  };

  const onUnDoneHandler = (cardTitle, cardContext) => {
    const updatedDoneCards = doneCards.filter(
      (card) => card.title !== cardTitle || card.context !== cardContext
    );
    const undoneCard = doneCards.find(
      (card) => card.title === cardTitle && card.context === cardContext
    );
    setDoneCards(updatedDoneCards);
    setCards([...cards, undoneCard]);
  };

  const onDeleteHandlerForUnDone = (cardTitle, cardContext) => {
    const updatedDoneCards = doneCards.filter(
      (card) => card.title !== cardTitle || card.context !== cardContext
    );

    setDoneCards(updatedDoneCards);
  };

  // 유효성 검사
  const validateTitlearea = () => {
    const titlearea = document.getElementById("myTitlearea");

    const value = titlearea.value.trim();

    if (value.length === 0) {
      alert("제목을 작성해주세요.");
      return false;
    }

    return true; // 유효성 검사 통과
  };

  const validateContextarea = () => {
    const contextarea = document.getElementById("myContextarea");

    const value = contextarea.value.trim();

    if (value.length === 0) {
      alert("내용을 작성해주세요.");
      return false;
    }

    return true; // 유효성 검사 통과
  };

  return (
    <div className="App">
      <div className="content">
        <header>
          <div>{/* <img className="App-logo" /> */}</div>
          <div className="h1">My Task List</div>
        </header>
        <div className="inputSection">
          <div className="h2">Task</div>
          <div>
            <textarea
              value={title}
              type="text"
              className="inputTitle"
              placeholder=" 제목"
              onChange={(event) => setTitle(event.target.value)}
              id="myTitlearea" // title 영역 유효성 검사를 위한 id 값
            />
          </div>
          <div>
            <textarea
              value={context}
              type="text"
              className="inputContext"
              placeholder=" 내용"
              onChange={(event) => setContext(event.target.value)}
              id="myContextarea" // context 영역 유효성 검사를 위한 id 값
            />
          </div>

          {/* 2-1. input에 onClick event handler로 setValue 해주기! */}
          <button className="mainBtn" onClick={onSubmitHandler}>
            추가하기
          </button>
        </div>
        <div className="main">
          <div className="workingCardsSection">
            <div className="h3">WORKING</div>
            {cards.map((card, index) => (
              <Cards
                key={index}
                title={card.title}
                context={card.context}
                onDelete={onDeleteHandler}
                onDone={onDoneHandler}
              />
            ))}
          </div>

          <div className="doneCardsSection">
            <div className="h3">DONE</div>
            {doneCards.map((card, index) => (
              <DoneCards
                key={index}
                title={card.title}
                context={card.context}
                onDelete={onDeleteHandlerForUnDone}
                onUnDone={onUnDoneHandler}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
