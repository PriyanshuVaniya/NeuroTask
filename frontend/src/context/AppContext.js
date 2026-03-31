import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    // Mock Initial Data
    const [currentUser, setCurrentUser] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const [users, setUsers] = useState([
        { id: 'u1', name: 'Admin User', email: 'admin@neurotask.com', role: 'admin' },
        { id: 'u2', name: 'Manager User', email: 'manager@neurotask.com', role: 'manager' },
        { id: 'u3', name: 'Employee One', email: 'employee@neurotask.com', role: 'employee' },
        { id: 'u4', name: 'Employee Two', email: 'emp2@neurotask.com', role: 'employee' },
    ]);

    const [teams, setTeams] = useState([
        { id: 't1', managerId: 'u2', memberIds: ['u3', 'u4'], name: 'Alpha Team' }
    ]);

    const [tasks, setTasks] = useState([
        {
            id: 'task1',
            title: 'Design Authentication Flow',
            description: 'Create login and register wireframes.',
            status: 'completed',
            priority: 'high',
            assigneeId: 'u3',
            managerId: 'u2',
            deadline: '2026-03-05'
        },
        {
            id: 'task2',
            title: 'Setup Global Context',
            description: 'Implement React Context for mock backend.',
            status: 'in-progress',
            priority: 'high',
            assigneeId: 'u3',
            managerId: 'u2',
            deadline: '2026-03-04'
        },
        {
            id: 'task3',
            title: 'Admin User Management API',
            description: 'Build endpoints for admin user creation.',
            status: 'pending',
            priority: 'medium',
            assigneeId: 'u4',
            managerId: 'u2',
            deadline: '2026-03-10'
        }
    ]);

    // Load user from local storage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
    }, []);

    // Auth Context
    const login = (email, role) => {
        // Basic mock authentication: check if user exists, or create on fly for demo purposes if it strictly matches role
        let user = users.find(u => u.email === email && u.role === role);
        if (!user) {
            // For demo flexibility, if they provide a role but no account exists, we'll pretend it matched or fail.
            // Let's strictly require them to exist, or we can just mock-login them anyway to be user-friendly.
            user = users.find(u => u.email === email);
            if (!user) {
                throw new Error('Invalid credentials or role mismatch');
            }
            if (user.role !== role) {
                throw new Error(`This user is registered as a ${user.role}, not a ${role}`);
            }
        }

        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', 'mock_token_123');
        return user;
    };

    const register = (name, email, role) => {
        const existing = users.find(u => u.email === email);
        if (existing) throw new Error('Email already in use');

        const newUser = { id: `u${Date.now()}`, name, email, role };
        setUsers([...users, newUser]);

        setCurrentUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('token', 'mock_token_123');
        return newUser;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    // Admin Features
    const addUserByAdmin = (userData) => {
        const newUser = { id: `u${users.length + 1}`, ...userData };
        setUsers(prev => [...prev, newUser]);
        return newUser;
    };

    const createTeam = (managerId, name, memberIds) => {
        const newTeam = {
            id: `t${Date.now()}`,
            managerId,
            name,
            memberIds
        };
        setTeams(prev => [...prev, newTeam]);
        return newTeam;
    };

    const deleteUser = (userId) => {
        setUsers(users.filter(u => u.id !== userId));
        // Remove from teams
        setTeams(teams.map(t => ({
            ...t,
            memberIds: t.memberIds.filter(id => id !== userId)
        })));
        // Could also remove / detach tasks, but for mock keep it simple
    };

    // Manager Features
    const updateTeam = (teamId, updates) => {
        setTeams(teams.map(t => t.id === teamId ? { ...t, ...updates } : t));
    };

    const deleteTeam = (teamId) => {
        setTeams(teams.filter(t => t.id !== teamId));
    };

    // Notification helpers
    const addNotification = (notification) => {
        const newNotif = {
            id: `notif${Date.now()}`,
            read: false,
            timestamp: new Date().toISOString(),
            ...notification
        };
        setNotifications(prev => [newNotif, ...prev]);
        return newNotif;
    };

    const markNotificationRead = (notifId) => {
        setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
    };

    const markAllNotificationsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const addTask = (taskData) => {
        const newTask = {
            id: `task${Date.now()}`,
            ...taskData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        setTasks(prev => [...prev, newTask]);

        // Auto-generate notification for the assignee
        if (taskData.assigneeId) {
            const managerName = users.find(u => u.id === taskData.managerId)?.name || 'A manager';
            addNotification({
                type: 'task_assigned',
                title: 'New Task Assigned',
                message: `${managerName} assigned you: "${taskData.title}"`,
                targetUserId: taskData.assigneeId,
                taskId: newTask.id
            });
        }
        return newTask;
    };

    // Employee Features
    const updateTask = (taskId, updates) => {
        setTasks(prev =>
            prev.map(task => task.id === taskId ? { ...task, ...updates } : task)
        );
    };

    // Manager: Reassign a task to a different employee
    const reassignTask = (taskId, newAssigneeId) => {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        const oldAssigneeId = task.assigneeId;
        const oldAssigneeName = users.find(u => u.id === oldAssigneeId)?.name || 'Unknown';
        const newAssigneeName = users.find(u => u.id === newAssigneeId)?.name || 'Unknown';
        const managerName = currentUser?.name || 'A manager';

        // Update the task with new assignee and append history
        setTasks(prev => prev.map(t => {
            if (t.id === taskId) {
                const historyEntry = {
                    user: managerName,
                    action: `reassigned this task from ${oldAssigneeName} to ${newAssigneeName}`,
                    timestamp: new Date().toISOString()
                };
                return {
                    ...t,
                    assigneeId: newAssigneeId,
                    history: [...(t.history || []), historyEntry]
                };
            }
            return t;
        }));

        // Notify new assignee
        addNotification({
            type: 'task_reassigned',
            title: 'Task Assigned to You',
            message: `${managerName} reassigned "${task.title}" to you.`,
            targetUserId: newAssigneeId,
            taskId
        });

        // Notify old assignee
        if (oldAssigneeId) {
            addNotification({
                type: 'task_reassigned',
                title: 'Task Reassigned',
                message: `"${task.title}" has been reassigned from you to ${newAssigneeName}.`,
                targetUserId: oldAssigneeId,
                taskId
            });
        }
    };

    const deleteTask = (taskId) => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
    };

    const addTaskComment = (taskId, comment) => {
        setTasks(prev => prev.map(task => {
            if (task.id === taskId) {
                const newComment = {
                    id: `c${Date.now()}`,
                    ...comment,
                    timestamp: new Date().toISOString()
                };
                return {
                    ...task,
                    commentsList: [...(task.commentsList || []), newComment]
                };
            }
            return task;
        }));
    };

    // Update user profile
    const updateUser = (userId, updates) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
        if (currentUser && currentUser.id === userId) {
            const updatedUser = { ...currentUser, ...updates };
            setCurrentUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
    };

    const value = {
        currentUser,
        users,
        teams,
        tasks,
        notifications,
        login,
        register,
        logout,
        addUserByAdmin,
        deleteUser,
        createTeam,
        updateTeam,
        deleteTeam,
        addTask,
        updateTask,
        reassignTask,
        deleteTask,
        addTaskComment,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        updateUser
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
