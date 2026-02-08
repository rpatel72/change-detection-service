/* eslint-disable symbol-description */

import { notification } from "antd";
import axios from "axios";
import i18next from "i18next";
import { assign, isEmpty } from "lodash";

const LOCAL_STORAGE_KEY = {
	LANGUAGE: "language",
	TOKEN: "token",
	REFRESH_TOKEN: "refresh_token",
	THEME: "theme",
};

1;
const singletonEnforcer = Symbol();

class AxiosClient {
	axiosClient: any;

	static axiosClientInstance: AxiosClient;

	constructor(enforcer: any) {
		if (enforcer !== singletonEnforcer) {
			throw new Error("Cannot initialize Axios client single instance");
		}

		this.axiosClient = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
		});
		void this.getExistTokenOnLocalStorage();
		this.axiosClient.interceptors.request.use(
			(configure: any) => {
				const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN) ?? "";
				if (token) {
					configure.headers.Authorization = `Bearer ${token}`;
				}
				return configure;
			},
			(error: any): any => Promise.reject(error),
		);

		this.axiosClient.interceptors.response.use(
			(response: any) => {
				const { status, data } = response;
				return {
					status,
					data,
				};
			},
			(error: any) => {
				if (error.response) {
					const { data, status } = error.response;

					switch (status) {
						case 400:
							break;
						case 500:
							notification.error({
								message: "",
								description: i18next.t("error.SERVER_ERROR"),
								duration: 4,
							});
							break;
						case 401:
							break;
						case 404:
							break;
						case 403:
							break;
						default:
							break;
					}
					if (status !== 401 && status < 500) {
						if (data.errors?.message) {
							const message: string = data.errors.message;
							notification.error({
								message: "",
								description: i18next.t(`error.${message}`),
								duration: 4,
							});
						}
					}

					throw data;
				} else {
					throw error;
				}
			},
		);
	}

	static get instance(): AxiosClient {
		if (!AxiosClient.axiosClientInstance) {
			AxiosClient.axiosClientInstance = new AxiosClient(singletonEnforcer);
		}

		return AxiosClient.axiosClientInstance;
	}

	async getExistTokenOnLocalStorage(): Promise<Promise<void>> {
		const userToken: string = (await localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)) ?? "";
		if (userToken) {
			await this.setHeader(userToken);
		}
	}

	setHeader = async (userToken: string): Promise<void> => {
		this.axiosClient.defaults.headers.common.Authorization = `Bearer ${userToken ?? null}`;
	};

	get = async (resource: string, slug = "", config: any = {}): Promise<any> => {
		let { headers } = config;
		if (!headers) {
			headers = this.axiosClient.defaults.headers;
		}
		slug += "";
		const requestURL = isEmpty(slug) ? `${resource}` : `${resource}/${slug}`;
		return this.axiosClient.get(requestURL, {
			data: null,
			...assign(config, { headers }),
		});
	};

	post = async (resource: string, data: any, config = {}): Promise<any> => {
		return this.axiosClient.post(`${resource}`, data, assign(config, this.axiosClient.defaults.headers));
	};

	update = async (resource: string, data: any, config = {}): Promise<any> =>
		this.axiosClient.put(`${resource}`, data, assign(config, this.axiosClient.defaults.headers));

	put = async (resource: string, data: any, config = {}): Promise<any> =>
		this.axiosClient.put(`${resource}`, data, assign(config, this.axiosClient.defaults.headers));

	patch = async (resource: string, data: any, config = {}): Promise<any> =>
		this.axiosClient.patch(`${resource}`, data, assign(config, this.axiosClient.defaults.headers));

	delete = async (resource: string, data?: any, config = {}): Promise<any> =>
		this.axiosClient.delete(`${resource}`, {
			data,
			...assign(config, { headers: this.axiosClient.defaults.headers }),
		});
}

export default AxiosClient.instance;
