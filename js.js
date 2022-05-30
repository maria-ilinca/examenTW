// functie pt generare a unui nr random
function getRandomInt(max) {
	return Math.floor(Math.random() * max); // maximul pana la care se duce
}

// generare culoare random pentru background <3
function random_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var Color = "rgb(" + x + "," + y + "," + z + ")";

 //console.log(Color);
  
document.body.style.background = bgColor;
// la fel merge si pt div sau orice element
}


// la schimbarea val din inputul de tip range, divurile care contin ac numar vor primi border solid de 2px, cul verde
//<input type="range" id="rng" min="1" max="5"><br/><br/>
window.addEventListener("load", function(){
	var rng=document.getElementById("rng");
	rng.parentNode.insertBefore(document.createTextNode(rng.min),rng);
	rng.parentNode.insertBefore(document.createTextNode(rng.max),rng.nextSibling);
	rng.value=rng.min;
});

window.onload = function()
{
	document.getElementById("rng").onchange = function()
	{
		x = this.value;
		elemente = document.getElementsByTagName("div");
		for(el of elemente)
			if(el.innerHTML==x) 
			{
				el.style.border = "solid green 2px";
			}
	}
}
//la apasarea tastei d se va afisa data: zi(luni,marti...), luna, an
window.onkeydown = function(e){
    var d = new Date();
    var x = d.getDay();
		if(x==0) x="Duminica";
		else if(x==1) x="Luni";
		else if(x==2) x="Marti";
		else if(x==3) x="Miercuri";
		else if(x==4) x="Joi";
		else if(x==5) x="Vineri";
		else if(x==6) x="Sambata";
		
	var l = d.getMonth() + 1;
	var an = d.getFullYear() % 100;
	x = x + "." + l + "." + an; 
		
	var input = document.getElementById("data");
	input.value = x;
}

//la misc cursorului in pagina, divurile care au coltul din stg sus aflat in dr cursorului se vor colora in albastru, iar celelalte in rosu. cand avem cursorul pe el se face mov, apoi revine la poz initiala 
window.onload = function()
{
	document.onmousemove = function()
	{
		var x = event.clientX;     
		var y = event.clientY;  
	
		var divuri = document.getElementsByTagName("div");
		for(d of divuri)
		{
			var stil = getComputedStyle(d);
			if(x <= parseInt(stil.left)) d.style.backgroundColor = "blue";
			else d.style.backgroundColor = "red";
			
			d.onmouseover = function()
			{
				this.style.backgroundColor = "purple";
			}
		}
	}
}

//pt fiecare par aflat dupa un div afis in ordine inversa caracterele din elem b din int paragr
window.onload = function()
{
	var elemente = document.querySelectorAll("div+p")
	for(let el of elemente)
	{
		var x = el.querySelectorAll("b");
		for(i of x) 
		{
			var text = i.innerHTML;
			var invers = " ";
			for(k=text.length-1; k>=0; k--) invers+=text[k];
			var t = document.createTextNode(invers);
			el.appendChild(t);
		}
	}
}

// la fiec jum de sec timp de 10 sec se genereaza un buton cu textul "ok", la click el isi schimba textul in "apasat", daca vecinii lui nu au acest text
window.onload = function()
{
	var a = setInterval(function()
	{
		var buton = document.createElement("button");
		buton.innerHTML = "ok";
		document.body.appendChild(buton);
		
		buton.onclick = function()
		{
			if(this.previousSibling.innerHTML=="ok" && this.nextSibling.innerHTML=="ok")
			{
				setTimeout(function()
				{
					buton.innerHTML = "apasat";
				}, 1000);
			}
			else if(this.previousSibling.innerHTML=="ok" && this.nextSibling.innerHTML==null)
			{
				setTimeout(function()
				{
					buton.innerHTML = "apasat";
				}, 1000);
			}
			else if(this.nextSibling.innerHTML=="ok" && this.previousSibling.innerHTML==null)
			{
				setTimeout(function()
				{
					buton.innerHTML = "apasat";
				}, 1000);
			}
		}
		// setTimeout sintaxa: setTimeout(function(){//instructiuni}, interval de timp);
		setTimeout(function()
		{ 
			clearInterval(a);
		}, 10000);
	}, 500);
}

