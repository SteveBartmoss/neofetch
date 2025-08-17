

export class NeoFetch{

    static #buildUrl(url,params){
        let newUrl = url+'?'

        params.forEach(element => {
            newUrl = newUrl+`${element.key}=${element.value}&`
        });

        return newUrl
    }

    static async get(url,params=[],options={}){

        let swapurl=url
        if(params.length>0){
            swapurl=this.#buildUrl(url,params)
        }

        try{
            const response = await fetch(swapurl,{
                method: 'GET',
                ...options
            }) 

            const data = await response.json()

            return {data: data, response: response}

        }catch(error){
            console.error('error:',error)
            throw error
        }
    }

    static async post(url,body={},options={}){

        try{

            const response = await fetch(url,{
                method: 'POST',
                body: JSON.stringify(body),
                ...options
            })

            const data = await response.json()

            return {data: data, response: response}

        }catch(error){
            console.error('error:',error)
            throw error
        }
    }

    static async put(url,body={},params=[],options={}){
        let swapurl=url

        if(params.length>0){
            swapurl=this.#buildUrl(url,params)
        }

        try{

            const response = await fetch(swapurl,{
                method: 'PUT',
                body: JSON.stringify(body),
                ...options
            }) 

            const data = await response.json()

            return {data: data, response: response}

        }catch(error){
            console.error('error:',error)
            throw error
        }
    }

    static async patch(url,body={},params=[],options={}){

        let swapurl=url

        if(params.length>0){
            swapurl = this.#buildUrl(url,params)
        }

        try{

            const response = await fetch(swapurl,{
                method: 'PATCH',
                body: JSON.stringify(body),
                ...options
            })

            const data = await response.json()

            return {data: data, response: response}

        }catch(error){
            console.error('error:',error)
            throw error
        }
    }

    static async delete(url,params=[],options={}){

        let swapurl=url

        if(params.length>0){
            swapurl= this.#buildUrl(url,params)
        }

        try{

            const response = await fetch(swapurl,{
                method: 'DELETE',
                ...options
            })

            const data = await response.json()

            return {data: data, response: response}

        }catch(error){
            console.error('error:',error)
            throw error
        }
    }
}