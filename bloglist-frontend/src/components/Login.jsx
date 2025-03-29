const LoginForm = ({
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit
}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
              <h1>
                Log into application
              </h1>
              <div>
                username
                <input
                  type = "text"
                  value = {username}
                  onChange = {handleUsernameChange}
                />
              </div>
              <div>
                password
                <input
                  type = "password"
                  value = {password}
                  onChange = {handlePasswordChange}
                />
              </div>
              <button type="submit">login</button>
            </form>
        </div>
    )
}


export default LoginForm