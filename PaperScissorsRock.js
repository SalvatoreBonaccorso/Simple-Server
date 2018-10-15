var exp = require('express');
var bodyParser = require('body-parser');
var app = exp();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// creiamo una variabile hystory che contiene un json con le statistiche di gioco
// le mettiamo fuori dalla API in modo tale che non si inizializza sempre da zero 
var hystory={
    draw:0,
    win:0,
    lose:0,
    matches:0,
};

//mi creo la funzione random della scelta del computer
function getRandomChoice(){
    var random =Math.random();
    if (random < 0.33) {
        return "Paper";
    } else if (random < 0.66) {
        return "Scissor";
    } else  {
        return "Rock";
    }
}

// mi creo una chiamata API di tipo GET
app.get('/games/paperScissorRock',function(req,res){

    // associo alla variabile computerChoice la funzione creata in precedenza
    var computerChoice=getRandomChoice();

    // associo alla variabile userChoice il valore che inserisco nell'url
    var userChoice=req.query.myChoice;



    // effettuo un controllo sui valori mandati dal client se sono corretti procedo con il mio algoritmo
    if((userChoice==="Paper") ||
       (userChoice==="Scissor") ||
       (userChoice==="Rock"))
    { 
        // condizioni di pareggio tra user e pc
        if ((userChoice=="Paper"&& computerChoice=="Paper")
            || (userChoice=="Scissor"&& computerChoice=="Scissor")
            || (userChoice=="Rock"&& computerChoice=="Rock")){
            // attraverso la notazione puntata accedo al draw e al counter e li incremento
            hystory.draw++;
            hystory.matches++;
            return res.json({result:'Draw ',computerChoice:computerChoice,hystory:hystory});

        }
        // condizioni che permette al pc di vincere
        else if ((userChoice=="Paper"&& computerChoice=="Scissor")
                 || (userChoice=="Scissor"&& computerChoice=="Rock")
                 || (userChoice=="Rock"&& computerChoice=="Paper")) {
            hystory.lose++;
            hystory.matches++;
            return res.json({result:'You lose ',computerChoice:computerChoice,hystory:hystory});
        }

        else {
            hystory.win++;
            hystory.matches++;
            return res.json({result:'You win ',computerChoice:computerChoice,hystory:hystory});

        } 
    } else{
        res.status(400).json({message:"wrong value of myChoice"});
    }    

})
// setto la porta di ascolto del server nella 3001
app.listen(3001);


