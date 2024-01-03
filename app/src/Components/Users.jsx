import React, {useContext, useEffect, useState} from 'react';
import {Button, ButtonGroup, Form, Table} from "react-bootstrap";
import axios from "axios";
import {TbLockOpen} from "react-icons/tb";
import {MdDelete} from "react-icons/md";
import ConfirmAction from "./ConfirmAction";
import {ErrorContext} from "../Methods/ErrorContext"
import {SuccessContext} from "../Methods/SuccessContext"
import {NavLink} from "react-router-dom";

const Users = () => {

    useEffect(() => {
        fetchData();
    }, [])

    const [modal, setModal] = React.useState(false);
    const [users, setUsers] = useState(null)

    const [error, setError] = useContext(ErrorContext)
    const [success, setSuccess] = useContext(SuccessContext)
    const [status, setStatus] = useState("")
    const [checkedAll,setCheckedAll] = useState(false)
    const [singleCheck,setSingleCheck] = useState([])
    const currentUser = localStorage.getItem('user');
    const handleAll = () => {
        setCheckedAll((prev) => !prev)
        setSingleCheck((prev) => prev.map(() => !checkedAll));
    }
    const handleSingle = (i) => {
        setSingleCheck((prev) => {
            const newChecks = [...prev];
            newChecks[i] = !newChecks[i];
            return newChecks;
        })
    };

    function onHide() {
        setModal(false)
        setError("")
        setSuccess(false)
        setCheckedAll(false)
        setSingleCheck(prev => Array(prev.length).fill(false))
    }

    async function fetchData() {
        try {
            let response = await axios.get('/users');
            setUsers(response.data);
            setSingleCheck(response.data.map(() => false));
        } catch (e) {
            console.error('Error getting data:', e);
        }
    }

    async function onConfirm() {
        let checked = []
        singleCheck.forEach((e,i) => e === true && checked.push(i+1))
        if(!checked.length) return setError("No selected user")
        try {
            let response = await axios.post('/status', {checked, status})

            let currentUserIndex = users.findIndex(obj => obj.username === currentUser)
            if(checked.includes(currentUserIndex + 1) && status !== 'active') {
                localStorage.removeItem('user')
                setTimeout(() => {
                    window.location.href = "/"
                }, 2000)
            }
            setSuccess(response.data)
            await fetchData()
        } catch (e) {
            console.error(e);
            setError(e.response.data)
        }
    }

    return (
        <div className="w-100">
            <ConfirmAction
                show={modal}
                onHide={onHide}
                confirm={onConfirm}
                isError={true}
                status={status}
            />
            <div className="d-flex justify-content-between align-items-center">
                <ButtonGroup className="opacity-75 mb-4" onClick={() => setModal(true)}>
                    <Button variant="outline-danger" className="position-relative"
                            onClick={(e) => setStatus(e.target.id)}  id="blocked"
                    >
                            Block user
                    </Button>
                    <Button className="position-relative" variant="outline-success">
                        <Button className="position-absolute top-0 start-0 w-100 h-100 opacity-0" id="active" onClick={(e) => setStatus(e.target.id)}></Button>
                        <TbLockOpen />
                    </Button>
                    <Button className="position-relative" variant="outline-warning" >
                        <Button className="position-absolute top-0 start-0 w-100 h-100 opacity-0" id="delete" onClick={(e) => setStatus(e.target.id)}></Button>
                        <MdDelete />
                    </Button>
                </ButtonGroup>
                <div className="d-flex column-gap-3">
                    <p>User: <strong>{currentUser}</strong></p>
                    <NavLink to="/">Log out</NavLink>
                </div>
            </div>
            <Table striped bordered hover >
                <thead>
                <tr>
                    <th><Form.Check type="checkbox" id="checks" checked={checkedAll} onChange={handleAll}/></th>
                    <th>#</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>registered</th>
                    <th>status</th>
                </tr>
                </thead>
                <tbody>
                    {users ? users.map((e,i) => {
                        return(
                            <tr key={i}>
                                <td><Form.Check id={i} type="checkbox" checked={singleCheck[i]} onChange={() => handleSingle(i)}/></td>
                                <td>{i+1}</td>
                                <td>{e.username}</td>
                                <td>{e.password}</td>
                                <td>{e.registered}</td>
                                <td>{e.status}</td>
                            </tr>
                        )
                    }): null}
                </tbody>
            </Table>
        </div>
    );
}

export default Users