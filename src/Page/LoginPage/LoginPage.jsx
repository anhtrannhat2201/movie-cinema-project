import { Button, Checkbox, Form, Input, message } from 'antd';
import { movieServ } from '../../Services/UserService';
import React from 'react';
import { localServ } from '../../Services/LocalService';
import { NavLink, useNavigate } from 'react-router-dom'
import { SET_USER_LOGIN } from '../../Redux/Constants/ConstantsUser';
import { useDispatch } from 'react-redux';
import '../../assets/styles/Login.css'
import { setLoadingOffAction, setLoadingOnAction } from '../../Redux/Actions/ActionSpinner';



const LoginPage = () => {

    let navigate = useNavigate()
    let dispatch = useDispatch();
    const onFinish = (values) => {
        movieServ.postLogin(values)
            .then((res) => {
                // Đây là cái object mình cần lưu

                // Lưu ý dùng window để chuyển trang sẽ lamg cho trang web bị load lại
                // Nên dùng 

                // Lưu vào localStorage
                localServ.user.set(res.data.content)

                // dispatch to store
                dispatch({
                    type: SET_USER_LOGIN,
                    payload: res.data.content
                })
                console.log('res.data.content: ', res.data.content);

                // Chuyển hướng trang
                setTimeout(() => {
                    navigate(-1)
                }, 1500)
                // Thông báo đăng nhập thành công hoặc thất bại
                message.success('Đăng Nhập Thành Công')
                console.log(res);
            })
            .catch((err) => {
                message.success('Đăng Nhập Thất Bại')
                console.log(err);
            });
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const styleDangNhap = {
        color: '#000',
        fontSize: '32px',
        fontWeight: ' 700',
        marginBottom: '28px',
    }

    const background = {
        backgroundImage: 'url(./img/background_sign.jpg)',
        height: '1111px',
        marginTop: 0,
        position: 'relative',
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    return (
        <div style={background} className='bg_login'>
            <div className='w-full h-full flex justify-center bg_login-form' style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                <div className='container mx-auto w-80 h-70 justify-center' style={{ backgroundColor: 'rgba(150, 146, 148, 0.75)', position: 'absolute', marginTop: 200 }}>
                    <br />
                    <h3 className='flex container justify-center header_login' style={styleDangNhap}>Đăng Nhập</h3>
                    <div className='container mx-auto w-70 flex justify-center'>
                        <div className='mt-2 w-80 h-80'>
                            <Form
                                name="basic"
                                layout="vertical"
                                labelCol={{
                                    span: 24,
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Tên Tài Khoản"
                                    name="taiKhoan"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui Lòng Nhập Vào Tài Khoảng !',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Mật Khẩu"
                                    name="matKhau"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui Lòng Nhập Vào Mật Khẩu!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                </Form.Item>
                                <Form.Item
                                    style={{ marginTop: -40 }}
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Đăng Nhập
                                    </Button>
                                    <br />
                                </Form.Item>
                                <NavLink to='/signup'>
                                    <ul>
                                        <li className='text-signup'>Bạn Chưa Có Tài Khoản? Đăng Ký</li>
                                    </ul>
                                </NavLink>
                            </Form>
                        </div>
                    </div >
                </div>
            </div>
        </div >
    );
};

export default LoginPage;