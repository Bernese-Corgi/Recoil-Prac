import React from 'react';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { ITodoTypes, todoState } from 'src/recoil/todo';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.scss';

const TodoList = () => {
  const [todos, setTodos] = useRecoilState<ITodoTypes[]>(todoState);

  const handleComplete = useCallback(
    (id: number) => {
      setTodos(prev =>
        prev.map((todo: ITodoTypes) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );
    },
    [setTodos]
  );

  const handleDelete = useCallback(
    (id: number) => {
      setTodos(todos.filter((todo: ITodoTypes) => todo.id !== id));
    },
    [setTodos, todos]
  );

  return (
    <div className="TodoList">
      {todos.length > 0 ? (
        todos.map((todo: ITodoTypes) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onComplete={handleComplete}
              onDelete={handleDelete}
              todos={todos}
              setTodos={setTodos}
            />
          );
        })
      ) : (
        <div className="TodoList-NoList">
          Todo가 없습니다. 자유롭게 추가해보세요!
        </div>
      )}
    </div>
  );
};

export default TodoList;
