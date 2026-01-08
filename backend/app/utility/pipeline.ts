export const createPipeline = (query : any) => {
    const pipeline = [];

    const {page,limit = 2,sort,sortDirection,fields,...queryObj} = query

    if(queryObj){
        let queryString = JSON.stringify(queryObj);

        queryString = queryString.replace(/\b(gt|lt|gte|lte|eq)\b/g, (match) => `$${match}`)

        console.log(JSON.parse(queryString))

        const queryObject = JSON.parse(queryString);
        queryObject.isDeleted = false;

        pipeline.push({
            $match : queryObject
        })
    }

    if(sort){
        let field = query.sort;

        if(!sortDirection){
            const sortObject = {[field] : -1};
            pipeline.push ({
                $sort : sortObject
            })
        }

        if(sortDirection == 'ascending' || sortDirection == '1'){
            const sortObject = {[field] : 1};
            pipeline.push ({
                $sort : sortObject
            })
        }
        
    }

    if(page){
        pipeline.push(
            {
                $skip : (Number(page-1))*limit
            }
        )
        pipeline.push(
            {
                $limit : Number(limit)
            }
        )
    }

    console.log(pipeline)
    return pipeline;

}

