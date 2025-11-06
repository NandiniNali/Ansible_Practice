import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const BuddyBest = () => {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState({
    id: '',
    goal: '',
    goalDescription: '',
    friendName: '',
    status: ''
    // Removed date
  });
  const [statusToFetch, setStatusToFetch] = useState('');
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/bucketapi`;

  useEffect(() => {
    fetchAllGoals();
  }, []);

  const fetchAllGoals = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setGoals(res.data);
    } catch (error) {
      setMessage('Failed to fetch goals.');
    }
  };

  const handleChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const validateForm = (isEdit = false) => {
    const keysToValidate = Object.keys(goal).filter((k) => !(k === 'id' && !isEdit));
    for (let key of keysToValidate) {
      if (!goal[key] || goal[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addGoal = async () => {
    if (!validateForm(false)) return;
    try {
      const payload = { ...goal };
      delete payload.id;
      await axios.post(`${baseUrl}/add`, payload);
      setMessage('Goal added successfully!');
      fetchAllGoals();
      resetForm();
    } catch (error) {
      setMessage('Error adding goal.');
    }
  };

  const updateGoal = async () => {
    if (!validateForm(true)) return;
    try {
      await axios.put(`${baseUrl}/update`, goal);
      setMessage('Goal updated successfully!');
      fetchAllGoals();
      resetForm();
    } catch (error) {
      setMessage('Error updating goal.');
    }
  };

  const deleteGoal = async (id, fromFiltered = false) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage('Goal deleted successfully!');
      fetchAllGoals();
      if (fromFiltered) {
        setFilteredGoals(filteredGoals.filter((g) => g.id !== id));
      }
    } catch (error) {
      setMessage('Error deleting goal.');
    }
  };

  const getGoalsByStatus = async () => {
    if (!statusToFetch) {
      setMessage('Please select a status to fetch.');
      return;
    }
    try {
      const res = await axios.get(`${baseUrl}/status/${statusToFetch}`);
      setFilteredGoals(res.data);
      setMessage('');
    } catch (error) {
      setFilteredGoals([]);
      setMessage('No goals found for this status.');
    }
  };

  const handleEdit = (g) => {
    setGoal({ ...g });
    setEditMode(true);
    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setGoal({
      id: '',
      goal: '',
      goalDescription: '',
      friendName: '',
      status: ''
      // Removed date reset
    });
    setEditMode(false);
    setMessage('');
  };

  return (
    <div className="movie-container">
      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>🎯 BuddyBucket - Your Shared Goals</h2>

      <div>
        <h3>{editMode ? 'Edit Goal' : 'Add Goal'}</h3>
        <div className="form-grid">
          {editMode && (
            <input
              type="number"
              name="id"
              placeholder="ID"
              value={goal.id}
              onChange={handleChange}
              readOnly
            />
          )}
          <input
            type="text"
            name="goal"
            placeholder="Goal Title"
            value={goal.goal}
            onChange={handleChange}
          />
          <input
            type="text"
            name="goalDescription"
            placeholder="Goal Description"
            value={goal.goalDescription}
            onChange={handleChange}
          />
          <input
            type="text"
            name="friendName"
            placeholder="Friend's Name"
            value={goal.friendName}
            onChange={handleChange}
          />
          <select name="status" value={goal.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="Done">Done</option>
            <option value="Pending">Pending</option>
          </select>
          {/* Removed date input */}
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addGoal}>Add Goal</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateGoal}>Update Goal</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <h3>Filter Goals by Status</h3>
        <select value={statusToFetch} onChange={(e) => setStatusToFetch(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Done">Done</option>
          <option value="Pending">Pending</option>
        </select>
        <button className="btn-blue" onClick={getGoalsByStatus} style={{ marginLeft: 8 }}>Fetch</button>

        {filteredGoals.length > 0 && (
          <div className="table-wrapper" style={{ marginTop: 12 }}>
            <h4>🗂 Goals with status: {statusToFetch}</h4>
            <table>
              <thead>
                <tr>
                  {Object.keys(goal).map((key) => <th key={key}>{key}</th>)}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGoals.map((g) => (
                  <tr key={g.id}>
                    {Object.keys(goal).map((key) => <td key={key}>{g[key]}</td>)}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(g)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteGoal(g.id, true)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ marginTop: 18 }}>
        <h3>All Goals</h3>
        {goals.length === 0 ? (
          <p>No goals found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(goal).map((key) => <th key={key}>{key}</th>)}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {goals.map((g) => (
                  <tr key={g.id}>
                    {Object.keys(goal).map((key) => <td key={key}>{g[key]}</td>)}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(g)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteGoal(g.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuddyBest;
