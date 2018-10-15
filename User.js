// mi importo la funzione express
var exp = require('express');
// mi importo il meccanismo del "body-parser"che sarà in grado di farci leggere il body inviati dai client( nel POST e PUT )
var bodyParser = require('body-parser');
// questo è il mio server con la funzione express()
var app = exp();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// mi creo un array di json di users
var users=[
  {
   name:"Luca",
   surname:"Bonaccorso"
 },
 {
   name:"Luca",
   surname:"Lanzerotti"
 },
   { name:"Sempronio",
   surname:"Caio"
 }
]


//creo la funzione GET nel server che mi restituisce l'oggetto con la posizione(indice) richiesta
app.get('/users/:index',function(req,res){
  console.log("--------------------------------");  // trattini per separare i console log di un altra chiamata
    console.log("req.params: ", req.params);        // mi ritorna tutto ciò che c'è dopo i :
    console.log("req.query: ", req.query);          // mi ritorna tuuto ciò che c'è dopo il ?
    console.log("req.body: ", req.body);           // mi ritorna un eventuale body

    var user=users[req.params.index];  
    console.log(user);                            // contenuto dell'indice che inseriamo noi da url
    
    var x=req.params.index;  
    console.log(x);                               // valore che inserisco nell'url
    console.log(users.length);                    // dimensione dell'array users
    
    // se ( x ) non è un numero o è un numero negativo... errore 400
    if(isNaN(x) || parseInt(x)<0){
      res.status(400).json({message:x+' is not a positive number'});
    }
    // altrimenti se il valore dell'indice che inseriamo noi è maggiore della grandezza dell'array..errore 404
    else if (parseInt(x)>=users.length){
      res.status(404).json({message:'User not found'});
    }
    // in tutti gli altri casi ok status 200 e ritorna il json corrispondente
    else {
            res.status(200).json(user);
    }
});


// creo la funzione get nel server che mi restituisce un filtraggio per nome o per cognome all'interno dell'array users
app.get('/users', function(req, res){
    if(req.query.name || req.query.surname ){        // se sto filtrando per nome o per cognome
        var filterArray = [];                       // mi creo un array di supporto per inserire le ricorrenze trovate
        for (var i = 0; i < users.length; i++) {    // scorro tutti gli utenti
            if (users[i].name == req.query.name || users[i].surname == req.query.surname) {
                filterArray.push(users[i]);        // aggiungo all'array di supporto lo users iesimo
            }
        }
        res.status(200).json(filterArray); //questo è l'array filtrato
    }
    else
        res.json(users);
})

// creo la funzione POST che mi permette di inserire nuovi user
app.post('/users',function(req,res){
  var newUser=req.body;
  users.push(newUser);
    res.status(201).json();

})

// creo la funzione PUT che mi permette di modificare un utente
app.put('/users/:index',function(req,res){
  var i = parseInt(req.params.index); // assegno alla variabile i il valore che inserisco nell'url
    users[i].name = req.body.name;
    users[i].surname = req.body.surname;
    res.json();
})

// creo la funzione DELETE che mi permette di cancellare un utente
app.delete('/users/:index', function(req, res) {
  var i = parseInt(req.params.index);
  users.splice(i, 1);
  res.json();
})

// setto la porta di ascolto del server nella 3001
app.listen(3001);
