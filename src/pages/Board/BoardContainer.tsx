import React from 'react';
import boardData from '@/data/board.json';
import { BoardItem } from '@/types/Board';
import BoardView from './BoardView';

const BoardContainer = () => {
    return <BoardView data={boardData as BoardItem[]} />;
};

export default BoardContainer;