import React, { ChangeEvent, KeyboardEvent, KeyboardEventHandler } from 'react';
import { useCallback } from 'react';
import { FaPen } from 'react-icons/fa';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { inputState, ITodoTypes, todoState } from 'src/recoil/todo';
import './TodoInput.scss';

const TodoInput = () => {
  const [contents, setContents] = useRecoilState<string>(inputState);

  // get todos
  const todos = useRecoilValue<ITodoTypes[]>(todoState);
  // set todos
  const setTodos = useSetRecoilState<ITodoTypes[]>(todoState);

  const addTodo = useCallback(() => {
    if (!contents.trim()) return;

    setTodos(prev => [
      ...todos,
      {
        id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 0,
        contents,
        isCompleted: false,
      },
    ]);

    setContents('');
  }, [contents, setContents, setTodos, todos]);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setContents(value);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTodo();
  };

  return (
    <div className="TodoInput">
      <input
        type="text"
        className="TodoInput-Input"
        placeholder="Todo를 입력해보세요!"
        value={contents}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <FaPen className="TodoInput-Button" onClick={addTodo} />
    </div>
  );
};

export default TodoInput;
