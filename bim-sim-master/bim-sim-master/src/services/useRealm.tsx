import React, { useContext, createContext } from 'react'
import { useState } from 'react'
export const API_URL = process.env.REACT_APP_API_SERVER || 'http://localhost'

export interface Query {
    title: string
    query: string
}

interface RealmApp {
    query: Query | null
    namespaces: any,
    updateQuery(query: Partial<Query>): void
}

// use Partial to init without default values 🙌
const RealmAppContext = createContext<Partial<RealmApp>>({})

export const useRealmApp = () => {
    return useContext(RealmAppContext)
}

export const ProviderRealmApp = ({ children }: { children: any }) => {
    const [query,] = useState<Query | null>(JSON.parse(localStorage.getItem('query') || '{}'))
    const [namespaces,] = useState<any>(null)

    const updateQuery = async (query: Partial<Query>) => {
        localStorage.setItem('query', JSON.stringify(query))
    }

    const wrapper = {
        namespaces,
        query, updateQuery
    }
    return (
        <RealmAppContext.Provider value={wrapper}>
            {children}
        </RealmAppContext.Provider>
    )
}
