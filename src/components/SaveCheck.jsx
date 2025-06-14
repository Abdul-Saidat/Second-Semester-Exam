// import { useState, useEffect } from "react";
// function SaveCheck({todo}) {
//    const [checkedTodos, setCheckedTodos] = useState(() =>   {
//     const localStorageKey = 'checkedTodoIds'
//     const storedTodoString = localStorage.getItem(localStorageKey);
//     if (storedTodoString)  {
//         try {
//             return JSON.parse(storedTodoString)
//         } catch (warning) {
//             console.warning("couldn't parse checked todos from localStorage", warning)
//             return []
//         }
//     }
//     return []
//    })

//     useEffect(() => {
//         localStorage.setItem('checkedTodoIds', JSON.stringify(checkedTodos))
//     }, [checkedTodos])
//     // console.log("checked todos:", todo)
//     return (
//         <>

//          <input
//                       type="checkbox"
//                       name="todo-check"
//                       id="todo-check"
//                       checked={checkedTodos.includes(todo.id)}
//                       onChange={(e) => {
//                         if (e.target.checked) {
//                           setCheckedTodos([...checkedTodos, todo.id]);
//                         } else {
//                           setCheckedTodos(
//                             checkedTodos.filter((id) => id !== todo.id)
//                           );
//                         }
//                       }}
//                     />{" "}
//         </>
//     )
// }

// export default SaveCheck
