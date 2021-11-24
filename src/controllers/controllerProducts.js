let productos = [
  
]

export const viewProducts = (req,res)=>{
  
  res.status(200).render('products',{productos:productos})

}


export const view = (req,res)=>{
  
    res.status(200).render('editProducts',{listadoProductos:productos})
  
  }


export const create = async (req,res)=>{
  let product = req.body
  product.id = Math.floor(Math.random()*1000000000)
  console.log(productos)
  productos.push(req.body) 
  product.url =req.body.nombre + req.body.id + ".png" 

  const EDFile = req.files.url
  
  EDFile.mv(`./public/img/products/${product.url}`,err => {
    if(err) return res.status(500).send({ message : err })
    return res.status(200).render("nofound",{message:"no se encontro el Producto"})
    })

  res.status(200).redirect('/editproductos')
 }

 
 export const del = (req,res) =>{
  console.log(req.body)
  productos = productos.filter(element => element.id != req.body.id)
  res.status(200).redirect('/editproductos')
  
}

export const update = (req,res) =>{
  console.log(req.body)
  let product = productos.find(element => element.id == req.body.id)
  if(req.body.nombre)  product.nombre = req.body.nombre
  if(req.body.precio) product.precio= req.body.precio
  if(req.body.stock) product.stock = req.body.stock
  res.status(200).redirect('/editproductos')
}

