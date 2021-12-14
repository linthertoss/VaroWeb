import React from "react";

const useToken = () => {
  const [data, setData] = React.useState({
    response: null,
    error: false,
    loading: true,
  });

  React.useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          const resp = await fetch("/users/token/new", {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await resp.json();
          setData({
            response: data,
            error: false,
            loading: false,
          });
          localStorage.setItem("token", JSON.stringify(data));
          return;
        }

        setData({
          response: JSON.parse(token),
          error: false,
          loading: false,
        });
      } catch (error) {
        setData({
          response: { status: "network_failure", error },
          error: true,
          loading: false,
        });
      }
    })();
  }, []);

  return { ...data };
};

export default useToken;
