const baseURL = "http://localhost:5000/api";
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
