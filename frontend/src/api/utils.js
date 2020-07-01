const baseURL = "http://localhost:5000/api";
const defaultConfig = { cors: "no-cors", credentials: "include" };

export const callApi = async (url, config = {}) => {
  try {
    const response = await fetch(`${baseURL}${url}`, {
      ...defaultConfig,
      ...config,
    });
    return {
      success: {
        status: response.status,
        data: await response.json(),
      },
    };
  } catch (error) {
    return { error };
  }
};
