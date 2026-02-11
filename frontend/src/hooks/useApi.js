import { useState } from "react";

export default function useApi(apiFunc) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const request = async (...args) => {
		try {
			setLoading(true);
			const res = await apiFunc(...args);
			setData(res.data);
			return res;
		} catch (err) {
			setError(err);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return { request, loading, data, error };
}
