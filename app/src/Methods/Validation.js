//
// class Validation {
//     constructor(username, password, confirm, setError, error, setReset) {
//         this.username = username
//         this.password = password
//         this.confirm = confirm
//         this.setError = setError
//         this.setReset = setReset
//         this.error = error
//         this.result = []
//     }
//
//     CheckData(cond, err){
//         if(cond) {
//             this.setError(prev => [...prev, err])
//             this.Reset()
//             this.result.push(false)
//         } else this.result.push(true)
//     }
//
//     Reset() {
//         this.setReset(true)
//     }
//
//     Validate() {
//         this.CheckData(this.username.length > 7, "Username must be 7 characters or fewer")
//         this.CheckData(!isNaN(this.username[0]), "Username must start with letter")
//         this.CheckData(this.password.length < 3, "Password must be at least 3 symbols")
//         this.CheckData(this.password !== this.confirm, "Passwords do not match")
//
//         return !this.result.every(e => e === true)
//     }
//
// }
//
// module.exports = Validation

const validation = {
    username: {
        required: {
            value: true,
            message: 'required',
        },
        maxLength: {
            value: 15,
            message: `maximum 15 characters`
        },
        pattern: {
            value: /^[A-Za-z]+$/,
            message: "Only alphabets are allowed"
        },
    },
    password: {
        required: {
            value: true,
            message: 'required',
        },
        maxLength: {
            value: 25,
            message: `maximum 25 characters`,
        },
    },
    confirmPassword: {
        required: {
            value: true,
            message: 'required',
        },
    }
}

export default validation
