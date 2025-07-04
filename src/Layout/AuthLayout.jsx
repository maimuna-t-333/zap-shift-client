import React from 'react';
import { Outlet } from 'react-router';
import img from '../assets/authImage.png'
import ProfastLogo from '../Pages/Shared/ProfastLogo/ProfastLogo';

const AuthLayout = () => {
    return (
        <div className="p-12 bg-base-200 " >
            <div>
                <ProfastLogo></ProfastLogo>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse mx-auto">

                <div className='flex-1'>
                    <img
                        src={img}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;