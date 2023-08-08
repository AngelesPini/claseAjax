//fetch recibe dos parametros una url y un objeto de configuracion.//

//este bjeto de config no es siempre necesario, si hacemos un get no necesitamos la configuracion. El get es el metodo que vamos a usar en el curso, para traer la info. El resto de los metodos es para servidores a medida mas bien creados por ustedes.

//cuando esten programando en back, van a aprender todos estos metodos como tale. Es lo quee mas les vas a servir, podriamos utilizar los otros pero necesitariamos de un JSON server.
//de momento no se maten con eso, solo usemos GET para comprender los fundamentos de fetch.
//entonces vamos a utilizar JSONplaceholder.

//veamos la guia

//fijense que la documentacion nos dice que tenemos que hacr para utilizar la API
// fetch{url, config}


//si yo hago:

console.log(fetch('https://jsonplaceholder.typicode.com/posts'))

//fijense que en la consola me muestra una promesa. Esta resuelta exitosamente. Pero si recargo vean que dice pending. Entonces como la capturo? Con el .then() que vimos antes

//entonces le voy a decir

fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => console.log(response))

//supuestamente deberia recibir un arreglo, pero en lugar de eso me arroja "response" y me trae toda la informacion, status, headers, etc. Esto que me trae es la informacion que obtengo como respuesta. Es una promesa que capturon con then y lo que arroja response es la info, pero no los datos que yo necesito.
//Si observamos el link https://jsonplaceholder.typicode.com/posts en internet me va a traer un array completo con todos los objetos de la API 
//para poder ver esa info le voy a decir a response que lo voy a pasar por un json.

fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())/*<= esto mismo es otra promesa y como es otra promesa yo la tengo que capturar*/
.then(data => console.log(data))/*ahora si deberia llegar el arreglo */


//esta info baja del servidor, no la tengo en mi computadora, mas si en mi codigo a traves de la promesa.
//si observo desde network, me va a mostrar las props y params y veremos el metodo, el estado, etc
//con esta informacion que puedo hacer? por ejemplo


fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(data => (
    console.log(data[0].title),
    console.log(data[0].body)
))

//notaran que veremos el titulo y el body. al ser un arreglo lo puedo tratar como desee, enviarlo al dom modificarlo, etc.

//la docu de la API siempre va a decir qué tipo de respuesta tiene o output tiene la API, por eso hay que leerla

//puedo por ejemplo hacer un foreach, mostrar la informacion.

//vamos a hacer por ejemplo una lista desde el html para enviar por js

//me voy a traer listado igual que siempre a mi js

const lista = document.getElementById("listado")/*en este listado voy a traer la info de mi API, con un foreach como ya veniamos haciendo */

fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(data => (
    data.forEach(publicacion => {
        const li = document.createElement("li");
        li.innerHTML=`

        <h4>Titulo: ${publicacion.title}</h4>
        <p>comentario: ${publicacion.body}</p>
        `

        lista.appendChild(li)
    })
))


//todo esto baja desde el server, no tengo todo esto de forma literal en mi codigo, solo hice el enlace con la database correspondiente para poder ver esa información 

//asi es basicamente como hago una conexion, yo tengo todo un backend con la información, y la tengo que renderizar, ya despues es trabajo del front volverlo bonito, darle sus estilos correspondientes, con sus etiquetas, tamaños, etc

//ahora, como envio yo la info al server? como hago una peticion para crear una nueva publicacion? Beno me voy a la documentacion de la API a ver que dice y veo que dice 'creating resource'

fetch('https://jsonplaceholder.typicode.com/posts', {/*hasta aqui es igual que antes */
  /*aqui vean que trae un parametro adicional, que es el metodo*/
  method: 'POST', /*fijense que el método aqui es POST y no GET */
  body: JSON.stringify({/*este es el lugar especial que tiene para enviar info al servidor, y fijense que lo envio con JSON igual que local storage */
    title: 'Coder',
    body: 'hola coders! esta es nuestra primera publicacion',
    userId: 1, /*y aqui tengo mi objeto, que va a llevar un titulo, un body y un ID de usuario */
  }),
  headers: {/*fijense que el servidor solito me dice que header va a mandar. Si elimino cualquiera de estos params NO VA A FUNCIONAR*/
  /*dentro del header va SIEMPRE lo que el servidor pide de forma estricta */
    'Content-type': 'application/json; charset=UTF-8',
  },
})


/*nada de esto se inventa, esto es todo informacion que está dentro de la documentacion */

//ahora bien, cuando creamos un recurso de un servidor, ya se un usuario, un producto o lo que sea, se acostumbra a devolver un objeto creado con el id correspondiente que se asigna en base de datos. Este fetch es una promesa, por lo que no están faltando capturarlo en un then()

.then((response) => response.json())
.then((data) => console.log(data)); /*agregar esto al final, para ver por consola el cambio */

