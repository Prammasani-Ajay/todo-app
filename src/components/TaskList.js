import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../redux/Actions';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(null);
  const [currentTask, setCurrentTask] = useState('');

  const handleEditTask = (id) => {
    if (currentTask.trim()) {
      dispatch(editTask(id, currentTask));
      setIsEditing(null);
      setCurrentTask('');
    }
  };

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div key={index} className="task-item">
          {isEditing === index ? (
            <>
              <input
                type="text"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleEditTask(index)}
              />
              <button onClick={() => handleEditTask(index)}>Save</button>
            </>
          ) : (
            <>
              <span>{task}</span>
              <button onClick={() => dispatch(deleteTask(index))}>Delete</button>
              <button onClick={() => { setIsEditing(index); setCurrentTask(task); }}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
