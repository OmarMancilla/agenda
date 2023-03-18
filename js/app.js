// VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];    //variable para almacenar los tweets



// EVENT LISTENERS

eventListeners(); // para el registro de los eventListeners

function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet 
    formulario.addEventListener('submit', agregarTweet);
    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', ()=>{ //Cuanddo el documento este listo vamos a leer del localStorage lo sig.
        tweets = JSON.parse(localStorage.getItem('tweets'))  || []; //En caso de que no haya ningun tweet en local asignara el arreglo vacio [] de lo contrario marca error.
        console.log(tweets);

        crearHTML();
    });

    
}



//FUNCIONES

function agregarTweet(e){
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //Validacion...
    if(tweet === ''){
        //console.log('no puede ir vacio'); // se debe de mostrar el mensaje de error en pantalla
        mostrarError('un mensaje no puede ir vacio');
        return; // (ASI SE VALIDA) evita que se ejecuten mas lineas de codigo. funciona en un if siempre y cuando este en una funcion.
    }
    const tweetObj = {
        id: Date.now(), // es igual a tweet: tweet por lo tanto solo se pone uno a continuacion 
        tweet
    }
    tweets = [...tweets, tweetObj];
    //console.log(tweets);

    //una vez agrefado se crea el codigo HTML
    crearHTML();

    //reiniciar el formulario
    formulario.reset();
}
//Mostrar error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');  // ya hay un diseño de css aqui solo se llama


    // Insertar en el contenido    
    const contenido = document.querySelector('#contenido'); // con esta clase se llama el mensaje fuera del div principal
    contenido.appendChild(mensajeError);

    //para que no dure mucho el mensaje se remueve con setTimeout
    setTimeout(()=>{
        mensajeError.remove();
    }, 3000);
    
}




//muestra un listado de los tweets
function crearHTML(){
    
    limpiarHTML();

    if(tweets.length > 0){
        // se itera sobre cada tweet
        tweets.forEach( tweet =>{
            //Agregar boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet'); // la clase de css ya esta
            btnEliminar.innerText = 'X';

            //Añadir la funcion de eliminar. para que se elimine al darle click.
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            } 
            //crear el HTML
            const li = document.createElement('li');

            //añadir el texto
            li.innerText = tweet.tweet;

            //asignar el boton eliminar
            li.appendChild(btnEliminar);

            // insertarlo en el HTML 
            listaTweets.appendChild(li);
        });


    }

    sincronizarStorage(); // se llama esta funcion para que se almacene en el storage y no se borre al recargar
}
//AGREGA LOS TWEETS ACTUALES A localstorage. Queda guardado en el localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets)); // se pasa a string ya que es un arreglo y se debe de convertir primero.
}

//eliminar un Tweet
function borrarTweet(id){
    // para eliminarlo se usa un array method
    tweets = tweets.filter(tweet =>tweet.id !== id); // se trae los demas excepto el que se le da el click
    // para que se quite se vuelve a llamar la sig funcion
    crearHTML();
}

// limpiar el HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

