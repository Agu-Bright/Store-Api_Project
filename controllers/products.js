const Product = require('../models/product')

const getAllProductsStatic = async (req, res)=>{
    const products = await Product.find({price: {$gt: 100}}).sort('price').select('name price')
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req, res)=>{
    //request object values
    const {featured,company, name, sort, field, numericFilters } = req.query  //Destructured query object
    //The query object
    const queryObject = {}


    if(featured){
        queryObject.featured = featured === 'true'? true: false
    }

    if(company){
        queryObject.company = company
    }

    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }


    let result =  Product.find(queryObject).limit(2);

    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt')
    }

    if(field){
        const feildList = field.split(',').join(' ')
        result = result.select(feildList )
    }
  

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1) * limit;

    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        }

        const regEx = /\b(<|>|>=|=|<=)\b/g
        let filter = numericFilters.replace(regEx, (match)=> `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filter = filter.split(',').forEach((items) => {
            const [field, operator, value] = items.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }
        });
        
        console.log(filter);
    }
    console.log(queryObject)
    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({products, nbHits: products.length})

} 

module.exports = {

    getAllProducts,

    getAllProductsStatic

}