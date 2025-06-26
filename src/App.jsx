import { useState } from 'react'
import './App.css'
import Lists from './components/Lists';
import Form from './components/Form';

export default function App() { // 함수형 컴포넌트

  const initialTodoData = localStorage.getItem('todoData') ? JSON.parse(localStorage.getItem('todoData')) : []; 
    // 로컬에 데이터가 있으면, 가져올 때 문자열을 배열로 바꿔서 가져옴 / 없으면 빈 배열

  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState(''); // value state 생성 (기본값 선언)

  const handleSubmit = (e) => {
    e.preventDefault(); // form 안에서 submit 이벤트가 발생했을 때, 페이지가 refresh가 되는걸 방지해줌.

    let newTodo = {
      id: Date.now(),
      title: value, // 입력할 때마다 state의 value값에서 기억해줘서 넣어줌
      completed: false, // 처음엔 false가 되어있어야함. 완성이 안되어 있으니까.
    }
    setTodoData([...todoData, newTodo]);// ...은 spreadOperator, 이걸 써서 원래 있던 애들을 얕은 복사를 해서 나열해주고, 그리고 새로운 객체를 뒤에 추가해준다.
    // state는 항상 불변성을 유지해야해서, ...을 이용해서 얕은 복사 한걸 넣어준다.
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo])) // 입력 버튼 누르면 로컬에 저장
    setValue('');
  }

  return (
    <div className='container'>
      <div className='todoBlock'>
        <div className='title'>
          <h1>할 일 목록</h1>
        </div>

        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
        />

        <Form
          handleSubmit={handleSubmit}
          value={value}
          setValue={setValue}
        />

      </div>
    </div>
  )
}
