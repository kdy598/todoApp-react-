import List from "./List"; // Lists컴포넌트의 자녀 List 컴포넌트 import 시켜줌

export default function Lists({ todoData, setTodoData }) { // 함수형 컴포넌트
    // 부모 App.jsx에서 받아옴 (Lists.jsx는 자식 컴포넌트)
    // (props :: 내리는 방법을 뜻함)

    return <div>
        {
            todoData.map((data) => (
                <List 
                    key = {data.id}
                    title = {data.title}
                    completed = {data.completed}
                    id = {data.id}
                    todoData = {todoData}
                    setTodoData = {setTodoData}
                />
            ))
        }
    </div>
}