export const fetchWithToken = async (url, options = {}) => {
  let token = localStorage.getItem("access_token");
  // url에 '/portfolio'가 포함되고 토큰이 없을 때 함수를 바로 종료
  if (url.includes("/portfolio") && !token) {
    return null; // 토큰이 없으므로 요청을 실행하지 않고 null을 반환
  }
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
      // window.location.href = "/login";
      return null;
    }
  }
  // JSON 응답이 없는 경우 처리
  if (
    response.status === 204 ||
    response.headers.get("Content-Length") === "0"
  ) {
    return null; // No content (빈 응답 처리)
  }
  // 응답이 JSON이 아닌 경우 텍스트로 처리
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    try {
      return await response.json(); // JSON 파싱 시도
    } catch (error) {
      // console.error("Error parsing JSON response:", error);
      return null; // JSON 파싱 오류 처리
    }
  } else {
    // JSON이 아닌 응답은 텍스트로 처리
    return await response.text();
  }
};
