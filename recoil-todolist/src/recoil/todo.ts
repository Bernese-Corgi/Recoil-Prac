import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface ITodoTypes {
  id: number;
  contents: string;
  isCompleted: boolean;
}

export const inputState = atom<string>({
  key: 'inputState',
  effects_UNSTABLE: [persistAtom],
  default: '',
});

export const todoState = atom<ITodoTypes[]>({
  key: 'todos',
  effects_UNSTABLE: [persistAtom],
  default: [
    {
      id: 1,
      contents: 'Todo List를',
      isCompleted: false,
    },

    {
      id: 2,
      contents: '자유롭게',
      isCompleted: false,
    },

    {
      id: 3,
      contents: '추가해보세요!',
      isCompleted: false,
    },
  ],
});
