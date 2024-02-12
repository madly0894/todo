import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { signIn, selectAuth } from './store/auth'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import "./style.scss"

const Login = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { isLoadingLogin } = useSelector(selectAuth)
    const navigate = useNavigate()

    const onFinish = (values) => {
        dispatch(signIn(values))
            .unwrap()
            .then(() =>
                navigate('/'))
            .catch(console.error);
    };

    return (
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
            <div className='form'>
                <h1>LOGIN</h1>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" className='fromInput' />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        className='fromInput'
                    />
                </Form.Item>
                <Form.Item shouldUpdate
                    className='fromButton'
                >
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoadingLogin}
                            disabled={!form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length}
                        >
                            Log in
                        </Button>
                    )}
                </Form.Item>
                <a href="/register">Sign Up</a>
            </div>
        </Form>
    );
}

export default Login