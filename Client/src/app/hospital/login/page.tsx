"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function HospitalLoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login attempt:", { email, password });
    };

    return (
        <div className="font-display bg-background-light text-[#111318] antialiased selection:bg-primary/20 selection:text-primary min-h-screen flex flex-col">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                {/* Header Section */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#dbdfe6] bg-white px-6 py-4 lg:px-10">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">local_hospital</span>
                        </div>
                        <h2 className="text-[#111318] text-lg font-bold leading-tight tracking-[-0.015em]">RakshaPath</h2>
                    </Link>
                </header>

                {/* Main Content */}
                <main className="layout-container flex grow flex-col items-center justify-center py-10 px-4 sm:px-6">
                    <div className="w-full max-w-[480px]">
                        {/* Login Card */}
                        <div className="bg-white rounded-xl shadow-lg border border-[#dbdfe6] overflow-hidden">
                            {/* Page Heading (Inside Card for focused layout) */}
                            <div className="pt-10 pb-4 px-8 text-center">
                                <h1 className="text-[#111318] tracking-tight text-2xl font-bold leading-tight mb-2">Hospital Login</h1>
                                <p className="text-[#616f89] text-sm font-normal leading-normal">Access your hospital emergency dashboard</p>
                            </div>

                            {/* Form Section */}
                            <div className="px-8 pb-8 pt-2">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                    {/* Email Field */}
                                    <label className="flex flex-col w-full">
                                        <p className="text-[#111318] text-sm font-semibold leading-normal pb-2">Email Address</p>
                                        <input
                                            className="form-input flex w-full resize-none overflow-hidden rounded-lg text-[#111318] border border-[#dbdfe6] bg-white focus:border-primary focus:ring-1 focus:ring-primary h-12 placeholder:text-[#616f89] px-4 text-base font-normal leading-normal transition-colors"
                                            placeholder="admin@hospital.com"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </label>

                                    {/* Password Field */}
                                    <label className="flex flex-col w-full">
                                        <div className="flex justify-between items-center pb-2">
                                            <p className="text-[#111318] text-sm font-semibold leading-normal">Password</p>
                                        </div>
                                        <div className="relative flex w-full items-stretch rounded-lg">
                                            <input
                                                className="form-input flex w-full resize-none overflow-hidden rounded-lg text-[#111318] border border-[#dbdfe6] bg-white focus:border-primary focus:ring-1 focus:ring-primary h-12 placeholder:text-[#616f89] px-4 pr-12 text-base font-normal leading-normal transition-colors"
                                                placeholder="••••••••"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <button
                                                className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-[#616f89] hover:text-[#111318] transition-colors cursor-pointer"
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                            >
                                                <span className="material-symbols-outlined text-[20px]">
                                                    {showPassword ? "visibility_off" : "visibility"}
                                                </span>
                                            </button>
                                        </div>
                                        {/* Meta Text: Forgot Password */}
                                        <div className="flex justify-end pt-2">
                                            <a className="text-primary text-sm font-medium leading-normal hover:underline" href="#">Forgot Password?</a>
                                        </div>
                                    </label>

                                    {/* Security Warning */}
                                    <div className="flex gap-3 bg-blue-50 border border-blue-100 p-3 rounded-lg items-start">
                                        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">security</span>
                                        <p className="text-xs text-[#616f89] leading-snug">
                                            Only authorized hospital staff should access this system. Activity is monitored for security purposes.
                                        </p>
                                    </div>

                                    {/* Primary Action */}
                                    <button className="flex w-full items-center justify-center rounded-lg bg-primary h-12 px-5 text-white text-base font-bold leading-normal hover:bg-blue-700 transition-colors shadow-sm mt-2">
                                        Log In
                                    </button>
                                </form>
                            </div>

                            {/* Secondary Navigation */}
                            <div className="bg-slate-50 border-t border-[#dbdfe6] p-4 text-center">
                                <p className="text-[#616f89] text-sm font-normal">
                                    New hospital?
                                    <Link className="text-primary font-semibold hover:underline ml-1" href="/hospital/registration">Register your hospital</Link>
                                </p>
                            </div>
                        </div>

                        {/* Footer (Minimal) */}
                        <div className="mt-8 text-center">
                            <p className="text-[#9ca3af] text-xs font-medium">RakshaPath — Emergency Coordination Platform</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
