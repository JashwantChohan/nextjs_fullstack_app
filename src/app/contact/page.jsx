import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Button from '@/components/Button/Button'


export const metadata = {
    title: "Nextify | Contact",
    description: "Nextify app",
};

const Contact = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Lets keep in touch</h1>
            <div className={styles.content}>
                <div className={styles.imgContainer}>
                    <Image
                        src="/contact.png"
                        alt=""
                        fill={true}
                        className={styles.image}
                    />
                </div>
                <form className={styles.form}>
                    <input type="text" placeholder='Name' className={styles.input} />
                    <input type="text" placeholder='email' className={styles.input} />
                    <textarea className={styles.textArea} placeholder='message' cols="30" rows="10"></textarea>
                    <div className={styles.buttonContainer}>
                        <Button url="#" text="Send" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact
