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
    const [datas, setDatas] = useState([]);
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);

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
    console.log(session)
    console.log(status)

    const router = useRouter()

    const fetcher = (...args) => fetch(...args).then((res) => res.json())

    const username = session?.user?.name

    console.log("SESSION:", session)
    console.log("USERNAME:", session?.user?.name)
    console.log("STATUS:", status)

    const { data, error } = useSWR(username ? `/api/posts?username=${username}` : null, fetcher)

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
                body: JSON.stringify({
                    title,
                    desc,
                    img,
                    content,
                    username: session.data.user.name,
                })
            })
        } catch (err) {
            console.log(err)
        }
    }

    if (status === "authenticated") {
        return (
            <div className={styles.container} >
                <div className={styles.posts}>
                    {data.map(post => {
                        <div className={styles.post} key={post._id}>
                            <div className={styles.imgContainer}>
                                <Image src={post.img} alt='iamge' height={100} width={200} />
                            </div>
                            <h2 className={styles.title}>{post.title}</h2>
                            <span className={styles.delete}>X</span>
                        </div>
                    })}
                </div>
                <form className={styles.new} onSubmit={handleSubmit}>
                    <h1>Add New Post</h1>
                    <input type="text" placeholder='Title' className={input} />
                    <input type="text" placeholder='Desc' className={input} />
                    <input type="text" placeholder='Image' className={input} />
                    <textarea placeholder='Content' cols="30" rows='10' className={styles.textarea}></textarea>
                    <button className={styles.button}>Send</button>
                </form>
            </div>
        )
    }
}

export default Dashboard
