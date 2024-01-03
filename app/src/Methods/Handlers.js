class Handlers {
    constructor(setUsername, setPassword, setConfirmPassword) {
        this.setUsername = setUsername
        this.setPassword = setPassword
        this.setConfirmPassword = setConfirmPassword ? setConfirmPassword : null
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    }

    handleUsername(event) {
        this.setUsername(event.target.value.trim())
    }
    handlePassword(event) {
        this.setPassword(event.target.value.trim())
    }
    handleConfirmPassword(event) {
        this.setConfirmPassword(event.target.value.trim())
    }
}
export default Handlers