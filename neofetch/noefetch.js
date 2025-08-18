

export class NeoFetch{

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
        const swapurl = this.#buildUrl(url,params)

        const response = await fetch(swapurl,this.#buildOptions(method,headers,body,options))

        let data 

        try{
            const contentType = response.headers.get("content-type") || ""
            data = contentType.includes("application/json") ? await response.json() : await response.text()
        } catch {
            data = null
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