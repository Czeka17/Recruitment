import classes from "./todo.module.css";
import checkIcon from '../../assets/icon-check.svg'
import crossIcon from '../../assets/icon-cross.svg'
interface TodoProps {
	todo: {
		id: string;
		text: string;
		completed: boolean;
	};
	toggleTodoCompletion: (id: string) => void;
	deleteTodo: (id: string) => void;
}
function Todo({ todo, toggleTodoCompletion, deleteTodo }: TodoProps) {
	return (
		<div
			key={todo.id}
			className={classes.todo}
            data-cy='todo-item'
		>
			<div
				className={` ${
					todo.completed ? `${classes["circle-background"]}` : `${classes.circle}`
				}`}
				onClick={() => toggleTodoCompletion(todo.id)}
			>
				<img src={checkIcon} alt="check icon"></img>
			</div>
			<div className={classes["todo-text"]}>
				<p data-cy='todo-p' className={`${todo.completed ? `${classes.completed}` : `${classes['not-completed']}`}`}>
					{todo.text}
				</p>
			</div>
			<img
			data-cy='delete-todo-svg'
				src={crossIcon}
				className={classes['cross-icon']}
				alt='cross Icon'
				onClick={() => deleteTodo(todo.id)}
			/>
		</div>
	);
}
export default Todo;
