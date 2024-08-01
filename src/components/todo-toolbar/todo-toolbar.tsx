import { useTodoContext } from "../../store/todoContext";
import Filters from "../filters/filters";
import classes from "./todo-toolbar.module.css";

interface FiltersProps {
	length: number;
}
function ToDoToolbar({ length }: FiltersProps) {
	const { resetTodosCompletion } = useTodoContext();
	return (
		<div className={classes.toolbar}>
			<p className={classes["todos-length-text"]}>{length} items left</p>
			<div className={classes.filters}>
				<Filters />
			</div>
			<button
				className={classes["button-text"]}
				onClick={resetTodosCompletion}
			>
				Clear completed
			</button>
		</div>
	);
}
export default ToDoToolbar;
