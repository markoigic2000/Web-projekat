export class Igrac{

    constructor(ime,prezime,brojb){
        this.ime = ime;
        this.prezime = prezime;
        this.brojb= brojb;
    }
    popuniBodove(){
        let telo = document.querySelector(".BodoviBody");

        let tr = document.createElement("tr");
        telo.appendChild(tr);

        let td = document.createElement("td");
        td.innerHTML = this.ime
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.prezime;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.brojb;
        tr.appendChild(td);

    }
    
    
}