import "./App.css";
import ToDoList from "./components/todo-list/todo-list";
import CreateTodo from "./components/create-todo/create-todo";
import Filters from "./components/filters/filters";
import ToDoTopBar from "./components/todo-top-bar/todo-top-bar";

function App() {
	return (
		<div className='App'>
			<div className='bg'></div>
			<div className='Container'>
				<ToDoTopBar/>
				<CreateTodo />
				<div className='list'>
					<ToDoList />
				</div>
				<div className='filters-container'>
					<Filters />
				</div>
				<p className='drag-and-drop-p'>Drag and drop to reorder list.</p>
			</div>
		</div>
	);
}

export default App;
