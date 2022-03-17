export class Klub{
    constructor(naziv,mail,mesto/*,ime,prezime,bodovi,turniri*/){
        this.naziv= naziv;
        this.mail = mail;
        this.mesto = mesto/*,
        this.ime= ime;
        this.prezime = prezime;
        this.bodovi =bodovi;
        this.turniri = turniri;*/
    }
    popuni(){
        let telo = document.querySelector(".InfoOKlubu");

        let tr = document.createElement("tr");
        telo.appendChild(tr);

        let td = document.createElement("td");
        td.innerHTML = this.naziv;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.mail;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.mesto;
        tr.appendChild(td);
        /*td = document.createElement("td");
        td.innerHTML = this.ime;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.prezime;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.bodovi;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.turniri;*/
        
    }
}