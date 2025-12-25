"use client"
import { useSession } from 'next-auth/react';
import React from 'react'
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css'

const metadata = {
    title: "Nextify | Dashboard",
    description: "Nextify app",
};

const Dashboard = () => {
    // useEffect(() => {
    //     const getData = async () => {
    //         setLoading(true);
    //         const res = await fetch("https://jsonplaceholder.typicode.com/posts", { cache: 'no-store' })

    //         if (!res.ok) {
    //             setErr(true);
    //             setLoading(false);
    //             return;
    //         }

    //         const data = await res.json();

    //         setData(data);
    //         setLoading(false);
    //     }
    //     getData();
    // }, []);

    const { data: session, status } = useSession()
    const router = useRouter()

    console.log(session)
    console.log(status)

    const fetcher = (...args) => fetch(...args).then((res) => res.json())

    const username = session?.user?.name

    console.log("SESSION:", session)
    console.log("USERNAME:", session?.user?.name)
    console.log("STATUS:", status)

    const { data, mutate, error, isLoading } = useSWR(username ? `/api/posts?username=${username}` : null, fetcher)
    console.log(data)

    if (status === "Loading") {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    if (status === "unauthenticated") {
        router?.push("/dashboard/login")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const desc = e.target.desc.value
        const img = e.target.img.value
        const content = e.target.content.value

        try {
            await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    desc,
                    img,
                    content,
                    username: session.user.name,
                })
            })
            mutate(`/api/posts?username=${username}`)
            e.target.reset()
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            })
            mutate()
        } catch (err) {
            console.log(err)
        }
    }

    if (status === "authenticated") {
        return (
            <div className={styles.container}>
                <div className={styles.posts}>
                    {data?.map(post => (
                        <div className={styles.post} key={post._id}>
                            <div className={styles.imgContainer}>
                                <Image src={post.img} alt='image' height={100} width={200} />
                            </div>
                            <h2 className={styles.title}>{post.title}</h2>
                            <span onClick={() => handleDelete(post._id)} className={styles.delete}>X</span>
                        </div>
                    ))}
                </div>
                <form className={styles.new} onSubmit={handleSubmit}>
                    <h1>Add New Post</h1>
                    <input name='title' type="text" placeholder='Title' className={styles.input} />
                    <input name='desc' type="text" placeholder='Desc' className={styles.input} />
                    <input name='img' type="text" placeholder='Image' className={styles.input} />
                    <textarea name='content' placeholder='Content' cols="30" rows='10' className={styles.textarea}></textarea>
                    <button className={styles.button}>Send</button>
                </form>
            </div>
        )
    }
}

export default Dashboard