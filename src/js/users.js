import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { json } from "react-router-dom";

export default function Users() {
    const [data, setData] = useState([])
    const [mode, setMode] = useState('online')
    useEffect(() => {
        let url = "https://jsonplaceholder.typicode.com/users"
        fetch(url).then((response) => {
            response.json().then((result) => {
                console.warn("result", result)
                setData(result)
                localStorage.setItem("users", JSON.stringify(result))
            })
        }).catch(err => {
            let collection = localStorage.getItem("users")
            setData(JSON.parse(collection))
            setMode('offline')
        })
    }, [])
    return (
        <div>
            <div>
                {
                    mode === 'offline' ?
                        <div class="alert alert-warning" role="alert">
                            you are in offline mode or there is some issue with your internet connection
                        </div>

                        : null
                }
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => (
                            <tr key={item.id} >
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.address.street}</td>

                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </div>
    )
}