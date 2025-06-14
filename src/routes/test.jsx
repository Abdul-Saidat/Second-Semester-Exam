import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from "@tanstack/react-query";
export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

const fetchTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) throw new Error("failed to fetch");
  return response.json();
};

function RouteComponent() {
  // const [page, setPage] = useState(1)
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // const PER_PAGE = 5;
  // const total = data?.results?.length
  // const pages = 200

  // const skip = page * PER_PAGE - PER_PAGE
  if (isPending)
    return (
      <div className="flex w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
  <form action="">
      <h1>TODO-LIST</h1>
      <div className="flex items-center justify-center ">
        <div className="bg-slate-800 text-amber-600 ">
          <ul>
            {data.map((task) => (
              <div key={task.id}>
                <strong>{task.title}</strong> —<span>Completion Status:</span>{" "}
                {task.completed ? "Completed" : "Not Completed"}
              </div>
            ))}
          </ul>
          <div>{isFetching ? "Updating..." : ""}</div>
        </div>
      </div>
      </form>
    </>
    
  );
  
}



 

{
  /* 
  <ul>
         <div key={data.id}>{data.completed ? '✅' : '❌'}
          <strong>{data.title}</strong>  — 
        </div>
       </ul> */
}
{
  /* // function RouteComponent() 
    {/* const { isPending, error, data, isFetching } = useQuery({ */
}
{
  /* queryKey: ['repoData'],
     queryFn: async () => { */
}
{
  /* //       const response = await fetch(
//         'https://api.github.com/repos/TanStack/query',
//       )
//       return await response.json()
//     },
//   })
//    if (isPending) return 'Loading...' */
}

{
  /* //   if (error) return 'An error has occurred: ' + error.message


//   return (
//     <>
//     <div>
//       <h1>{data.full_name}</h1>
//       <p>{data.description}</p>
//       <strong>👀 {data.subscribers_count}</strong>{' '}
//       <strong>✨ {data.stargazers_count}</strong>{' '}
//       <strong>🍴 {data.forks_count}</strong>
//       <div>{isFetching ? 'Updating...' : ''}</div>
//       <h1>Todo-List</h1>
//     </div>
    
//     </>
//   )
// } */
}



// const fetchTodos = async (page) => {
//   const response = await fetch(
//     "https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10"
//   );
//   if (!response.ok) throw new Error("failed to fetch");
//   return response.json();
// };

// function RouteComponent() {
//   const [page, setPage] = useState(1);
//   const { isPending, error, data, isFetching } = useQuery({
//     queryKey: ["todos", page],
//     queryFn: () => fetchTodos(page)
//   });

//   const PER_PAGE = 5;
//   const total = data?.results?.length
//   // const pages = 200

//   // const skip = page * PER_PAGE - PER_PAGE
//   if (isPending)
//     return (
//       <div className="flex w-52 flex-col gap-4">
//         <div className="skeleton h-32 w-full"></div>
//         <div className="skeleton h-4 w-28"></div>
//         <div className="skeleton h-4 w-full"></div>
//         <div className="skeleton h-4 w-full"></div>
//       </div>
//     );

//   if (error) return "An error has occurred: " + error.message;
//   const handleSubmit = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <>
//         <h1 className="flex items-center justify-center">TODO-LIST</h1>
//       <form action="" onSubmit={handleSubmit}>
//         <div className=" w-120 border-amber-50 rounded-2xl ">
//           <div className=" text-amber-600  ">
//             <ul>
//               {data.map((task) => (
//                 <div key={task.id}>
//                   <strong>{task.title}</strong>
//                   {/* —<span>Completion Status:</span>{" "} */}
//                   {/* {task.completed ? "Completed" : "Not Completed"} */}
//                 </div>
//               ))}
//             </ul>
//             <div>{isFetching ? "Updating..." : ""}</div>
//             <div className="join grid grid-cols-2">
//               <button className="join-item btn btn-outline" onClick={() => setPage(prev => prev > 1? prev - 1 : 1)}>
//                 Previous page
//               </button>
//               <button className="join-item btn btn-outline" onClick={() => setPage(prev => prev + 1)}>Next</button>
//             </div>
//             {/* <button className="border-4 border-amber-50 text-amber-500 px-3 py-1"  onClick={() => setPage(prev => prev > 1? prev - 1 : 1)}>Prev</button>
//           <p>Current Page: {page} </p>
//       <button className=" text-amber-500 px-3 py-1" onClick={() => setPage(prev => prev + 1)}>Next</button> */}
//           </div>
//         </div>
//       </form>
//     </>
//   );
// }

// // Inside your RouteComponent function (e.g., at the top before the return)
// const [checkedTodos, setCheckedTodos] = useState(() => {
//     // 1. Define a consistent key for localStorage
//     const localStorageKey = 'myCheckedTodoIds';

//     // 2. Try to get the stored string from localStorage
//     const storedTodosString = localStorage.getItem(localStorageKey);

//     // 3. If a string was found, parse it back into an array
//     if (storedTodosString) {
//         try {
//             // Attempt to parse the JSON string.
//             // It's good practice to wrap JSON.parse in a try-catch in case of corrupted data.
//             return JSON.parse(storedTodosString);
//         } catch (error) {
//             // If parsing fails, log the error and return an empty array
//             console.error("Failed to parse checked todos from localStorage:", error);
//             return [];
//         }
//     }

//     // 4. If nothing was found in localStorage, return an empty array as default
//     return [];
// });

// // ... rest of your RouteComponent code ...

// // You will also need a useEffect to SAVE checkedTodos whenever it changes
// useEffect(() => {
//     // Convert the array to a JSON string before saving
//     localStorage.setItem('myCheckedTodoIds', JSON.stringify(checkedTodos));
// }, [checkedTodos]); // This dependency array ensures it runs whenever checkedTodos changes

  