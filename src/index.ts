import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';
import xhr from '../xhr'
import { buildURL } from "../helpers/url";
import { transformRequest } from "../helpers/data";
import { processHeaders } from "../helpers/headers"
import { transformResponse } from "../helpers/data";
function axios(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config)
    return xhr(config).then((res) => {
        return transformResponseData(res)
    })
}

export default axios
function processConfig (config: AxiosRequestConfig): void {
    config.url = transformUrl(config)
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
    const { url, params} = config
    return buildURL(url,params)
}

function transformRequestData (config: AxiosRequestConfig): any {
    return transformRequest(config.data)
}

function transformHeaders (config: AxiosRequestConfig) {
    const { headers = {}, data } = config
    return processHeaders(headers, data)
}

function transformResponseData (res: AxiosResponse): AxiosResponse {
    res.data = transformResponse(res.data)
    return res
}
