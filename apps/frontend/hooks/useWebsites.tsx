"use client";
import { API_BACKRDEND_URL } from '@/config';
import { useAuth } from '@clerk/nextjs'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Website{
    id: string
    url: string
    name: string
    status: {
        id:string
        createdAt: string
        state: string
        latency: number
    }
}

export default function useWebsites() {
    
    const [Websites, setWebsites] = useState<Website[]>([])

    const {getToken} = useAuth()

    const refresh = async () => {
        const token = await getToken();
        const res = await axios.get(`${API_BACKRDEND_URL}/api/v1/websites`, {
            headers: {
                Authorization: token
            }
        });
        console.log(res);
        
        setWebsites(res.data.websites)
    }
    useEffect(() => {
        refresh()
        const interval = setInterval(() => {
            refresh()
        }
        , 1000 * 60 * 2)
        return () => clearInterval(interval)
    },[])
            
  return {Websites,refresh};
}
