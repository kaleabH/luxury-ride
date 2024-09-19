import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() { 

    const handleChange = (e) => setData('role', e.target.value);

    const { data, setData, post, processing, errors, reset } = useForm({
        role: 'admin',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: 'ET',
        city: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="firstName" value="First Name" />

                    <TextInput
                        id="firstName"
                        firstName="firstName"
                        value={data.firstName}
                        className="mt-1 block w-full"
                        autoComplete="firstName"
                        isFocused={true}
                        onChange={(e) => setData('firstName', e.target.value)}
                        required
                    />

                    <InputError message={errors.firstName} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="lastName" value="Last Name" />

                    <TextInput
                        id="lastName"
                        lastName="lastName"
                        value={data.lastName}
                        className="mt-1 block w-full"
                        autoComplete="lastName"
                        isFocused={true}
                        onChange={(e) => setData('lastName', e.target.value)}
                        required
                    />

                    <InputError message={errors.lastName} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="phone" value="Phone" />

                    <TextInput
                        id="phone"
                        phone="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="phone"
                        isFocused={true}
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="role">Select Role: </label>
                    <select id="role" value={data.role} onChange={handleChange}>
                        <option value="admin">Admin</option>
                        <option value="operator">Operator</option>
                     </select>
                    {/* <p>Selected Role: {data.role}</p> */}
                 </div>

                <div>
                    <InputLabel htmlFor="city" value="City" />

                    <TextInput
                        id="city"
                        city="city"
                        value={data.city}
                        className="mt-1 block w-full"
                        autoComplete="city"
                        isFocused={true}
                        onChange={(e) => setData('city', e.target.value)}
                        required
                    />

                    <InputError message={errors.city} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
