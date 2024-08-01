import { useTodoContext } from "../../store/todoContext";
import classes from "./filters.module.css";

function Filters() {
	const { handleFiltersChange, filters } = useTodoContext();
	return (
		<div className={classes.filters}>
			<button
				className={`${
					filters === "all" ? `${classes.active}` : `${classes["button-text"]}`
				}`}
				onClick={() => handleFiltersChange("all")}
			>
				All
			</button>
			<button
				className={`${
					filters === "active"
						? `${classes.active}`
						: `${classes["button-text"]}`
				}`}
				onClick={() => handleFiltersChange("active")}
			>
				Active
			</button>
			<button
				className={`${
					filters === "completed"
						? `${classes.active}`
						: `${classes["button-text"]}`
				}`}
				onClick={() => handleFiltersChange("completed")}
			>
				Completed
			</button>
		</div>
	);
}
export default Filters;