// adaugare noua clasa + la click pe body sa stearga toate clasele care nu contin litera z
window.onload = function()
{
    // selectam toate elementele
	var elemente = document.getElementsByTagName("*");
	// classList returneaza numele claselor
    for(el of elemente)
	{
		if(el.classList.length >= 3) el.classList.add("c3");
	}
	
	document.body.onclick = function()
	{
		for(el of elemente)
		{
			var cls = el.classList;
			for(i=0; i<cls.length; i++)
			{
				if(!cls[i].search('z'))
				{
					cls.remove(cls[i]);
					j--;
				}
			}
		}
	}
}

// la prima deschidere a paginii se va gen un nr aleator intreg intre 0 si 500 si nr 0 dedesubt. La fiecare reincarcare a pag se gen un nr aleator si dedesubt se afiseaza suma nr generate pana acum
function numarRandom() {
    var r = Math.floor(Math.random() * 501);
    return r;
}

window.onload = function() {
    var btn = document.getElementById("res");
    btn.style.display = "block";
    var x;
    if (localStorage.getItem("suma") == null) {
        // la prima incarcare apare 0 si adaugam valoarea numarului generat
        document.body.appendChild(document.createTextNode('0'));
        x = numarRandom();
        localStorage.setItem("suma", x);
    }
    else {
        // TIP-mereu variabilele stocate se vor parsa la int, pt ca sunt retinute ca string
        var sum = localStorage.getItem("suma");
        x = numarRandom();
        document.body.appendChild(document.createTextNode("\n" + sum));
        localStorage.setItem("suma", parseInt(sum) + x);
    }
    btn.onclick = function() {
        localStorage.clear();
    }   
    
}

/* In pagina exista un input de tip range a carui valoare max se schimba aleator la fiecare incarcare de pagina. Valorile min si max sunt afisate in stanga si dreapta inputului.
Scrieti cod astfel incat, la setarea inputului de tip range, dimensiunea literelor din pagina sa fie egala cu 
valoarea inputului. De asemenea, cand valoarea inputului trece de jumatatea intervalului, culoarea literelor din 
pagina sa se schimbe in rosu (redevine negru daca trecem in stanga de jumatatea intervalului). 
La incarcarea paginii, setati prin javascript atributul necesar astfel incat cele 3 radiobutton-uri sa se comporte ca un grup (sa nu poata fi bifat decat unul la un moment dat).
In plus, la click pe butonul OK, textul din buton se schimba astfel incat sa fie egal cu eticheta butonului radio bifat.</li> */

window.addEventListener("load", function(){
	var rng=document.getElementById("rng");
	rng.max=Math.floor(20+Math.random()*20);
	rng.parentNode.insertBefore(document.createTextNode(rng.min),rng);
	rng.parentNode.appendChild(document.createTextNode(rng.max));
	rng.value=rng.min;
});

window.onload=function()
{
	document.getElementById("rng").onchange=function()
	{
		document.body.style.fontSize=this.value+"px";
		if (this.value>= parseInt(this.min)+(this.max-this.min)/2)  document.body.style.color="red";
		else                                                        document.body.style.color="black";
	}
	
	var rdbtn=document.querySelectorAll("input[type=radio]");
	for (rb of rdbtn) rb.name="r";
	document.getElementById("btn").onclick=function()
	{
		var v_rad=document.getElementsByName("r");
		for (rad of v_rad)
			if(rad.checked)
				this.innerHTML=rad.nextSibling.nodeValue;
	}
}
// La apasarea tastei q, divurile din clasa d1 vor creste in inaltime (in jos) cu un pixel. 
// Trebuie sa creasca in continuu daca se tine apasata tasta. La apasarea tastei w, scad toate in inaltime (dar, evident, nu mai mult de 0)
window.onkeydown=function(e)
{
	var elem=document.getElementsByClassName("d1");
	if(e.key=='q') pas=1;
	if(e.key=='w') pas=-1;
	for(i of elem)
	{
		var inaltime=parseInt(getComputedStyle(i).height);
		inaltime=Math.max(inaltime+pas,0);
		i.style.height=inaltime+"px";
	}
}
// click oriunde in pagina se va crea un div cu clasa "animat", centrat pe coordonatele clickului, si i se va asocia aleator una din 
//animatiile din css: miscare1 sau miscare2. Daca se da click pe un div, nu se va crea un alt div.

