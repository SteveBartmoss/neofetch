import { NeoFetchClient } from "../neofetchClient"


export class NeoFetch {

    static #instance = null

    static #getInstance() {
        if(!NeoFetch.#instance) {
            NeoFetch.#instance = new NeoFetchClient()
        }

        return NeoFetch.#instance

    }

    static interceptors = {
        request: {
            use(fn) {
                NeoFetch.#getInstance.interceptors.request.use(fn)
            }
        },
        response: {
            use(fn) {
                NeoFetch.#getInstance.interceptors.response.use(fn)
            }
        },
        error: {
            use(fn) {
                NeoFetch.#getInstance.interceptors.error.use(fn)
            }
        }
    }

    static configure(config = {}) {

        const instance = NeoFetch.#getInstance()

        NeoFetch.#instance = new NeoFetch(
            config.baseUrl || '',
            config.defaultHeaders || {},
            config.timeout || 0,
        )

    }

    static async get(url, options = {}) {

        return NeoFetch.#getInstance().get(url, options)

    }

    static async post(url, options = {}) {

        return NeoFetch.#getInstance().post(url, options)

    }

    static async put(url, options = {}) {

        return NeoFetch.#getInstance().put(url, options)

    }

    static async patch(url, options = {}) {

        return NeoFetch.#getInstance().patch(url,options)

    }

    static async delete(url, options = {}) {

        return NeoFetch.#getInstance().delete(url, options)

    }
}