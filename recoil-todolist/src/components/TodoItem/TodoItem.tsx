import React from 'react';
import { FaPen } from 'react-icons/fa';
import { SetterOrUpdater } from 'recoil';
import { ITodoTypes } from 'src/recoil/todo';
import { MdClose } from 'react-icons/md';
import { useState } from 'react';
import { useCallback } from 'react';
import './TodoItem.scss';
import TodoModal from '../TodoModal/TodoModal';

interface TodoItemProps {
  todo: {
    id: number;
    contents: string;
    isCompleted: boolean;
  };
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;

  todos: ITodoTypes[];
  setTodos: SetterOrUpdater<ITodoTypes[]>;
}

const TodoItem = ({
  todo: { id, contents, isCompleted },
  onComplete,
  onDelete,
  todos,
  setTodos,
}: TodoItemProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modifyContents, setModifyContents] = useState<string>('');

  const handleModify = useCallback(() => {
    setIsModal(true);
    setModifyContents(contents);
  }, [contents]);

  const handleModifyTodo = useCallback(() => {
    if (!modifyContents.trim()) return;

    setTodos(prev =>
      prev.map((todo: ITodoTypes) =>
        todo.id === id ? { ...todo, contents: modifyContents } : todo
      )
    );

    setIsModal(false);
  }, [id, modifyContents, setTodos]);

  return (
    <div className="TodoItem">
      <div
        className={isCompleted ? 'TodoItem-Completed' : ''}
        title={contents}
        onClick={() => onComplete(id)}>
        {contents}
      </div>
      <div className="TodoItem-Icons">
        <FaPen className="TodoItem-Icons-Pen" onClick={handleModify}></FaPen>
        <MdClose
          className="TodoItem-Icons-Close"
          onClick={() => onDelete(id)}></MdClose>
      </div>
      {isModal && (
        <TodoModal
          setIsModal={setIsModal}
          modifyContents={modifyContents}
          setModifyContents={setModifyContents}
          onModifyTodo={handleModifyTodo}
        />
      )}
    </div>
  );
};

export default TodoItem;
