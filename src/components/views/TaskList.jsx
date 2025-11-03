import { DeleteOutlined } from "@ant-design/icons";
import { Input, Button, Checkbox, List, Col, Row, Space, Divider } from "antd";
import { produce } from "immer";
import { useState, useEffect } from "react";

const API_BASE = "https://demo2.z-bit.ee";
const API_TOKEN = "E5Q7-iN8HLCY-v8IUiEjkv7GK7EJkm1A";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  // --- 1️ Lae ülesanded ---
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // --- 2️ Lisa uus ülesanne ---
  const handleAddTask = async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          title: "New Task",
          desc: "",
        }),
      });
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // --- 3️ Uuenda ülesanne ---
  const updateTask = async (task) => {
    try {
      await fetch(`${API_BASE}/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          title: task.title,
          marked_as_done: task.marked_as_done,
        }),
      });
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleTitleChange = (task, event) => {
    const newTasks = produce(tasks, (draft) => {
      const index = draft.findIndex((t) => t.id === task.id);
      draft[index].title = event.target.value;
    });
    setTasks(newTasks);
    updateTask({ ...task, title: event.target.value });
  };

  const handleDoneChange = (task, event) => {
    const newTasks = produce(tasks, (draft) => {
      const index = draft.findIndex((t) => t.id === task.id);
      draft[index].marked_as_done = event.target.checked;
    });
    setTasks(newTasks);
    updateTask({ ...task, marked_as_done: event.target.checked });
  };

  // --- 4️ Kustuta ülesanne ---
  const handleDeleteTask = async (task) => {
    try {
      await fetch(`${API_BASE}/tasks/${task.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // --- 5️ JSX ---
  return (
    <Row
      type="flex"
      justify="center"
      style={{ minHeight: "100vh", marginTop: "6rem" }}
    >
      <Col span={12}>
        <h1>Task List</h1>
        <Button onClick={handleAddTask}>Add Task</Button>
        <Divider />
        <List
          size="small"
          bordered
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item key={task.id}>
              <Row
                type="flex"
                justify="space-between"
                align="middle"
                style={{ width: "100%" }}
              >
                <Space>
                  <Checkbox
                    checked={task.marked_as_done}
                    onChange={(e) => handleDoneChange(task, e)}
                  />
                  <Input
                    value={task.title}
                    onChange={(event) => handleTitleChange(task, event)}
                  />
                </Space>
                <Button type="text" onClick={() => handleDeleteTask(task)}>
                  <DeleteOutlined />
                </Button>
              </Row>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}
