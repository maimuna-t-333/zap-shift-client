import React from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';
import { Link } from 'react-router';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    console.log(errors)
    const onSubmit = data => {
        console.log(data)

    }
    return (
        <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body">
                    <h1 className="text-5xl font-bold">Create a account!</h1>
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input type="email"
                            {...register('email')}
                            className="input"
                            placeholder="Email" />

                        <label className="label">Password</label>
                        <input type="password"
                            {...register('password',
                                {
                                    required: true,
                                    minLength: 6
                                })}
                            className="input"
                            placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Minimum required password is 6 </p>
                        }



                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-primary text-black mt-4">Login</button>
                        <SocialLogin></SocialLogin>
                    </fieldset>
                    <p>New to this website? Please <Link to='/register' className="btn btn-link">Register</Link> </p>
                </div>
            </form>
        </div>
    );
};

export default Login;