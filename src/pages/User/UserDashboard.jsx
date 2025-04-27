import React, { useEffect, useState } from 'react';
import DashboardLayout from './../../components/layout/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from '../../components/Card/TaskCard';
import SortableItem from '../../components/SortableItem';
import Modal from '../../components/Modal';
import CreateTask from '../../components/CreateTask';
import { useDispatch } from 'react-redux';
import { allTask, dashboardAllData } from '../../store/slices/taskSlice';

const Droppable = ({ id, children }) => {
    const { setNodeRef } = useDroppable({ id });
    return (
        <div ref={setNodeRef} id={id}>
            {children}
        </div>
    );
};

const UserDashboard = () => {
    const [tasks, setTasks] = useState({
        'To Do': [],
        'In Progress': [],
        Done: [],
    });

    const [openTaskModal, setOpenTaskModal] = useState(false);
    const [dashboardDetails, setDashboardDetails] = useState(null);

    const dispatch = useDispatch();

    const getAllTasks = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS);
            const taskData = response.data || [];
            dispatch(allTask(response.data))
            const groupedTasks = {
                'To Do': taskData.filter(task => task.status === 'To Do'),
                'In Progress': taskData.filter(task => task.status === 'In Progress'),
                Done: taskData.filter(task => task.status === 'Done'),
            };

            setTasks(groupedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const getDashboardData = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
            if (response.data) {
                setDashboardDetails(response.data);
                dispatch(dashboardAllData(response.data))
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    const handleDragEnd = ({ active, over }) => {
        if (!over || active.id === over.id) return;

        const activeStatus = Object.keys(tasks).find((status) =>
            tasks[status].some((task) => task._id === active.id)
        );

        const overStatus = over.id;

        const isValidTransition = (from, to) => {
            const transitions = {
                'To Do': ['In Progress'],
                'In Progress': ['To Do', 'Done'],
                'Done': ['In Progress'],
            };

            return transitions[from]?.includes(to);
        };

        if (isValidTransition(activeStatus, overStatus)) {
            const activeTask = tasks[activeStatus].find((task) => task._id === active.id);
            const updatedSourceList = tasks[activeStatus].filter(task => task._id !== active.id);
            const updatedTargetList = [...tasks[overStatus], { ...activeTask, status: overStatus }];
            const reorderedTargetList = arrayMove(updatedTargetList, updatedTargetList.length - 1, active.index);
            setTasks((prev) => ({
                ...prev,
                [activeStatus]: updatedSourceList,
                [overStatus]: reorderedTargetList,
            }));
            const response = axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK_STATUS(active.id), { status: overStatus })
                .catch((error) => console.error('Error updating task status:', error));
            if (response.status == 200) {
                dispatch(allTask(response.data));
                getDashboardData()
            }
        } else {
            console.warn(`Invalid transition from ${activeStatus} to ${overStatus}`);
        }
    };

    useEffect(() => {
        getAllTasks();
        getDashboardData();
    }, []);

    return (
        <DashboardLayout activeMenu="My Tasks" dashboardInfo={dashboardDetails}>
            <div className='flex justify-between'>
                <h2 className="text-xl md:text-xl font-medium my-5">Kanban Board</h2>
                <button className='px-4 my-5 py-0.5 rounded font-medium text-[12px] bg-blue-200 h-10 cursor-pointer'
                    onClick={() => setOpenTaskModal(true)}>
                    Add New Task
                </button>
            </div>

            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[]}
                pointerEvents={true}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.keys(tasks).map((status) => (
                        <Droppable key={status} id={status} className="droppable-area" >
                            <h3 className="text-lg font-semibold mb-4">{status}</h3>
                            <SortableContext id={status}
                                items={tasks[status].map((task) => task._id)}
                                strategy={verticalListSortingStrategy}
                            >

                                {tasks[status].map((task) => (
                                    <SortableItem key={task._id} id={task._id}>
                                        <TaskCard
                                            {...task}

                                        />
                                    </SortableItem>
                                ))}
                            </SortableContext>
                        </Droppable>
                    ))}


                </div>
                <Modal
                    isOpen={openTaskModal}
                    onClose={() => setOpenTaskModal(false)}
                    title="Add New Task"
                >
                    <CreateTask
                        content="Add New Task"
                        onClose={() => setOpenTaskModal(false)}
                        onTaskCreated={getAllTasks}
                    />
                </Modal>
            </DndContext>
        </DashboardLayout>
    );
};

export default UserDashboard;


