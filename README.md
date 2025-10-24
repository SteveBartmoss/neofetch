# Neofetch

wraper de fetch para hacer mas simple el uso de la api nativa de js `fetch`

### Parametros

```js
Neofetch.get(url,options)
```

**url**: Es la url a la que queremos mandar la peticion, en el caso de peticiones `GET` o `DELETE` no es necesario concantener las parameros

**options**: Es un objeto que espera tener la siguiente forma

```js
{
  body: {},
  paramms: [{key: id, value: 1}],
  headers: {},
  optiosn: {}
}
```

- body: Representa el cuerpo de la peticion en los tipos `POST`, `PUT` o `PATCH` se puede mandar como un objeto normal, internamente ya se hace el `stringify`

- params: Es un arreglo de objetos de tipo `key` y `value` con el que se modifica el url de la peticion para que se manden correctamente

- headers: Objeto que representa los encabezados que se quieren pasar en la peticion, ademas de los comunes que ya estan presentes en todas las peticiones

- options: Objeto que representa opciones adicionales que se quieren argrea a la peticion

### Manejo de errores

Se implemento la respuesta de una exception, de esta manera se puede usar un bloque try catch para el manejo de errores, se puede implementar de la siguiente manera

```js
try{
  const { data } = await NeoFetch.get('/api/users')
} catch(error){
  console.error(`Error ${err.status}:`, err.data || err.message)
}
```

El objeto que se devuelte en la exception tiene el siguiente aspecto

```js
error = {
    `HTTP ${response.status}: ${response.statusText}`,
    status: = response.status,
    data: data,
    url: swapurl,
}
```


