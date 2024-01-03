export function findInputError(errors, name) {
    return Object.keys(errors)
        .filter(key => key.includes(name))
        .reduce((cur, key) => {
            return Object.assign(cur, {error: errors[key]})
        }, {})
}

export const isFormInvalid = err => {
    return Object.keys(err).length > 0;
}