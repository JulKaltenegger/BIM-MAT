import React, { useState } from 'react'
import { useEffect } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { ToastrMessage, useSettings } from '../../services/useSettings'
import ToastrStream from '../../streams/ToastrStream'
import './Toastr.css'

// setInterval(() => {
//     const newToast = {
//         message: `Sample message ${(Math.random() * 10000).toFixed()}`,
//         title: `Random title ${(Math.random() * 100).toFixed(0)}`,
//     }
//     ToastrStream.next(newToast)
// }, 15000)

interface Message extends ToastrMessage {
    key: number
}

function GetToast(message: Message) {

    const { autoHideToast } = useSettings()
    const [show, setShow] = useState(true)

    return (
        <Toast show={show} onClose={() => setShow(!show)} delay={10000} autohide={autoHideToast}>
            <Toast.Header closeButton={true}>
                <strong className="me-auto">{message.title}</strong>
                <small></small>
            </Toast.Header>
            <Toast.Body>{message.message}</Toast.Body>
        </Toast>
    )
}

export function Toastr() {

    const [toasts, setToasts] = useState<Message[]>([])

    const [toast, setToast] = useState<Message | null>(null)

    useEffect(() => {
        if (toast && setToasts && toasts) {
            setToasts([...toasts, toast])
        }
    }, [toast])

    useEffect(() => {
        ToastrStream.subscribe(m => {
            if (toasts) setToast({
                ...m,
                key: new Date().getTime() + Math.random() * 1000,
            })
        })
    }, [])

    return (
        <ToastContainer position={'bottom-center'}>
            {toasts!.map(t => <GetToast {...t} key={t.key} />)}
        </ToastContainer>
    )
}
