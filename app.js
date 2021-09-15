//SELECTORES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaProductos = document.querySelector('#lista-productos');
const vaciarCarritoBtn= document.querySelector('#vaciar-carrito');


let articulosCarrito = []


listaProductos.addEventListener('click', agregarProducto);
carrito.addEventListener('click', eliminarProducto);
vaciarCarritoBtn.addEventListener('click',vaciarCarrito);




document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito= JSON.parse(localStorage.getItem('carrito')) || [];
    insertarCarritoHTML();
})


function vaciarCarrito(){
    borrarHTML();
    articulosCarrito =  [];
    guardarStorage();
}

function agregarProducto(e) {
    //Evitamos accion por defecto de boton//
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {    
        //Selecciono el card del producto sobre el cual se hizo clik
        const productoSeleccionado = e.target.parentElement;
        obtenerDatosProducto(productoSeleccionado);
    };
}
function eliminarProducto(e) {
    if (e.target.classList.contains('borrar-producto')){
        const productoId= e.target.getAttribute('data-id');
    
        articulosCarrito = articulosCarrito.filter( producto => producto.id !== productoId);

        insertarCarritoHTML();
        guardarStorage();
    }
    
}
function obtenerDatosProducto(producto) {

   //Extraigo  info de producto seleccionado//
    const productoAgregado = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //agregado recien
   

    const existe = articulosCarrito.some( producto=> producto.id === productoAgregado.id)
   
    if(existe){
        //Agregar al carrito un producto ya existente
        const productos =  articulosCarrito.map(producto => {
            if(producto.id === productoAgregado.id){
                producto.cantidad++;
                // console.log(productoAgregado.precio.slice(1))
				// console.log(producto.cantidad)
                producto.precio = `$${Number(productoAgregado.precio.slice(1))*producto.cantidad}`;
                return producto;
            }else{
                return producto;
            }
        });
        articulosCarrito = [...productos];
    } else{
        //Agregar al carrito un prod que no estaba  antes
        articulosCarrito = [...articulosCarrito, productoAgregado]
        //articuloscarrito.push(productoAgregado);
        //RECIEN
    } 

    insertarCarritoHTML();
    //console.log(articulosCarrito);
}
function insertarCarritoHTML() {
    borrarHTML();
    articulosCarrito.forEach(producto => {
        // Destrucuring sobre le objeto producto */
        const { nombre, imagen, precio, cantidad, id } = producto;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td> 
            <img src="${imagen}" width=70>
        </td>  
        <td>
            ${nombre} 
            </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
            
        </td>
        <td> 
            <a href="#" class="borrar-producto" data-id="${id}"> X  </a> 
            
            </td>        
        `
        contenedorCarrito.appendChild(row);
    });
    guardarStorage();   
}

function guardarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}



function borrarHTML(){
       while(contenedorCarrito.firstChild){
           contenedorCarrito.removeChild(contenedorCarrito.firstChild);
       }
   }

 
 