import { useState, useSyncExternalStore } from "react"

export default function List({ title, completed, id, todoData, setTodoData }) {
    // todoData를 바꾸기 위하여 setTodoData를 쓴다.
    const [isEditing, setIsEditing] = useState(false); // state 만듦
    const [editedTitle, setEditedTitle] = useState(title);

    const btnStyle = { // 스타일링
        color: '#fff',
        border: 'none',
        padding: '5px 9px',
        borderRadius: '50%',
        cursor: 'pointer',
        float: 'right'
    }

    const getStyle = (completed) => { // 인수로 내려서 동적으로 사용 가능한 스타일링 함수
        return {
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: completed ? 'line-through' : 'none', // 조건부 삼항 연산자
            // complted가 true이면, 'line-through'사용 / false면, 'none'사용
        }
    }

    const handleClick = (id) => { // filter 매소드를 통해서 삭제 버튼 누르면 삭제해줌
        let newTodoData = todoData.filter((data) => data.id !== id) // todoData 객체들 id와 삭제한 id가 다른 애들만 다시 배열 생성해야함
        console.log(newTodoData);
        setTodoData(newTodoData); // 변경사항이 있을 시 바로 랜더링 해주는 state를 씀.
        localStorage.setItem('todoData', JSON.stringify(newTodoData)) //local 저장소에 저장시켜줌. window 브라우저 제공
                    // JSON.stringify() == 문자열로 바꿔줌. (위에서는 배열을 문자열로 바꿨음)
    }

    const handleCompleteChange = (id) => {
        let newTodoData = todoData.map((data) => {
            if (data.id === id) {
                data.completed = !data.completed; // data.completed는 true 혹은 false인데,
                // !data.completed하면 무조건 false 이다.
            }
            return data;
        })
        setTodoData(newTodoData); // newTodoData로 업데이트 해줌
        localStorage.setItem('todoData', JSON.stringify(newTodoData)) // 체크 하는 부분도 로컬에 저장
    }
    
    const handleEditChange = (e) => { // edit을 누른 후 input에 입력이 되도록 한다
        setEditedTitle(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // 기본적으로 페이지 refresh되는걸 막아줌 (save 버튼 누를 시 적용 시켜줌)
        
        // 불변성을 지키기 위하여 새로운 newTodoData 배열에 복제해줌
        const newTodoData = todoData.map((data)=> { // 모든 data 배열 순회
            if(data.id === id) { // edit 누른 데이터와 비교
                data.title = editedTitle; // 찾았으면 원래 데이터에 넣어줌
            }
            return data; //찾는거 제외한 나머지 데이터들은 수정할 필요 없어서 그냥 리턴
        })

        setTodoData(newTodoData); // 새로 복제한 배열을 넣어줌
        localStorage.setItem('todoData', JSON.stringify(newTodoData)) // edit으로 변경 시 로컬에 저장
        setIsEditing(false); // 에디팅도 끝났으니 닫아준다
    }

    if (isEditing) {
        return (
            <form style={getStyle(completed)} onSubmit={handleSubmit}>   {/* form에 스타일링 줌 */}
                <input
                    value={editedTitle} // input해서 해당 타이틀을 가지고 있는 곳
                    autoFocus // edit 눌렀을 때 포커스 되도록 함
                    onChange={handleEditChange}
                />
                <button type="button" style={btnStyle} onClick={() => setIsEditing(false)}>X</button>
                {/* save버튼 클릭 했을 때, input하는거 닫히게 하는 키 */}
                <button type="submit" style={btnStyle}>Save</button>
            </form>
        )
    } else {
        return <div style={getStyle(completed)}>
            <input type='checkbox'
                onChange={() => handleCompleteChange(id)}
                checked={completed} />
            {title}
            <button style={btnStyle} onClick={() => handleClick(id)}>X</button>
            <button style={btnStyle} onClick={() => setIsEditing(true)}>Edit</button>
        </div>
    }

}