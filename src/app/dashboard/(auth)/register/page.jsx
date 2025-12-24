"use client"
import React, { useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const Register = () => {
  const [err, setErr] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target);

    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
      res.status === 201 && router.push("/dashboard/login?success=Account created successfully")
    } catch (err) {
      setErr(true)
      if (res.status === 400) {
        setErr("email already exist")
      }
      console.log(err);
    }
  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder='username' className={styles.input} />
        <input name="email" type="email" placeholder='email' className={styles.input} />
        <input name="password" type="password" placeholder='password' className={styles.input} />
        <button className={styles.button}>Register</button>
        {err && <p className={styles.error}>something went wrong</p>}
        <Link className={styles.Link} href="/dashboard/login">login with an existing account</Link>
      </form>
    </div>
  )
}

export default Register
