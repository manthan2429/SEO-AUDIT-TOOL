import axios from "axios";

let loaderRef;
let snackbarRef;

export const injectRefs = (loader, snackbar) => {
	loaderRef = loader;
	snackbarRef = snackbar;
};

const axiosClient = axios.create({
	baseURL: "http://localhost:5000",
	headers: {
		"Content-Type": "application/json",
	},
});

axiosClient.interceptors.request.use((config) => {
	loaderRef?.setLoading(true);
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		loaderRef?.setLoading(false);
		return response.data;
	},
	(error) => {
		console.log(error, "erroraxios");
		console.log(error.response, "erroraxiosreposnme");

		loaderRef?.setLoading(false);

		let message = "Something went wrong";

		if (error.response) {
			message = error.response.data?.message || error.response.statusText;
		} else if (error.request) {
			message = "Server not responding";
		}

		snackbarRef?.showSnackbar(message);

		return Promise.reject(error);
	},
);

export default axiosClient;
