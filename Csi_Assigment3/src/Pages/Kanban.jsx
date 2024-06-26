// src/KanbanBoard.js

import '../Pages/kanban.css'
// src/KanbanBoard.js
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
  nextTaskId: 5, // Counter for next task ID
};

const KanbanBoard = () => {
  const [data, setData] = useState(initialData);
  const [newTaskContent, setNewTaskContent] = useState('');

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  const addTask = (columnId) => {
    const newTaskId = `task-${data.nextTaskId}`;
    const newTask = {
      id: newTaskId,
      content: newTaskContent,
    };

    const newTasks = {
      ...data.tasks,
      [newTaskId]: newTask,
    };

    const column = data.columns[columnId];
    const newTaskIds = [...column.taskIds, newTaskId];

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [columnId]: newColumn,
      },
      nextTaskId: data.nextTaskId + 1,
    };

    setData(newState);
    setNewTaskContent('');
  };

  const deleteTask = (columnId, taskId) => {
    const column = data.columns[columnId];
    const newTaskIds = column.taskIds.filter((id) => id !== taskId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newTasks = { ...data.tasks };
    delete newTasks[taskId];

    const newState = {
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [columnId]: newColumn,
      },
    };

    setData(newState);
  };

  const handleInputChange = (event) => {
    setNewTaskContent(event.target.value);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              addTask={addTask}
              deleteTask={deleteTask}
              handleInputChange={handleInputChange}
              newTaskContent={newTaskContent}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
};

const Column = ({ column, tasks, addTask, deleteTask, handleInputChange, newTaskContent }) => {
  return (
    <div className="column">
      <h3>{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} columnId={column.id} deleteTask={deleteTask} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="add-task">
        <input
          type="text"
          placeholder="New task"
          value={newTaskContent}
          onChange={handleInputChange}
        />
        <button onClick={() => addTask(column.id)}>Add</button>
      </div>
    </div>
  );
};

const Task = ({ task, index, columnId, deleteTask }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <span>{task.content}</span>
          <button onClick={() => deleteTask(columnId, task.id)}>Delete</button>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanBoard;
