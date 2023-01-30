import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    message,
    Row,
    Select,
} from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { SET_USER_SIGNUP } from '../../Redux/Constants/ConstantsUser';
import { GROUPID } from '../../Services/ConfigURL';
import { localServ } from '../../Services/LocalService';
import { movieServ } from '../../Services/UserService';
import '../../assets/styles/Signup.css'
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 8,
        },
        sm: {
            span: 24,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select
            style={{
                width: 70,
            }}
        >
            <Option>+84</Option>
        </Select>
    </Form.Item>
);

const SignupPage = () => {

    let navigate = useNavigate()
    let dispatch = useDispatch();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        values.maNhom = GROUPID
        console.log('GROUPID: ', GROUPID);
        movieServ.postSignup(values)
            .then((res) => {
                localServ.user.set(res.data.content)
                dispatch({
                    type: SET_USER_SIGNUP,
                    payload: res.data.content
                })
                console.log('res.data.content: ', res.data.content);

                // Chuyển hướng trang
                setTimeout(() => {
                    navigate('/')
                }, 1500)
                // Thông báo đăng nhập thành công hoặc thất bại
                message.success('Đăng kí Thành Công')
                console.log(res);
            })
            .catch((err) => {
                message.success('Đăng kí Thất Bại')
                console.log(err);
            });
        console.log('Success:', values);

        console.log('Received values of form: ', values);
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
    return (<div style={background} className='bg_signup'>
        <div className='w-full h-full flex justify-center bg_signup-form' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className='container mx-auto w-80 h-70 justify-center' style={{ backgroundColor: 'rgba(150, 146, 148, 0.75)', position: 'absolute', marginTop: 125, paddingBottom: 220 }}>
                <br />
                <h3 className='flex container justify-center header_signup' style={styleDangNhap}>Đăng Kí</h3>
                <div className='container mx-auto w-70 flex justify-center'>
                    <div className='w-80 h-96 '>
                        <Form
                            {...formItemLayout}
                            form={form}
                            name="register"
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

                            scrollToFirstError
                        >
                            <Form.Item
                                label="Tên Tài Khoản"
                                name="taiKhoan"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui Lòng Nhập Vào Tài Khoản!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>


                            <Form.Item
                                name="matKhau"
                                label="Mật Khẩu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui Lòng Nhập Vào Mật Khẩu!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="Nhập Lại Mật Khẩu"
                                dependencies={['matKhau']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui Lòng Xác Nhận Lại Mật Khẩu!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('matKhau') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                name="hoTen"
                                label="Họ và Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui Lòng Nhập Vào Họ Và Tên!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Email Không Được Để Trống',
                                    },
                                    {
                                        required: true,
                                        message: 'Vui Lòng Nhập Vào Email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="soDt"
                                label="Số Điện Thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui Lòng Nhập Vào Số Điện Thoại Của Bạn!',
                                    },
                                ]}
                            >
                                <Input
                                    addonBefore={prefixSelector}
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>


                            <Form.Item {...tailFormItemLayout}>
                                <Button className='mr-3' type="primary" htmlType="submit">
                                    Đăng kí
                                </Button>
                                <br />
                            </Form.Item>
                            <NavLink to='/login'>
                                <ul>
                                    <li className='text-login'>Bạn Đã có tài khoản? Đăng Nhập</li>
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

export default SignupPage;