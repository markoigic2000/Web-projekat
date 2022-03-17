export class Mec{
    constructor(faza,kategorija,sudija,turnir){
        this.faza=faza;
        this.kategorija = kategorija;
        this.sudija=sudija;
        this.turnir=turnir;
    }
    popuniTabelu(){
        let telo = document.querySelector(".MeceviBody");

        let tr = document.createElement("tr");
        telo.appendChild(tr);

        let td = document.createElement("td");
        td.innerHTML = this.faza;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.kategorija;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.sudija;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = this.turnir;
        tr.appendChild(td);
    }
}