/*vean que el title es el que colocamos, el id es el 101 ya que habia 100 publicaciones en la api, y el usuario que asignamos*/

//recuerden que esto es una prueba, no quiere decir que realmente se creó en la database de ellos, no. Esto nos ayuda a simular que pasaria 
//el usuario que estoy seleccionando para "crear la publicacion", ya está creado y declarado en el servidor, yo lo selecciono en esta oportunidad, toca leer la docu para ver cuantos usuarios son y seleccionar el que deseen uds. Y el id que me devuelve es el de la publicacion, no del usuario, sino de la publicacion, el 101. 


//esto como lo integro? como lo vimos con foreach. ME traigo la data del server a mi site, para lo que sea que necesite.
//si tengo un ecommerce por ejemplo me traigo la API de mercado libre, o si tengo un mercado me traigo un API de frutas y alimentos, y asi.

//hay apis que sirven para enviar emails, como la uso? por ejemplo al agendar una cita o comprar un producto, me envia un correo a mi email y otro al cliente


//para el proyecto final van a tener dos formas de implementarlo, que puede ser consumiendo una API o consumiendo un JSON propio de ustedes, que es que elige la mayoria, no hay uno mejor que el otro. Ambas formas están bien.

//entonces bien, hay algo que se conoce como "rutas relativas", es que vos no te enganchas a un server como tal, sino a un archivo de tu proyecto. Porque puede pasar que no consuman una API porque no encuentran lo que necesitan o no saben cual usar. Lo que yo puedo hacer es crear un JSON // y aca EN MI JSON voy a crear un json con mis productos o usuarios
//una vez creado el json que tengo que hacer?


//hacete una peticion a ese archivo con fetch
fetch("./data.json") /*entonces le estoy pidiendo que busque la ruta y ahora la vamos a leer, tca tambien con promesa*/
//entonce sle voy a decir: 
.then(response => response.json()) //recuerden que SIEMPRE es con JSON
.then(data =>(
    data.forEach(usuario =>{
        const li = document.createElement("li")
        li.innerHTML = `
        <h4>Id: ${usuario.id}</h4>
        <p> nombre: ${usuario.nombre}<p>
        <hr>
        `

        lista.appendChild(li)
    })
))/*como ya se que data es un arreglo, lo mismo puedo recorrerlo y mostrarlo en mi dom como siempre*/



//recuerden que esto es un arrglo, pueden hacerle lo que ustedes deseen con todos los metodos de arrays que ya vimos a lo largo del curso, map, filter, find, etc


//la ultima parte: bueno resulta que al hacer muchas peticiones con fetch .then .then .then y de repente metemos mas cosas asincronas y mas cosas, lo que va a pasar es que se vuelve muy feo el codigo y desorganizado. Entonces ahi llega el async y await. Funciona asi:


//primero necesito una function

const traerDatos = async (/*aca no va a recibir nada */)=>{
    /*al ser asincrono lo que puedo hacer es colocar un await que le diga "hey, espera a que termine",  */
    /*de esta manera nos ahorramos el then, pero veanq ue sale un error al principio, a ver uqe dice */
    const response = /*await*/ fetch('https://jsonplaceholder.typicode.com/posts') 
    // fijense que coloca error en await, entonces lo que tengo que hacer es colocar antes de () en la linea 148 "async"

    //y ahora declaro

    const data = await response.json()/*y ahora ya tengo la data, y la recorro con un forEach, etc */

    data.forEach((publicacion) =>{
        const li = document.createElement("li")
        li.innerHTML=`
        <h4>Titulo: ${publicacion.title}</h4>
        <p>comentario: ${publicacion.body}</p>
        `
        lista.appendChild(li)
    })
    
}


//el resultado será exactamente el mismo, se utiliza como tal, en lugar de usar el .then, colocamos async await
//y solo me queda llamar a la funcion traerDatos();


traerDatos();
//esto es lo que se utiliza hoy, en lugar de hacer then colocamos async await y funciona sin problema :D



//hacemos lo mismo, y podemos colocar el catch para ver si hay un error.
//trycatch es una estructura que te permite detectar posibles errores
//utilizamos "try catch" = que quiere decir "trate de ejecutar este codigo, en caso que salga error, recibilo con catch"

//entonces le voy a decir


const traerDatoss = async ()=>{
//todo lo que está aqui dentro que es la peticion, por ende son los datos sensibles, le voy a pedir que
try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts') 
    const data = await response.json()

    data.forEach((publicacion) =>{
        const li = document.createElement("li")
        li.innerHTML=`
        <h4>Titulo: ${publicacion.title}</h4>
        <p>comentario: ${publicacion.body}</p>
        `
        lista.appendChild(li)
    })
} catch (error) {
    alert(error)
}
//esto va a funcionar de la misma manera que antes
    
}

traerDatoss();