window.onclick=function()
{
	var buton=document.createElement("div");
	buton.setAttribute("class", "animat");
	buton.style.position="absolute";
	document.body.appendChild(buton);
	
	var x = event.clientX;
	var y = event.clientY;
	var aleator=Math.random();
	if(aleator<=0.5) buton.style.animationName="miscare1";
	else			 buton.style.animationName="miscare2";
	
	stil=getComputedStyle(buton);
	buton.style.top=y-parseInt(stil.height)/2+"px";
	buton.style.left=x-parseInt(stil.width)/2+"px";
	
	buton.onclick=function(e){e.stopPropagation()}
}

//Scrieti cod javascript astfel incat, la click pe orice paragraf care se afla <strong>imediat sub un div</strong> se afiseaza in el 
//numarul total de elemente insumate din toate listele (ordonate si neordonate) din div (din subarborele divului). 
//De exemplu la click pe paragraful abc se va afisa 0. La click pe paragraful xyz se va afisa 17.
window.onload=function(){
	var pgfs=document.querySelectorAll("div+p");
	for(p of pgfs){
		p.onclick=function(){
			this.innerHTML=this.previousElementSibling.querySelectorAll("li").length;
		}
	}
}

// La 1.5 secunde dupa intrarea in pagina generati 10 butoane. Initial textul lor va fi "0" si despre toate spunem ca sunt "in pauza"
// La click pe orice buton "in pauza", spunem ca devine "activ" si numarul din el trebuie sa creasca cu 1 la fiecare secunda. 
// Daca se face click pe un buton "activ" cresterea numarului sa fie oprita, revenind "in pauza" (dar poate fi repornit).
window.onload=function(){
	setTimeout(function(){
		// am creat 10 butoane cu textul 0 si in pauza
		for (i=0;i<10;i++){
			btn=document.createElement("button");
			document.body.appendChild(btn);
			btn.innerHTML=0;
            btn.activ=0;
			btn.onclick=function(){
				  if(this.activ==0){
                        this.activ=setInterval(function(b){
							//numarul din interior creste cu 1
                        b.innerHTML=1+parseInt(b.innerHTML);
					},1000,this);
				}
				else{
					clearInterval(this.activ);
					this.activ=0;
				}				
			}			
		}	
	},1500);
}

// cod javascript astfel care la click pe butoanele care au clasele a si b (in acelasi timp) dar nu au niciuna din clasele c sau d, 
// sa se adauge clasa zzz (o sa apara o aura rosie)
window.onload=function(){
	var btns=document.querySelectorAll(".a.b");
	for (b of btns){
		b.onclick=function(){
			if(!this.classList.contains("c") && !this.classList.contains("d"))
				this.classList.add("zzz");
		}
	}
	
}

// Scrieti cod astfel incat la click pe butonul "salveaza", la refresh pe pagina sa se reafiseze numerele generate pana in momentul clickului. 
// Iar la click pe butonul "sterge tot" sa se stearga toate numerele (si sa nu mai apara nici la refresh).

// functie care genereaza nr random:
window.addEventListener("load",function(){
	setInterval(
		function(){
			document.body.appendChild(document.createTextNode(Math.floor(Math.random()*1000)+" "));
			document.body.normalize();
		},500
	);
});

//<button id="btn">Click Here!</button>

var count = 0;
var btn = document.getElementById("btn");
var disp = document.getElementById("display");
  
btn.onclick = function () {
    count++;
    disp.inne
}

// La incarcarea paginii, se creeaza 10 divuri care primesc stilizarea unei clase CSS "dreptunghi". 
// vezi css 255: Clasa "dreptunghi" atribuie un border, o latime si inaltime divurilor generate, o culoare de background si face ca divurile sa fie pozitionate pe acelasi rand cu o distanta de 10px intre ele. La fiecare click pe orice div cu clasa “dreptunghi”, acesta va creste in inaltime (in jos) cu 10px. Daca se da click in fereastra, in afara divurilor, toate divurile revin la dimensiunea initiala. 
// Click-ul pe un div nu trebuie sa declanseze actiunea click-ului din afara divurilor.



