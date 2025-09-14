const CREATED_KEY = 'createdTodos';
type Todo = {
    id: number,
    title: string;
    completed: boolean;
    userId: number;
};

export function getCreatedTodos(): Todo[] {
    try {
        return JSON.parse(localStorage.getItem("createdTodos") || "[]") as Todo[]
    } catch {
        return []
    }
}

export function saveCreatedTodos(todos: Todo[]) {
    localStorage.setItem(CREATED_KEY, JSON.stringify(todos));
}