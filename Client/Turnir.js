export class Turnir {
    constructor(ime,grad,bodovi,datum,pobednik){
        this.ime = ime;
        this.grad = grad;
        this.bodovi = bodovi;
        this.datum = datum;
        this.pobednik = pobednik;
    }
    popuniTurnir(){
        let telo = document.querySelector(".TurnirBody");

        let tr = document.createElement("tr");
        telo.appendChild(tr);

        let td = document.createElement("td");
        td.innerHTML = this.ime
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.grad;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.bodovi;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.datum;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.pobednik;
        tr.appendChild(td);
        
    }
}