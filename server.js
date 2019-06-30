const express=require('express');
const app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.json());
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dataBase={
	user:[
	{
		id:'123',
		username:'sri',
		entries:0,
		email:'sri@gmail.com',
		joined:new Date()

	},
	{
		id:'124',
		username:'ram',
		entries:0,
		email:'ram@gmail.com',
		joined:new Date()

	}],
	login:[
	{
		id:'11',
		hashes:'',
		email:'sri@gmail.com',
		

	},
	{
		id:'12',
		hashes:'',
		email:'ram@gmail.com',
		

	}]
}

app.get('/',(req,res)=>{

	res.json(dataBase.user);
})


app.post('/signin',(req,res)=>{
	
bcrypt.compare("ram",'$2b$10$qc2ywQM5n0l/Z9c1YoH3luQKNm9ITvmvK1wygFsIFoi8sLBtIAsey', function(err, res) {
    console.log("attempt:1",res);
});
bcrypt.compare("someOtherPlaintextPassword",'$2b$10$qc2ywQM5n0l/Z9c1YoH3luQKNm9ITvmvK1wygFsIFoi8sLBtIAsey', function(err, res) {
     console.log("attempt:2",res);
});

	if(req.body.email===dataBase.user[0].email && req.body.passw===dataBase.user[0].passw)
	{
		res.json('signin');

	}
	else{
		res.status(400).json('error')

	}
	
})

app.post('/register',(req,res)=>{
	const {email,name,passw}=req.body;
	bcrypt.hash(passw, saltRounds, function(err, hash) {
  // Store hash in your password DB.
  console.log(hash)
});
	dataBase.user.push({
		id:'125',
		username:name,
		entries:0,
		email:email,
		passw:passw,
		joined:new Date()

	})

	res.json(dataBase.user[dataBase.user.length-1]);
})

app.get('/profile/:id',(req,res)=>{
	const {id}=req.params;
	let found=false;


	dataBase.user.forEach(users=>{
		if(users.id===id){
			found=true;
		 return res.json(users);
		}
		
	})
	if(!found){
			return res.json('no such user');
		}
})


app.post('/image',(req,res)=>{
	//res.json("hello !")
	


	const {id}=req.body;
	let found=false;


	dataBase.user.forEach(users=>{
		if(users.id===id){
			found=true;
			users.entries++
		 return res.json(users.entries);
		}
		
	})
	if(!found){
			return res.json('no such user');
		}
})


app.listen(3005,()=>{
	console.log('app is running');
})