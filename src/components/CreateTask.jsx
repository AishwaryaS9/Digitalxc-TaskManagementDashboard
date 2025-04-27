import React, { useState } from 'react'
import { PRIORITY_DATA } from '../utils/data';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import toast from 'react-hot-toast';
import SelectDropdown from './Inputs/SelectDropdown';

const CreateTask = ({ onClose, onTaskCreated, }) => {
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        priority: "Low",
        dueDate: null,
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleValueChange = (key, value) => {
        setTaskData((prevData) => ({ ...prevData, [key]: value }));
    }

    const clearData = () => {
        setTaskData({
            title: "",
            description: "",
            priority: "Low",
            dueDate: null,
        });
    };

    const createTask = async () => {
        setLoading(true);
        try {
            const todolist = taskData.todoChecklist?.map((item) => ({
                text: item,
                done: false
            }));

            const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
                ...taskData,
                dueDate: new Date(taskData.dueDate).toISOString(),
            });

            toast.success("Task Created Successfully");
            clearData();
            onClose();
            onTaskCreated();
        } catch (error) {
            console.error('Error creating task:', error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = () => {
        setError(null);
        if (!taskData.title.trim()) {
            setError("Title is required.");
            return;
        }
        if (!taskData.dueDate) {
            setError("Due date is required.");
            return;
        }
        createTask();
    }

    return (
        <>
            <div className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-4 ">
                    <div className="form-card col-span-3">
                        <div className="">
                            <label className="text-xs font-medium text-slate-600">
                                Task Title
                            </label>
                            <input placeholder='Create App UI'
                                className='form-input'
                                value={taskData.title}
                                onChange={({ target }) =>
                                    handleValueChange("title", target.value)}
                            />
                        </div>
                        <div className="mt-3">
                            <label className="text-xs font-medium text-slate-600">
                                Description
                            </label>
                            <textarea placeholder='Describe task'
                                className='form-input'
                                rows={4}
                                value={taskData.description}
                                onChange={({ target }) =>
                                    handleValueChange("description", target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-12 gap-4 mt-2">
                            <div className="col-span-6 md:col-span-4">
                                <label className="text-xs font-medium text-slate-600">
                                    Status
                                </label>
                                <SelectDropdown
                                    options={PRIORITY_DATA}
                                    value={taskData.priority}
                                    onChange={(value) => handleValueChange("priority", value)}
                                    placeholder="Select Priority"
                                />
                            </div>
                            <div className="col-span-6 md:col-span-4">
                                <label className='text-xs font-medium text-slate-600'>
                                    Due Date
                                </label>
                                <input placeholder='Create App UI'
                                    className='form-input'
                                    value={taskData.dueDate || ""}
                                    onChange={({ target }) =>
                                        handleValueChange("dueDate", target.value)}
                                    type='date' />
                            </div>
                        </div>

                        {error && (
                            <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
                        )}

                        <div className="flex justify-end mt-7">
                            <button className="add-btn"
                                onClick={handleSubmit}
                                disabled={loading}>
                                CREATE TASK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateTask