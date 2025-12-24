"use client"
import React from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import styles from './page.module.css'

const Login = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "Loading") {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    if (status === "authenticated") {
        router?.push("/")
    }

    if (status === "unauthenticated") {
        router?.push("/dashboard/login")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        signIn("credentials", { email, password, redirect: true, callbackUrl: "/" });
    }
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder='email' className={styles.input} />
                <input name="password" type="password" placeholder='password' className={styles.input} />
                <button className={styles.button}>Login</button>
                <button type="button" className={styles.authbutton} onClick={() => signIn("google")}>SignIn with Google</button>
                <button type="button" className={styles.authbutton} onClick={() => signIn("github")}>SignIn with Github</button>
            </form>
        </div>
    )
}

export default Login
