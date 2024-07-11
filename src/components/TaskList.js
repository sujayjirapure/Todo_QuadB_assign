import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../redux/actions';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (index, task) => {
    setEditIndex(index);
    setEditText(task);
  };

  const handleSave = (index) => {
    dispatch(editTask(index, editText));
    setEditIndex(null);
    setEditText('');
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {editIndex === index ? (
            <div>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => handleSave(index)}>Save</button>
            </div>
          ) : (
            <div>
              {task}
              <button onClick={() => handleEdit(index, task)}>Edit</button>
              <button onClick={() => dispatch(deleteTask(index))}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
