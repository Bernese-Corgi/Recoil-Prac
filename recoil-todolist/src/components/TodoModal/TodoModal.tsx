import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { FaPen } from 'react-icons/fa';
import './TodoModal.scss';

interface TodoModalProps {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  modifyContents: string;
  setModifyContents: Dispatch<SetStateAction<string>>;
  onModifyTodo: () => void;
}

const TodoModal = ({
  setIsModal,
  modifyContents,
  setModifyContents,
  onModifyTodo,
}: TodoModalProps) => {
  const handleCloseModal = () => setIsModal(false);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setModifyContents(value);

  return (
    <>
      <div className="TodoModal-Overlay" onClick={handleCloseModal}></div>
      <div className="TodoModal">
        <div className="TodoModal-Title">
          <div>Todo 수정하기</div>
          <FaPen />
        </div>

        <div className="TodoModal-Contents">
          <input
            type="text"
            className="TodoModal-Contents-Input"
            value={modifyContents}
            onChange={handleChange}
            placeholder="Todo 입력"
          />

          <button className="TodoModal-Contents-Button" onClick={onModifyTodo}>
            수정하기
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoModal;
