import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  filters: string;
  isDarkTheme: boolean;
  isCompleted: boolean;
  addTodo: (text: string) => void;
  toggleTodoCompletion: (id: string) => void;
  deleteTodo: (id: string) => void;
  resetTodosCompletion: () => void;
  handleFiltersChange: (filter: string) => void;
  toggleTheme: () => void;
  handleOnDragEnd:(result:any) => void
  toggleIsCompleted:() => void
}

interface TodosProviderProps {
  children: ReactNode;
}


const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<string>('all');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function toggleIsCompleted(){
    setIsCompleted(!isCompleted)
  }

  function handleOnDragEnd(result:any){
    if (!result.destination) return;
    const items = Array.from(filteredTodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem)

    setFilteredTodos(items)
    setTodos(items)
  }
  useEffect(() => {
    if (filters === 'all') {
      setFilteredTodos(todos);
    } else if (filters === 'active') {
      setFilteredTodos(todos.filter(todo => !todo.completed));
    } else if (filters === 'completed') {
      setFilteredTodos(todos.filter(todo => todo.completed));
    }
  }, [filters, todos]);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  const addTodo = (text: string) => {
    if (text.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text,
        completed: isCompleted
      };
      setTodos(prevTodos => [newTodo, ...prevTodos]);
      setFilteredTodos(prevTodos => [newTodo, ...prevTodos]);
      setIsCompleted(false);
    }
  };

  const toggleTodoCompletion = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos.filter(todo =>
      (filters === 'completed' && todo.completed) ||
      (filters === 'active' && !todo.completed) ||
      filters === 'all'
    ));
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos.filter(todo =>
      (filters === 'completed' && todo.completed) ||
      (filters === 'active' && !todo.completed) ||
      filters === 'all'
    ));
  };

  const resetTodosCompletion = () => {
    const updatedTodos = todos.map(todo => ({ ...todo, completed: false }));
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos.filter(todo =>
      (filters === 'completed' && todo.completed) ||
      (filters === 'active' && !todo.completed) ||
      filters === 'all'
    ));
  };

  const handleFiltersChange = (filter: string) => {
    setFilters(filter);
  };

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  const contextValue = {
    todos,
    filteredTodos,
    filters,
    isDarkTheme,
    isCompleted,
    addTodo,
    toggleTodoCompletion,
    deleteTodo,
    resetTodosCompletion,
    handleFiltersChange,
    toggleTheme,
    handleOnDragEnd,
    toggleIsCompleted
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodosProvider');
  }
  return context;
};
