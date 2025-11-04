import { Form, Input, Button, Row, Col, notification } from "antd";
import { useNavigate } from "react-router";

const API_BASE = "https://demo2.z-bit.ee";

export default function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          firstname: values.firstname,
          lastname: values.lastname,
          newPassword: values.password,
        }),
      });

      if (!res.ok) throw new Error("Registration failed");

      const data = await res.json();
      console.log("Register response:", data);

      // Salvesta token localStorage'i
      localStorage.setItem("apiToken", data.access_token);

      notification.success({ message: "User registered successfully!" });
      navigate("/"); // suuna TaskList lehele
    } catch (err) {
      console.error(err);
      notification.error({ message: "Registration failed" });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col span={6}>
        <h1>Register</h1>
        <Form
          name="register"
          layout="vertical"
          initialValues={{
            username: "",
            firstname: "",
            lastname: "",
            password: "",
            confirm: "",
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="firstname"
            rules={[{ required: true, message: "Please input your first name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[{ required: true, message: "Please input your last name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) return Promise.resolve();
                  return Promise.reject(new Error('Passwords do not match!'));
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Register</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}