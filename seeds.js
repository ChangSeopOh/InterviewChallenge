const Color = require('./models/color');
const colors = require('./colors'); 


async function seedPosts() { 

	await Color.deleteMany({}); //delete all swatches before putting dump data

	const array = shuffleRandom(105);
	for(const i of array) { 
		const colorData = {
			color : `${colors[i].color}`, 
			group : `${colors[i].group}`, 
			hex : `${colors[i].hex}`
		}
		let swatche = new Color(colorData);
		
		await swatche.save();
	}
	console.log('105 new swatches created.');
} 

function shuffleRandom(n){
        var ar = new Array();
        var temp;
        var rnum;
        
        for(var i=1; i<=n; i++){
            ar.push(i);
        }
  
        for(var i=0; i< ar.length ; i++)
        {
            rnum = Math.floor(Math.random() *n); 
            temp = ar[i];
            ar[i] = ar[rnum];
            ar[rnum] = temp;
        }
 
        return ar;
}

module.exports = seedPosts;