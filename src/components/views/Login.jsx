import { Form, Input, Button, Row, Col, notification, Typography } from "antd";
import { useNavigate } from "react-router";

const { Text, Link } = Typography;

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch(`https://demo2.z-bit.ee/users/get-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();

      console.log("Login response:", data);

      // Salvesta token localStorage'i
      localStorage.setItem("apiToken", data.access_token);

      notification.success({ message: "Logged in" });
      navigate("/"); // suuna TaskList lehele
    } catch (err) {
      console.error(err);
      notification.error({ message: "Wrong username or password" });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col span={6}>
        <h1>Login</h1>
        <Form
          name="login"
          layout="vertical"
          initialValues={{ username: "", password: "" }}
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
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>

        <Text>
          Don't have an account?{" "}
          <Link onClick={() => navigate("/register")}>Register a new user</Link>
        </Text>
      </Col>
    </Row>
  );
}
