import { useTodoContext } from "../../store/todoContext";
import { useRef, KeyboardEvent } from "react";
import classes from "./create-todo.module.css";
import checkIcon from '../../assets/icon-check.svg'
import sendIcon from '../../assets/icon-send.svg'
function CreateTodo() {
	const { addTodo, toggleIsCompleted, isCompleted } = useTodoContext();

	const inputRef = useRef<HTMLInputElement>(null);

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			addTodo(inputRef!.current!.value);
			inputRef!.current!.value = "";
		}
	};
	const addTodoHandler = () => {
		if (inputRef!.current!.value != "") {
			addTodo(inputRef!.current!.value);
			inputRef!.current!.value = "";
		}
	};
	return (
		<div className={classes["create-todo-box"]}>
			<div
				className={`${
					isCompleted ? `${classes["circle-background"]}` : `${classes.circle}`
				}`}
				onClick={toggleIsCompleted}
			>
				<img data-cy='set-complete-svg' src={checkIcon}></img>
			</div>
			<input
			data-cy='todo-input'
				className={classes["create-todo"]}
				type='text'
				placeholder='Create a new todo...'
				ref={inputRef}
				onKeyDown={handleKeyDown}
			/>
			<img
				className={classes["add-todo-svg"]}
				src={sendIcon}
				onClick={addTodoHandler}
				data-cy='add-todo-svg'
			></img>
		</div>
	);
}
export default CreateTodo;
