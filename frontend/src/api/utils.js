const { REACT_APP_API_PORT, REACT_APP_API_PROTOCOL } = process.env;
const baseURL = `${REACT_APP_API_PROTOCOL || "http"}://${
  window.location.hostname
}:${REACT_APP_API_PORT || "5000"}/api`;
const defaultConfig = { cors: "no-cors", credentials: "include" };

const jsonOrNull = async (response) => {
  try {
    return await response.json();
  } catch (err) {
    return null;
  }
};

export const callApi = async (url, config = {}) => {
  try {
    const response = await fetch(`${baseURL}${url}`, {
      ...defaultConfig,
      ...config,
    });
    return {
      success: {
        status: response.body,
        data: await jsonOrNull(response),
      },
    };
  } catch (error) {
    return { error };
  }
};
