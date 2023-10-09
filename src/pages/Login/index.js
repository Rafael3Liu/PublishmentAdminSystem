import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
function Login () {
    const { loginStore } = useStore()
    const navigate = useNavigate()

    async function onFinish (values) {
        //values放置的是所有表单项中用户输入的内容
        console.log(values)
        //login
        await loginStore.getToken({
            mobile: values.username,
            code: values.password
        })

        //跳转
        navigate('/', { replace: true })
        // message
        message.success('login in successfully')

    }

    return (
        <div className='login'>
            <Card className='login-container'>
                <img className='login-logo' src={logo} alt="" />

                <Form
                    initialValues={{
                        remember: true
                    }}
                    validateTrigger={['onBlur', 'onChange']}
                    onFinish={onFinish}

                >
                    <Form.Item

                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Phone Number!'
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: 'Please input a correct Phone Number',
                                validateTrigger: 'onBlur'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item

                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Verification Code!'
                            },
                            {
                                len: 6,
                                message: 'Please input six numbers code ',
                                validateTrigger: 'onBlur'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入验证码" />
                    </Form.Item>
                    <Form.Item
                        name="remember" valuePropName="checked"
                    >
                        <Checkbox className="login-checkbox-label">
                            我已阅读并同意「用户协议」和「隐私条款」
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </div>
    )
}
export default Login