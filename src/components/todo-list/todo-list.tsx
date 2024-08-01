import Todo from "../todo/todo";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTodoContext } from "../../store/todoContext";
import classes from "./todo-list.module.css";
import ToDoToolbar from "../todo-toolbar/todo-toolbar";
function ToDoList() {
	const {
		deleteTodo,
		filteredTodos,
		toggleTodoCompletion,
		filters,
		handleOnDragEnd,
	} = useTodoContext();

	return (
		<div>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId='todos'>
					{(provided) => (
						<ul
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{filteredTodos.map((todo, index) => (
								<Draggable
									key={todo.id}
									draggableId={todo.id}
									index={index}
								>
									{(provided) => (
										<li
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<Todo
												todo={todo}
												toggleTodoCompletion={toggleTodoCompletion}
												deleteTodo={deleteTodo}
											/>
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>

			{filteredTodos.length === 0 && filters === "all" && (
				<p className={classes["empty-list-p"]}>You dont have any todos!</p>
			)}
			{filteredTodos.length === 0 && filters !== "all" && (
				<p className={classes["empty-list-p"]}>
					You dont have any {filters} todos
				</p>
			)}
			<ToDoToolbar length={filteredTodos.length} />
		</div>
	);
}
export default ToDoList;
