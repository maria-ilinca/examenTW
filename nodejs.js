// npm init
// npm install --save express
// npm install nodemon
// nodemon app.js


const express=require('express');
const app=express();
const port=3000;

// model subiect
// Scrieti un document HTML care sa contina un formular cu un element select avand optiunile "mic", "mare", un grup de doua butoane radio avand etichetele "e capitala", "nu e capitala" si un buton-submit. La server se va defini si vectorul de obiecte,
// orase=... (l am definit mai jos )
// Scrieti aplicatia server app.js astfel incat, la submit pe formularul dat, sa se afiseze lista de orase cu 
// tipul selectat ("mic" insemnand sub 10000 locuitori, si "mare" peste 10000) si care sunt (sau nu) capitale 
// in functie de butonul radio bifat. Informatiile vor fi preluate din vectorul de orase aflat in app.js. 
// Afisarea poate fi in interiorul paginii sau in locul paginii cu formularul.

// urlencoded: analiz cererile primite cu req utile codificate urlen si folos body-parser. 
// Valoare returnata => un obiect
app.use('/post',express.urlencoded({extended:true}));

orase=[
	{
		nume:"Aa",
		populatie:14000,
		capitala:true
	},
	{
		nume:"Bb",
		populatie:7000,
		capitala:false
	},
	{
		nume:"Cc",
		populatie:19000,
		capitala:false
	},
	{
		nume:"Dd",
		populatie:5000,
		capitala:false
	},
	{
		nume:"Ee",
		populatie:8000,
		capitala:true
	},
	{
		nume:"Ff",
		populatie:12000,
		capitala:false
	},
	{
		nume:"Gg",
		populatie:20000,
		capitala:true
	}
]

app.get("/fisier.html", function(req,res){

	res.sendFile(__dirname+ "/fisier.html");
	//putem da si res.sendFile("intregul path");
    // input formular : 
// <form method="post" action="http://localhost:7000/post">
//    <label> Tip oras: 
//        <select name="tip"> <option value="mic">mic</option>
//                            <option value="mare">mare</option>
//         </select>
//     </label>

//     <br>
//     <label>
//     <input type="radio" name="capitala" value="da">e capitala
//     <input type="radio" name="capitala" value="nu">nu e capitala
//     </label>
//     <br>
//     <input type="submit">
//     </form>
});


// post - actualizeaza datele si le transmite catre server pt a primi rasp
app.post("/post",function(req,res){

 let arr = [];
	console.log(req.body);
	for(let oras of orase) {
		if(req.body.tip == 'mic') {
			if(oras.populatie < 10000) {
				if(req.body.capitala == 'nu' && oras.capitala == false)
					arr.push(oras.nume);
				else if(req.body.capitala == 'da' && oras.capitala == true)
					arr.push(oras.nume); 
			}
		}
		else {
			if(oras.populatie >= 10000) {
				if(req.body.capitala == 'nu' && oras.capitala == false)
					arr.push(oras.nume);
				else if(req.body.capitala == 'da' && oras.capitala == true)
					arr.push(oras.nume); 
			}
		}		
	}
	res.send(arr);
});

// asta e mereu pusa ca sa pornim serverul - LA FINAL
app.listen(port, function()
{console.log("Server is running on http://localhost:${post}");});

// In caz ca intrii pe o pagina care nu exista!
app.use(function(req,res){
    // res.status(404).send({error: 'Not found'});
    res.status(404).sendFile('html/404.html', { root: __dirname });
});

// adaugarea unui ob intr o baza de date: student 
app.post('/inregistrare_studenti', function (req, res) {
    var form = new formidable.IncomingForm();// obiect de tip form cu care parsez datele venite de la utilizator
    form.parse(req, function(err, fields, files) {

        let rawdata = fs.readFileSync('studenti.json');//citesc fisierul si pun tot textul in rawdata
        let jsfis = JSON.parse(rawdata);//parsez textul si obtin obiectul asociat JSON-ului

        jsfis.studenti.push({id:jsfis.nextId, nume:fields.nume, prenume:fields.prenume, grupa: fields.grupa, poza: calePoza});//adaug elementul nou
        jsfis.nextId++;//incrementez id-ul ca sa nu am doi studenti cu acelasi id
        let data = JSON.stringify(jsfis);//transform in sir
        fs.writeFileSync("studenti.json", data);//scriu in fisier
        res.render('html/date_introduse');//afisez o pagina cu un mesaj de date introduse 
    });

});

// body-parser extrage intregul body al requestului=> req.body. 
// body-parser parseaza JSON, buffer ul, string si date URL din operatia post
// npm install body-parser
// var bodyParser = require('body-parser')
app.use(bodyParser.json());

//parsarea unei aplicatii/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

//pentru toate metodele

app.all('/', function(req, res) {
    console.log('ceva_mesaj')
    next()   //dam controlul urm manipulator
})

// mai multe despre rute:
// https://www.geeksforgeeks.org/routing-in-node-js/