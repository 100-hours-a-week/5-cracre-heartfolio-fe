import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export function KakaoRedirect() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  useEffect(() => {
    fetch(`https://heartfolio.site/oauth?code=${code}`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('data', data.access_token);
        console.log(data);
        console.log(data.access_token);
        navigate('/');
      })
      .catch((error) => {
        console.error("오류 발생", error); //
      });
  }, []);

  return (
    <div>
      <p>로그인 중..</p>
    </div>
  );
}
export default KakaoRedirect;