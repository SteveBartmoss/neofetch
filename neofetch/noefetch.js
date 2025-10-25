

export class NeoFetch{

    static #errorInterceptors = []
    static #requestInterceptors = []
    static #responseInterceptors = []

    static interceptors = {
        request: {
            use(fn){
                NeoFetch.#requestInterceptors.push(fn)
            }
        },
        response: {
            use(fn){
                NeoFetch.#responseInterceptors.push(fn)
            }
        },
        error: {
          use(fn){
            NeoFetch.#errorInterceptors.push(fn)
          }  

        }
    }

    static #buildUrl(url,params=[]){
        
        const searchParams = new URLSearchParams()

        params.forEach(({key,value})=> searchParams.append(key,value))

        return `${url}?${searchParams.toString()}`
    }

    static #buildOptions(method,headers,body,options){
        
        switch(method){
            case "GET":
            case "DELETE":
                return{
                    method,
                    headers: {"Content-Type": "application/json", ...headers},
                    ...options
                }
            case "POST":
            case "PUT":
            case "PATCH":
                return{
                    method,
                    headers: {"Content-Type": "application/json", ...headers},
                    body: body ? JSON.stringify(body) : undefined,
                    ...options
                }
        
        }
    }

    static async #buildRequest(method,url, {body,params,headers, ...options}){
        
        let config = {method, url, body, params, headers, ...options}

        for(const interceptor of this.#requestInterceptors){
            config = await interceptor(config) || config
        }

        const swapurl = this.#buildUrl(config.url,config.params)
        
        let data, response

        try{
            response = await fetch(swapurl,this.#buildOptions(config.method,config.headers,config.body,config))

            const contentType = response.headers.get("content-type") || ""
            data = contentType.includes("application/json") ? await response.json() : await response.text()

            if(!response.ok){

                const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
                error.status = response.status
                error.data = data
                error.url = swapurl
                throw error

            }

            for(const interceptor of this.#responseInterceptors){
                const result = await interceptor({data, response})
                if (result) ({data, response} = result)
            }
            
        } catch (err) {
            
            for(const interceptor of this.#errorInterceptors ){
                await interceptor(err)
            }
            
            throw err
        }

        return {data, response}

    }

    static async get(url,options={}){

        return this.#buildRequest("GET",url,options)

    }

    static async post(url,options={}){

        return this.#buildRequest("POST",url,options)

    }

    static async put(url,options={}){
        
        return this.#buildRequest("PUT",url,options)

    }

    static async patch(url,options={}){

        return this.#buildRequest("PATCH",url,options)

    }

    static async delete(url,options={}){

        return this.#buildRequest("DELETE",url,options)

    }
}