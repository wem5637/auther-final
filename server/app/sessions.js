
var User = require('../api/users/user.model')


var router = require('express').Router();


router.post('/login', function(req, res, next){
	console.log(req.body);
	User.findOne({
		where: req.body
	})
	.then((user)=>{
		if(user){
			req.session.userId=user.id;
			// res.status(204).send(user)
			res.redirect('/');
		}else{
			res.sendStatus(401)
		}
	})
	.catch(next);

})

router.post('/logout', function(req, res, next){
	req.session.destroy();
	res.sendStatus(200);

})



module.exports = router;