window.onload=function(){

	for(var i=0;i<10;i++) {
  
	  var div=document.createElement("div"); //creare colectie
	  document.body.appendChild(div);
	  div.className="dreptunghi"; //div.classList.add("dreptunghi");
	  div.innerHTML="divul " + (i+1);
  
	// SINTAXA getComputedSyle : getComputedSyle(element).proprietate
	  var initial= parseInt(window.getComputedStyle(div).height); //preluare stil creat cu CSS: 150
  
	  div.onclick=function(event){ //click pe div => se mareste inaltimea cu 10 px
		if(this.style.height!==""){
		  var curent=parseInt(this.style.height);
		   this.style.height= curent+10+'px';
		 }
		 else
		{
			this.style.height= initial + 10 + 'px';
		}
		event.stopPropagation(); //oprirea propagarii spre parinte
	  }
	}
	document.body.onclick=function(){ //cand dam click pe body se revine la dimens initiala
	  var divuri=document.getElementsByClassName("dreptunghi");
	  for(d of divuri) d.style.height=initial +'px';
	}
  }

//   Presupunem ca in documentul HTML exista un input de tip text cu id-ul "numar" si 10 paragrafe ale caror continuturi 
//   sunt cuvinte separate prin spatii (ex: <p >examen la tehnici web </p >). In inputul de tip text se va scrie un 
//   numar intreg (fara validare, presupuneti ca e corect). La prima apasare a tastei "s" se preia numarul din inputul 
//   de tip text si se sterge din secunda in secunda cate un paragraf care contine un numar de cuvinte mai mare strict 
//   decat numarul din input. Dupa ce s-a terminat stergerea tuturor paragrafelor care indeplinesc conditia, 
//   numarul paragrafelor sterse va fi salvat in localStorage iar la urmatoarea reincarcare a paginii,
//   ea va fi valoarea implicita a elementului input de tip text.


window.onload=function(){

	var input=document.getElementById("numar");
  
	if(localStorage.getItem("nr")){
	  input.value=localStorage.getItem("nr");
	}
  
	//var input=document.getElementById("numar");
	var par=document.getElementsByTagName("p");
	var nr=par.length;
  
	window.onkeydown=function(event){
	  if(event.key =="s"){
			window.onkeydown=null;
		  var c=setInterval(function(){
			var x;
			for(let p of par){
			  if (p.innerHTML.split(" ").length > parseInt(input.value)){
				x=p;
				break;
			  }
			}
			if(x){
			  document.body.removeChild(x);   
			}
			else {
			  clearInterval(c);
			  alert(nr-par.length);
			  localStorage.setItem("nr",nr-par.length);
			}
		  },2000);
		}
	  }
  
	}

// la apasarea unui buton de check se afiseaza numai nr intregi
window.onload = function() {
    document.getElementById("intregi").onchange = function() {
        let options = document.querySelectorAll("#numere > option");
        if(this.checked == true) {
            for(option of options) {
                if(parseInt(option.innerText) != option.innerText * 10 / 10)
                    option.style.display = "none";
            }
        } else {
            for(option of options) {
                option.style.display = "initial";
            }
        }
    }
}

// - la incarcarea paginii se va afisa in input data curenta iar la fiecare 3s se va selecta automat cate o optiune 
// din select incepand cu prima iar textul din input (data curenta) se va colora in culoarea optiunii selectate. 
// Dupa ultima optiune, selectia se va relua de la inceput.
// -  in situatia anterioara, daca se apasa tasta "s", selectia se va opri iar la reincarcarea paginii continutul 
// inputului sa apara colorat in culoarea ultimei optiuni selectate inainte de refresh.

const data = document.getElementById("data");
data.value = new Date();

let select = document.getElementsByTagName("select")[0];

let counter = -1;

let localCounter = localStorage.getItem("counter");
if (localCounter){
    counter = parseInt(localCounter);
    select.selectedIndex = counter;
    data.style.color = select.value;
}

const interval = setInterval(() =>{
    select.selectedIndex = ++counter;
    data.style.color = select.value;
    if (counter === 2)
        counter = -1;
}, 3000)


document.addEventListener("keydown", (e) =>{
    if (e.key.toUpperCase() === "S"){
        clearInterval(interval);
        localStorage.setItem("counter", counter % 3);
    }
})
