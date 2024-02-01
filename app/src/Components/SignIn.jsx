import Form from "react-bootstrap/Form";
import {Alert, Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import React, {useContext, useState} from "react";
import axios from "axios";
import {Input} from "./Input";
import validation from "../Methods/Validation";
import Handlers from "../Methods/Handlers";
import {FormProvider, useForm} from "react-hook-form";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [reset, setReset] = useState(false);
    const [success, setSuccess] = useState(false);

    const handler = new Handlers(setUsername, setPassword)

    function handleReset() {
        setError("")
        setReset(false)
        setUsername("")
        setPassword("")
    }


    const methods = useForm()
    const onSubmit = methods.handleSubmit(data => {
        async function post() {
            try {
                const response = await axios.post('/login', {username, password})
                if (response) {
                    methods.reset()
                    setSuccess(true)
                    localStorage.clear()
                    localStorage.setItem('user', username)
                    await new Promise(res => setTimeout(() => {
                        window.location.href = "/users"
                        res()
                    }), 4000)
                }
            } catch (e) {
                console.log(e)
                setError(e.response.data)
                setReset(true)
            }
        }
        post()
    });

    console.log(localStorage.getItem('user'))
    return (
        <FormProvider {...methods}>
            <Form style={{width: '450px'}} className="border border-primary px-4 py-5 rounded-4" onSubmit={onSubmit}>
                <Input type="text" label="username" id="username" value={username} onChange={handler.handleUsername} validation={validation.username}/>
                <Input type="password" label="Password" id="password" value={password} onChange={handler.handlePassword} validation={validation.password}/>


                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">User log in successfully</Alert>}

                {reset && <Button id="resetButton" variant="primary" className="mt-3 mb-1 w-100 " type="reset" onClick={handleReset}>Reset</Button>}
                <Button variant="primary" className="mt-3 mb-4 w-100" type="submit">Sign in</Button>

                <Form.Group className="text-center">
                    <p>Not a member? <NavLink to="/signup">Register</NavLink></p>
                </Form.Group>
            </Form>
        </FormProvider>
    )
}

export default SignIn