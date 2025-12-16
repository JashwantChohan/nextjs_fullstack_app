import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'

async function getData(_id) {
    try {
        const res = await fetch(`http://localhost:3000/api/posts/${_id}`, { cache: 'no-store' });

        if (!res.ok) {
            return null; // return null instead of throwing
        }

        const data = await res.json();

        // Optional: handle empty response
        if (!data) return null;

        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}


export async function generateImageMetadata({ params }) {
    const post = await getData(params._id);
    return {
        title: post.title,
        description: post.desc,
    }
}



const BlogPost = async ({ params }) => {
    const { id } = await params
    const data = await getData(id)

    if (!data) {
        return (
            <div className={styles.container}>
                <h1>Post not found</h1>
                <p>The post you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.info}>
                    <h1 className={styles.title}>
                        {data.title}
                    </h1>
                    <p className={styles.desc}>{data.desc}</p>
                    <div className={styles.author}>
                        <Image
                            src={data.img || '/default-avatar.png'}
                            alt=""
                            width={40}
                            height={40}
                            className={styles.avatar}
                        />
                        <span className={styles.username}>{data.username}</span>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        src={data.img}
                        alt=""
                        fill={true}
                        className={styles.image}
                    />
                </div>
            </div>
            <div className={styles.content}>
                {data.content}
            </div>
        </div>
    )
}

export default BlogPost
