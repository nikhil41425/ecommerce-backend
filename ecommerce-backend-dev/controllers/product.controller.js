
var ProductModel= require('../models/product.model');

var url= require('url');

exports.addProduct=function(request,response){

    var product= request.body;

    console.log('product',product);

    var newProduct=new ProductModel(product);

    newProduct.save(function(err,doc){
        if(err){
            response.send({status:false,message:err.message})
        }
        console.log('doc',doc);
        if(doc._id){
            response.send({status:true,message:"product added successfully"});
        }
    })
}

exports.getProducts=function(request,response){

ProductModel.find({},(err,docs) => {
    if(err){
        response.send({status:false,message:err.message});
        return;
    }
    if(docs){
      response.send(docs);
    }
})

}

exports.getProductById=function(request,response){

    console.log("I am inside get product by id");

    var pid=request.params.id;
    
    //console.log('pid', typeof parseInt(pid));

      console.log(typeof pid);

      console.log("productid",pid);

    ProductModel.findOne({_id:pid},function(err,doc) {
        if(err){
            response.send(err.message);
        }
        else
        {
            console.log('doc',doc)
        response.send(doc);
        }
    })
}

exports.updateProduct=function(request,response){
    var pid=request.params.id;
    var updatedProduct=request.body;

    ProductModel.updateOne({pid:pid},updatedProduct,(err,res) => {
        if(err){
            response.send(err.message);
        }
        if(res){
            response.send(res);
        }
    })
}

exports.getProductsByChoice= function(request,response){

    var choice=request.query.choice;

     switch(choice){
        case "asc": ProductModel.find({}).sort({'price':1}).exec((err,docs) => {
            console.log(docs);
            response.send(docs);
        })
        break;
        case "desc": ProductModel.find({}).sort({'price':-1}).exec((err,docs) => {
            console.log(docs);
            response.send(docs);
        })
        break;
     }
}

exports.getProductsByFilter=function(request,response){

    var choice=request.query.choice;

     

}

exports.deleteProduct= function(request,response){

    var _id=request.params._id;

    console.log('_id',_id);

    ProductModel.deleteOne({_id:_id},function(err){
        if(err){

            response.send(false);
        }
        else
        {
            response.send(true);
        }
    })
}