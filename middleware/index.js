const Post = require('../models/color'); 

function escapeRegExp(string){
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); //$& means the whole matched string
	//prevent url injection. ?100 =>>> \?100
};

const middleware = {
	asyncErrorHandler: (fn)=>
		(req, res, next)=> {
			Promise.resolve(fn(req,res,next))
				   .catch(next);
		},
	searchAndFilterColors : async(req,res,next) =>{ 
		const queryKeys = Object.keys(req.query);
		let check = false;
			if (queryKeys.length) { 
				const dbQueries = [];
				let{search, group} = req.query;

				if(search){
					// convert search to a regular expression and 
					// escape any special characters
					search = new RegExp(escapeRegExp(search), 'gi'); 
					// g: global match; find all matched rather than stopping after the first match
					// i: ingonar case; A === a, Z === z
					dbQueries.push({ $or: [
					{ group: search },
					{ color: search },
					{ hex: search }
				]});
				}else if(group){
					dbQueries.push({ group });
				}

			res.locals.dbQuery = dbQueries.length ? { $and: dbQueries } : {};
			check = dbQueries.length  ? true : false;
			} 

			res.locals.query = req.query;

			const delimiter = check ? '&' : '?';
	 

		 res.locals.paginateUrl = req.originalUrl.replace(/(\?|\&)page=\d+/g, '') + `${delimiter}page=`;
		 
		next();
	}

}; 
module.exports = middleware;
 