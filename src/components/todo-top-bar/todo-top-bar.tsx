import { useTodoContext } from "../../store/todoContext";
import classes from './todo-top-bar.module.css'
import sunIcon from '../../assets/icon-sun.svg'
import moonIcon from '../../assets/icon-moon.svg'
function ToDoTopBar(){
    const { toggleTheme, isDarkTheme } = useTodoContext();
    return <div className={classes['title-container']}>
    <h1 className={classes.title}>TODO</h1>
    <button
        className={classes['toggle-theme-btn']}
        onClick={toggleTheme}
    >
        {isDarkTheme ? (
            <img src={sunIcon}></img>
        ) : (
            <img src={moonIcon}></img>
        )}
    </button>
</div>
}
export default ToDoTopBar;