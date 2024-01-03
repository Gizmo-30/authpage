import {Alert, Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import Handlers from "../Methods/Handlers";
import {Input} from "./Input";
import {FormProvider, useForm} from 'react-hook-form';
import validation from "../Methods/Validation";
import axios from "axios";


const SingUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [reset, setReset] = useState(false);
    const [success, setSuccess] = useState(false);

    const handler = new Handlers(setUsername, setPassword, setConfirmPassword)

    function handleReset() {
        setError("")
        setReset(false)
        setUsername('')
        setPassword('')
        setConfirmPassword('')
    }

    const methods = useForm()
    const onSubmit = methods.handleSubmit(() => {
        async function post() {
            try {
                const response = await axios.post('/signup', {username, password})
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
    })
  return (
      <FormProvider {...methods}>
          <Form style={{width: '450px'}} noValidate className="border border-primary px-4 py-5 rounded-4" onSubmit={e => e.preventDefault()}>
              <Input type="text" label="username" id="username" value={username} onChange={handler.handleUsername} validation={validation.username}/>
              <Input type="password" label="Password" id="password" value={password} onChange={handler.handlePassword} validation={validation.password}/>
              <Input type="password" label="Confirm password" id="confirmPassword" value={confirmPassword} onChange={handler.handleConfirmPassword}
                     validation={{...validation.confirmPassword, validate: (value) => value === password || 'Passwords do not match'}}
              />

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">User has been registered successfully</Alert>}

              <Form.Group >
                  {reset && <Button id="resetButton" variant="primary" className="mt-3 mb-1 w-100 " type="reset" onClick={handleReset}>Reset</Button>}
                  <Button variant="primary" className="mt-3 mb-3 w-100" onClick={onSubmit}>Sign up</Button>
              </Form.Group>
              <Form.Group className="text-center">
                  <p>already have account ? <NavLink to="/">Sign in</NavLink></p>
              </Form.Group>
          </Form>
      </FormProvider>
  )
}

export default SingUp