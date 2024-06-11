class APIFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
       let keyword = this.queryStr.keyword? {
         name:{
            $regex: this.queryStr.keyword,  
            $options: "i"  
         }
       
    }: {};
    this.query.find({...keyword})
    return this;
}
    filter(){
        const queryStrCopy = {...this.queryStr}
        //before
        // console.log(queryStrCopy)

        //remove fields from query
        const removeFields = ["keyword", "limit","page"]
        removeFields.forEach(field => delete queryStrCopy[field])

        let queryStr = JSON.stringify( queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, match=>`$${match}`)

        // console.log(queryStr)
        //{"price":{"$lt":"500","$gt":"1000"}} - output

   
        this.query.find(JSON.parse(queryStr))
       // { price: { lt: ' 500', gt: ' 1000' } } now add dollar symbol before this convert to string
       //{"price":{"lt":"500","gt":"1000"}}

        return this;
     }
     paginate(resPerPage){
         const currentPage = Number(this.queryStr.page)|| 1;
         const skip = resPerPage*(currentPage-1)
         this.query.limit(resPerPage).skip(skip);
         return this;
     }
}

module.exports = APIFeatures
