"use client";

import Button from "@/app/(landing)/components/ui/button"
import { login } from "@/app/services/auth.service";
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            router.push('/admin/products')
        }
    }, [router])

    const handleLogin = async () => {
        setIsLoading(true)
        try {
            const data = await login({email, password})
            if (data.token) {
                router.push('/admin/products')
            }
        } catch (err: any) {
            setErrorMessage(err.message || 'Something went wrong. Please, try again later!')
            console.error('Login error')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="bg-[#F7F9FA] w-full min-h-screen flex justify-center items-center">
            <div className="max-w-136 w-full bg-white rounded-xl border-t-4 border-primary py-12 px-[72px]">
                <Image 
                src="/images/logo-admin.svg" 
                alt="logo admin" 
                width={304} 
                height={51} 
                className="mx-auto mb-4" />
                <p className="opacity-50 text-sm text-center">Enter your credentials to access the dashboard</p>
                
                {errorMessage && (
                    <div className="px-3 py-1 bg-primary-alternate border border-primary rounded-md text-primary text-sm text-center w-full mb-2">
                        {errorMessage}
                    </div>
                )}
                <div className="input-group-admin py-2">
                    <label htmlFor="email" className="font-bold">Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="admin@store.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-group-admin py-2">
                    <label htmlFor="password" className="font-bold">Password</label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="••••••••••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button className="ml-auto mt-4 rounded-lg w-full" onClick={handleLogin}>
                    {
                        isLoading ? 'Signing in...' : 'Sign In'
                    }
                </Button>
            </div>
        </main>
    )
}

export default LoginPage