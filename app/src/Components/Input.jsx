import Form from "react-bootstrap/Form";
import React from "react";
import {AnimatePresence, motion} from 'framer-motion';
import {useFormContext} from 'react-hook-form'
import {findInputError, isFormInvalid} from '../Methods/findInputError'

export const Input = ({label, type, id, value, onChange, validation}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    const inputError = findInputError(errors, label);
    const isInvalid = isFormInvalid(inputError);
    return (
        <Form.Group className="form-outline mb-3" >
            <div className="d-flex justify-content-between align-items-center ">
                <Form.Label htmlFor={id}>{label}</Form.Label>

                <AnimatePresence mode="wait" initial={false}>
                    {isInvalid && (
                        <InputError
                            message={inputError.error.message}
                            key={inputError.error.message}
                        />
                    )}
                </AnimatePresence>
            </div>
            <Form.Control
                type={type}
                id={id}
                value={value}
                {...register(label, validation)}
                onChange={onChange}
            />
        </Form.Group>
    )
}
const InputError = ({message}) => {
    return (
        <motion.p
            className="d-flex justify-content-end text-danger p-1 rounded-2 "
            style={{background: "rgba(255,205,210, 0.6)"}}
            {...framer_error}
        >
            {message}
        </motion.p>
    )
}

const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
}