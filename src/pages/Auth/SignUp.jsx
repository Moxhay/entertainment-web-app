import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import FormInput from '@components/form/FormInput.jsx';
import api from '../../api/api.js';
import { useState } from 'react';
import { FormButton } from '@components/form/FormButton.jsx';
import { AuthFooter } from '@components/form/AuthFooter.jsx';
import { FormWrapper } from '@components/form/FormWrapper.jsx';
import { Form } from '@components/form/Form.jsx';
import { submitForm } from '../../helpers.jsx';

const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('enter a valid email').required("Can't be empty"),
    password: Yup.string()
        .min(8, 'Password length need to be minimum of 8 character.')
        .max(20, 'Password length cannot be more than 20 character.')
        .required('Password is required.'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match.')
        .required('Confirm Password is required.')
});
const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    const submitRegister = (values) => {
        submitForm({
            setLoading,
            ApiEndPoint: api.auth.register,
            payload: {
                username: values.email,
                email: values.email,
                password: values.password
            },
            navigate,
            setError
        });
    };

    return (
        <Formik initialValues={initialValues} onSubmit={submitRegister} validationSchema={ValidationSchema}>
            {(formik) => {
                const { values, handleChange, handleSubmit, handleBlur, errors, touched } = formik;
                return (
                    <FormWrapper>
                        <Form handleSubmit={handleSubmit} title="Sign Up">
                            <div className="flex flex-col gap-3">
                                <FormInput
                                    name={'email'}
                                    value={values.email}
                                    errors={errors.email}
                                    touched={touched.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type={'email'}
                                    placeholder={'Email address'}
                                />

                                <FormInput
                                    name={'password'}
                                    value={values.password}
                                    errors={errors.password}
                                    touched={touched.password}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type={'password'}
                                    placeholder={'Password'}
                                />

                                <FormInput
                                    name={'confirmPassword'}
                                    value={values.confirmPassword}
                                    errors={errors.confirmPassword}
                                    touched={touched.confirmPassword}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type={'password'}
                                    placeholder={'Repeat password'}
                                />
                                {error && <p className="font-Inter text-primaryRed! text-sm font-extralight">Email already exist</p>}
                            </div>
                            <div className="flex w-full flex-col gap-8 md:gap-7">
                                <FormButton disabled={loading} submit={submitRegister}>
                                    {' '}
                                    Create an account
                                </FormButton>
                                <AuthFooter message="Already have an account?" linkMessage="Login" linkPath="/Login" />
                            </div>
                        </Form>
                    </FormWrapper>
                );
            }}
        </Formik>
    );
};
export default SignUp;
