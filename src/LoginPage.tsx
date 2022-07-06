import {useEffect} from "react";
import queryString from "query-string";

function LoginPage() {
    const page = "https://oauth.vk.com/authorize?client_id=8212356&display=popup&redirect_uri=http://localhost:3000/getToken&scope=offline&response_type=token&v=5.21";

    const login = async () => {
        window.location.href = page;
    }

    return (
      <div>
          <button className="btn btn-dark" onClick={login}>Войти</button>
      </div>
    );
}

export default LoginPage;