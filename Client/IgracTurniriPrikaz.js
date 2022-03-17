export class IgracTurniriPrikaz{
    constructor(ime,prezime,bodovi,turniri)
    {
        this.ime=ime;
        this.prezime=prezime;
        this.bodovi= bodovi;
        this.turniri = turniri;
    }
    popuniTurnire(){
        let telo = document.querySelector(".TurniriBody");

        let tr = document.createElement("tr");
        telo.appendChild(tr);

        let td = document.createElement("td");
        td.innerHTML = this.ime
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.prezime;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.bodovi;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.turniri;
        tr.appendChild(td);
        


    }
}