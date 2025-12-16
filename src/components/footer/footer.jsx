import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'

const Footer = () => {
    return (
        <div className={styles.container}>
            <div>©2023 Nextify. All rights reserved.</div>
            <div className={styles.social}>
                <div className={styles.imgContainer}></div>
                <Image src="/1.png" className={styles.icon} width={15} height={15} alt="Facebook" />
                <Image src="/2.png" className={styles.icon} width={15} height={15} alt="Insta" />
                <Image src="/3.png" className={styles.icon} width={15} height={15} alt="Twitter" />
                <Image src="/4.png" className={styles.icon} width={15} height={15} alt="Youtube" />
            </div>
        </div>
    )
}

export default Footer
