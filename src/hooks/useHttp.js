import { useCallback, useState, useEffect } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(
      responseData.message || `Something get wrong, failed to send request`
    );
  }
  return responseData;
}

export function useHttp(url, config, initData) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initData);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest() {
      setIsLoading(true);
      try {
        const responseData = await sendHttpRequest(url, config);
        setData(responseData);
      } catch (error) {
        setError(error.message || `Something get wrong`);
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (config && config.method === "GET") {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
}
