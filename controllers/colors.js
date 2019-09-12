const Color = require('../models/color');


module.exports = {
	 async colorIndex(req, res, next) { 
	 	const{dbQuery} = res.locals;
		delete res.locals.dbQuery;


	 	let colors = await Color.paginate(dbQuery,{
	 		page : req.query.page || 1,
	 		limit : 12,
	 		sort: {color: 1}
	 	});

	 	colors.page = Number(colors.page); 
	
	 	res.render('index', {colors});
	},

		async colorDetail(req, res, next) { 
			res.locals.query = req.query;

		let swatche = await Color.findById(req.params.id); 
		
		res.render('detail', {swatche});
	},

		colorRandomDetail(req, res, next) { 
			res.locals.query = req.query;

			 Color.count().exec((err, count) =>{ 
			  // Get a random entry
			  let random = Math.floor(Math.random() * count);
			  Color.findOne().skip(random).exec((err, result) =>{ 
				res.render('detail', {swatche:result});
			  })
			})	
	}
}