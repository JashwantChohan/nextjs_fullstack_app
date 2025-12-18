"use client"

import React from 'react'
import { signIn } from "next-auth/react"
import styles from '@/components/Button/button.module.css'

const Login = () => {
    return (
        <div>
            <button type="button" className={styles.authbutton} onClick={() => signIn("google")}>SignIn with Google</button>
            <button type="button" className={styles.authbutton} onClick={() => signIn("github")}>SignIn with Github</button>
        </div>
    )
}

export default Login
