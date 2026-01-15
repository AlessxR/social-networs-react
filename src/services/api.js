
export const fetchData = async (url, method, rejectWithValue, body = null) => {
    try {

        const options = {
            credentials: "include",
            method,
            headers: {
                "API-KEY": "94313c17-18b2-495e-8185-1e9cf7de7ac7",
                ...(body ? {"Content-Type": "application/json"} : {})
            },
        };

        if (body && method !== "GET") {
            options.body = body;
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            return rejectWithValue(response.statusText);
        }

        return await response.json();
    } catch (error) {
        return rejectWithValue({status: 500, message: error.message});
    }
}

