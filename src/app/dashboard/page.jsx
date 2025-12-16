"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import useSWR from 'swr';

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

    const fetcher = (...args) => fetch(...args).then((res) => res.json())

    const { data, error } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher)


    console.log(data)

    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard
