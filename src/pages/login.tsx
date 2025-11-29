import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Head from 'next/head';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = login(username, password);
        if (success) {
            router.push('/');
        } else {
            setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <Head>
                <title>เข้าสู่ระบบ | Event X</title>
                <meta name="description" content="Login to Event X" />
            </Head>

            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm dark:bg-gray-900/90">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">ยินดีต้อนรับกลับ</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            ชื่อผู้ใช้
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                            placeholder="เช่น admin หรือ user1"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            รหัสผ่าน
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-center text-sm font-medium text-white hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-all duration-200 transform hover:scale-[1.02]"
                    >
                        เข้าสู่ระบบ
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
                    <p>Demo Credentials:</p>
                    <p>Admin: admin / 1234</p>
                    <p>User: user1 / 1234</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
