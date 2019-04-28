import { CONSTANT } from '../constant';

export const paginate = async (Model: any, pipeline?: Array<Object>, limit?: number, page?: number) => {
    try {
        if (limit) {
            limit = Math.abs(limit);

            // If limit exceeds max limit
            if (limit > CONSTANT.MAX_LIMIT) {
                limit = CONSTANT.MAX_LIMIT;
            }

        } else {
            limit = CONSTANT.LIMIT;
        }

        if (page && (page != 0)) {
            page = Math.abs(page);
        } else {
            page = 1;
        }
        let skip = (limit * (page - 1));
        const result = await Model.aggregate(queryBuilder(pipeline, skip, limit, page)).exec();

        global.log(result, '======');
        let theTotal = result[0]['metadata'] && result[0]['metadata'][0] ? result[0]['metadata'][0]["total"] : 0
        let thePage = result[0]['metadata'] && result[0]['metadata'][0] ? result[0]['metadata'][0]["page"] : page
        let pageToSend = -1
        if(theTotal > (thePage*limit) ) {
            pageToSend = thePage + 1
        }
        return {
            data: result[0]['data'],
            total: theTotal,
            page: pageToSend,
            limit: limit
        };
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }

}

const queryBuilder = (pipeline: Array<Object>, skip: number, limit: number, page: number): Array<Object> => {
    let q = pipeline || [];

    q.push({
        $facet: {
            data: [
                { $skip: skip },
                { $limit: limit }
            ],
            metadata: [{ $count: "total" }, { $addFields: { page: page } }]
        }
    });
    return q;
}

export interface paginateResult {
    data: Array<Object>;
    total: number;
    page: number;
    limit: number;
}