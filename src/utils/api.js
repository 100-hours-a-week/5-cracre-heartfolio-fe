export const fetchWithToken = async (url) => {
    let token = localStorage.getItem("access_token");
    let response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (response.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      const refreshResponse = await fetch(`${process.env.REACT_APP_API_URI}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: refreshToken }),
      });
  
      if (refreshResponse.status === 200) {
        const data = await refreshResponse.json();
        localStorage.setItem("access_token", data.accessToken);
  
        token = data.accessToken;
        response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
        return null;
      }
    }
  
    return response.json();
  };
  