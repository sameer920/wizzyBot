import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react'
import { AiFillPlusCircle } from "react-icons/ai"
import serverBasePath from '../../../../constants';
import { useNavigate, useParams } from 'react-router-dom';

export default function Profile_info() {
    const [passChangeMessage, setPassChangeMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        name: '',
    });


    const [passwordFields, setPasswordFields] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    useLayoutEffect(() => {
        axios.get(serverBasePath + '/my-account', {
            withCredentials: true
        })
            .then(async response => {
                if (response.status === 200) {
                    setUser(response.data);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            });
    }, []);



    function handlePasswordFieldChange(key, event) {
        setPasswordFields(prev => {
            return {
                ...prev,
                [key]: event.target.value
            }
        })
    }

    function changePassword() {

        if (passwordFields.newPassword !== passwordFields.confirmPassword) return;

        if (user.email !== '') {
            axios.post(`${serverBasePath}/auth/change-password`,
                {
                    email: user.email,
                    oldPassword: passwordFields.currentPassword,
                    newPassword: passwordFields.newPassword
                },
                {
                    withCredentials: true
                })
                .then(function (response) {
                    if (response.status === 200) {
                        setPassChangeMessage(response.data.response);
                        setTimeout(() => setPassChangeMessage(''), 5000);
                    }
                })
                .catch(function (error) {
                    setPassChangeMessage(error.response.data.response);
                });
        }
    }

    function deleteUser() {
        axios.delete(`${serverBasePath}/auth/deleteAccount`, {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true
        })
            .then((response) => {
                if (response.status === 200) {
                    navigate("/login");
                }
            })
            .catch(err => console.log(err));

    }


    return (
        <>
            <div className='w-full flex p-10 gap-8'>
                <div className='w-[40%]'>
                    <h3 className='text-xl font-bold'>Workspace Information</h3>
                    <p>Update your workspace information associated with your account.</p>
                </div>
                <div className='w-[60%] flex flex-col gap-4 justify-start'>
                    <h3 className='text-md font-bold'>Workspace Name</h3>
                    <input className='w-full outline-none rounded-md border-[1px] pl-2 h-10' type="text" name="WorkspaceName" placeholder='Workspace Name' />
                    <div className='bg-main p-2 w-24 items-center justify-center flex rounded-md text-white active:scale-95'>
                        <button>Update</button>
                    </div>
                </div>
            </div>
            <hr />

            <div className='w-full flex p-10 gap-8'>
                <div className='w-[40%]'>
                    <h3 className='text-xl font-bold'>Personal Information</h3>
                    <p>Update your personal information associated with your account.</p>
                </div>
                <div className='w-[60%] flex flex-col justify-start'>
                    <div>
                        <div className='border-[1px] p-1 rounded-md'>
                            <div className='flex items-center gap-4'>
                                <label htmlFor="upload_Avatar">
                                    <div className='flex cursor-pointer active:scale-95 items-center gap-2 border-[1px] w-fit p-2 bg-green-100 rounded-md'>
                                        <AiFillPlusCircle className='text-xl' />
                                        <h3>Choose file</h3>
                                    </div>
                                </label>
                                <div>
                                    <h3>No file choosen</h3>
                                </div>
                            </div>
                        </div>
                        <input className='hidden' type="file" name="" id="upload_Avatar" />
                    </div>
                    <label className='mt-4'>Name</label>
                    <input className='w-full outline-none rounded-md border-[1px] pl-2 h-10' type="text" name="WorkspaceName" placeholder='Name' />
                    <div className='bg-main mt-4 p-2 w-24 items-center justify-center flex rounded-md text-white active:scale-95'>
                        <button>Update</button>
                    </div>
                </div>
            </div>
            <hr />

            <div className='w-full flex p-10 gap-8'>
                <div className='w-[40%]'>
                    <h3 className='text-xl font-bold'>Change Password</h3>
                    <p>Update your password associated with your account.</p>
                </div>
                <div className='w-[60%] flex flex-col gap-1 justify-start'>
                    <h3>Current Password</h3>
                    <input
                        className='w-full mb-2 outline-none rounded-md border-[1px] pl-2 h-10'
                        type="password"
                        name="WorkspaceName"
                        placeholder='Current Password'
                        value={passwordFields.currentPassword}
                        onChange={event => { handlePasswordFieldChange('currentPassword', event) }}
                    />

                    <h3>New Password</h3>
                    <input
                        className='w-full mb-2 outline-none rounded-md border-[1px] pl-2 h-10'
                        type="password"
                        name="WorkspaceName"
                        placeholder='New Password'
                        value={passwordFields.newPassword}
                        onChange={(event) => {
                            handlePasswordFieldChange('newPassword', event)
                        }}
                    />

                    <h3>Confirm Password</h3>
                    <input
                        className='w-full mb-2 outline-none rounded-md border-[1px] pl-2 h-10'
                        type="password"
                        name="WorkspaceName"
                        placeholder='Confirm Password'
                        value={passwordFields.confirmPassword}
                        onChange={(event) => { handlePasswordFieldChange('confirmPassword', event) }}
                    />


                    <div className='bg-main p-2 w-24 items-center justify-center flex rounded-md text-white active:scale-95'>
                        <button onClick={changePassword}>Update</button>
                    </div>
                    <p className='font-extralight mt-2 text-red-500'>{passChangeMessage}</p>
                </div>
            </div>
            <hr />

            <div className='w-full flex p-10 gap-8'>
                <div className='w-[40%]'>
                    <h3 className='text-xl font-bold'>Other Settings</h3>
                    <p>Update other settings associated with your account.</p>
                </div>
                <div className='w-[60%] flex flex-col gap-4 justify-start'>
                    <div className='bg-red-500 px-4 p-2 w-fit items-center justify-center flex rounded-md text-white active:scale-95'>
                        <button onClick={deleteUser}>Delete Account</button>
                    </div>
                </div>
            </div>
        </>
    )
}
