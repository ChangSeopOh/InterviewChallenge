var express = require('express');
var router = express.Router();
const { 
	asyncErrorHandler,
	searchAndFilterColors
 } = require('../middleware');
const { 
  	colorIndex,
  	colorDetail,
  	colorRandomDetail
} = require('../controllers/colors');


/* GET List view. */
router.get('/', asyncErrorHandler(searchAndFilterColors), asyncErrorHandler(colorIndex));

/* GET Random Detail view. */
router.get('/random', asyncErrorHandler(colorRandomDetail));

/* GET Detail view. */
router.get('/:id', asyncErrorHandler(colorDetail));





module.exports = router;
