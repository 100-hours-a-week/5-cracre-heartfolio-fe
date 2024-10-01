export const fetchWithToken = async (url, options = {}) => {
  let token = localStorage.getItem("access_token");
  let response = await fetch(url, {
    ...options, // options 객체의 모든 속성 포함
    headers: {
      ...options.headers, // 기존 options.headers 값 유지
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // 항상 Content-Type을 포함
    },
  });

  if (response.status === 401) {
    const refreshToken = localStorage.getItem("refresh_token");
    const refreshResponse = await fetch(
      `${process.env.REACT_APP_API_URI}/auth/refresh-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: refreshToken }),
      }
    );

    if (refreshResponse.status === 200) {
      const data = await refreshResponse.json();
      localStorage.setItem("access_token", data.accessToken);

      token = data.accessToken;
      response = await fetch(url, {
        ...options, // 새로운 토큰을 사용해 다시 요청할 때에도 options 유지
        headers: {
          ...options.headers, // headers도 유지하면서 새로운 토큰 추가
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return null;
    }
  }
  // 응답이 JSON이 아닌 경우 텍스트로 처리
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    try {
      return await response.json(); // JSON 파싱 시도
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      return null; // JSON 파싱 오류 처리
    }
  } else {
    // JSON이 아닌 응답은 텍스트로 처리
    return await response.text();
  }
};
