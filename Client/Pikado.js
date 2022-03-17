import { Igrac } from "./Igrac.js";
import { IgracTurniriPrikaz } from "./IgracTurniriPrikaz.js";
import { Klub } from "./Klub.js";
import { Mec } from "./Mec.js";
import { Turnir } from "./Turnir.js";
import { KlubClan } from "./KlubClan.js"; //?????????
export class Pikado{

    constructor(naziv){
        this.naziv=naziv;
        this.kont=null;
    }


    crtaj(host){

        this.kont = document.createElement("div");
        this.kont.className="glavniKontejner";
        host.appendChild(this.kont);
        
        var pocetniDiv = document.createElement("div");
        pocetniDiv.className = "pocetniDiv";
        pocetniDiv.innerHTML=this.naziv;

        this.kont.appendChild(pocetniDiv);

        var deloviDiv = document.createElement("div");
        deloviDiv.className="deloviDiv";
        this.kont.appendChild(deloviDiv);



        this.crtajGlavniDeo(deloviDiv);      
    }
    

    crtajGlavniDeo(host){
        var listaDivova= ["Igraci","Klubovi","Turniri","Mecevi","Sudije"];
        var deo;
        listaDivova.forEach(el => {
            deo = document.createElement("div");
            deo.className=el;
            host.appendChild(deo);
        })

        var divIgraci = document.querySelector(".Igraci");
        var divKlubovi = document.querySelector(".Klubovi");
        var divTurniri = document.querySelector(".Turniri");
        var divMecevi = document.querySelector(".Mecevi");
        var divSudije = document.querySelector(".Sudije");
       
       
        /*console.log(divIgraci);
        console.log(divKlubovi);
        console.log(divTurniri);
        console.log(divMecevi);
        console.log(divSudije);*/

        this.crtajIgrac(divIgraci);
        this.crtajKlub(divKlubovi);
        this.crtajTurnir(divTurniri);
        this.crtajMec(divMecevi);
        this.crtajSudija(divSudije);

  
    }
    // POMOCNE FUNKCIJE ZA ISCRTAVANJE
    crtajDivove(divs,host){
        divs.forEach(el => {
            let d =document.createElement("div");
            d.className = el;
            host.appendChild(d);
        })
    }
    crtajLabele(labele,host){
        labele.forEach(el => {
            let l =document.createElement("label");
            l.innerHTML = el;
            host.appendChild(l);
        })
    }
    crtajDugmice(dugmici,host){
        dugmici.forEach(el => {
            let b =document.createElement("button");
            b.innerHTML = el;
            b.className = "Dugme";
            host.appendChild(b);
        })
    }
    //---------------------------------------------------------------------------------IGRAC--------------------------------------------------------------------------
    //CRTANJE DELA ZA IGRACE
    crtajIgrac(host){
        
        var d = document.createElement("div");
        d.className = "IgracNaziv";
        d.innerHTML = "Igrac";
        host.appendChild(d);

        d = document.createElement("div");
        d.className = "IgracForma";
        host.appendChild(d);

        d = document.createElement("div");
        d.className = "IgracPodaci";
        host.appendChild(d);

        let t = document.createElement("t");
        d.appendChild(t);

        var divIgracForma  = document.querySelector(".IgracForma");
        
        this.crtajIgracForma(divIgracForma);
       
    }
    crtajIgracForma(host){
        let d=["IgracFormaDodaj","IgracFormaPrikazi"];
        this.crtajDivove(d,host);

        let divFormaDodaj = document.querySelector(".IgracFormaDodaj");
        let divFormaPrikazi = document.querySelector(".IgracFormaPrikazi");
        
        this.crtajIgracFormaDodaj(divFormaDodaj);
        this.crtajIgracFormaPrikazi(divFormaPrikazi);

    }
    crtajIgracFormaDodaj(host){
        let d = ["IgracFormaDodajPodaci","IgracFormaDodajDugme"];
        this.crtajDivove(d,host);
        let d1 = document.querySelector(".IgracFormaDodajPodaci");
        let d2 = document.querySelector(".IgracFormaDodajDugme");

        this.crtajIgracFormaDodajPodaci(d1);
        this.crtajIgracFormaDodajDugme(d2);

    }
    crtajIgracFormaDodajPodaci(host){
        let l = ["IgracFormaDodajPodaciLabela","IgracFormaDodajPodaciUpis"];
        this.crtajDivove(l,host);

        let d1= document.querySelector(".IgracFormaDodajPodaciLabela");
        let d2 = document.querySelector(".IgracFormaDodajPodaciUpis");

        this.crtajIgracFormaDodajPodaciLabela(d1);
        this.crtajIgracFormaDodajPodaciUpis(d2);
    }
    crtajIgracFormaDodajPodaciLabela(host){
        let d = ["Broj registracije","Ime","Prezime","Mail","Datum rodjenja"];
        this.crtajLabele(d,host);
    }
    crtajIgracFormaDodajPodaciUpis(host){
        //
        let klase=["IgracDodajRegistracija","IgracDodajIme","IgracDodajPrezime","IgracDodajMail","IgracDodajDatum"]
        for(let i=0;i<4;i++){
            let p  =document.createElement("input");
            p.type = "text";
            p.className = klase[i];
            host.appendChild(p);
        }
        let p = document.createElement("input");
        p.type = "date";
        p.className=klase[4];
        host.appendChild(p);

    }
    crtajIgracFormaDodajDugme(host){
        let d =["Dodaj"];
        this.crtajDugmice(d,host);
        
        let s = document.querySelector(".IgracFormaDodajDugme");
        let dete = s.firstChild;
        var reg = document.querySelector(".IgracDodajRegistracija")
        var ime = document.querySelector(".IgracDodajIme");
        var prezime = document.querySelector(".IgracDodajPrezime");
        var mail=document.querySelector(".IgracDodajMail");
        var datum = document.querySelector(".IgracDodajDatum");
        dete.onclick=(ev)=>this.dodajIgraca(reg.value,ime.value,prezime.value,mail.value,datum.value);

    }
    //1.------------------------------------------------Dodaj igraca
    dodajIgraca(reg,ime,prezime,mail,datum){
        console.log(ime);
        if(reg==="" || reg===null){
            alert("Unesite broj registracije");
        }
        if(ime==="" || ime===null){
            alert("Unesite ime");
        }
        if(prezime==="" || prezime===null){
            alert("Unesite prezime");
        }
        if(mail==="" || prezime===null){
            alert("Unesite mail");
        }
        var sada = new Date();// trenutno vreme
        if(datum>sada || datum===undefined || datum===null || datum==="")
        {
            alert("Unesite vazeci datum");
        }
        
        console.log("Ime :" + ime);
        console.log("Prezime :" +prezime);
        console.log("Mail : "+ mail);
        console.log("Datum:"+datum);

        fetch("https://localhost:5001/Igrac/DodavanjeIgraca/"+reg+"/"+ime+"/"+prezime+"/"+mail+"/"+datum,{
            method : "POST"
        }).then (s => 
            {
                if(s.status==200)
                {
                    alert("Uspesno dodat igrac " + ime + " " + prezime); 
                }
                else{
                    alert("Neuspesno uneti podaci");
                }
            })
    }
    crtajIgracFormaPrikazi(host){
        let n = ["IgracFormaPrikaziPodaci","IgracFormaPrikaziDugme"];
        this.crtajDivove(n,host);

        let d1 =document.querySelector(".IgracFormaPrikaziPodaci");
        let d2 = document.querySelector(".IgracFormaPrikaziDugme");

        this.crtajIgracFormaPrikaziPodaci(d1);
        this.crtajIgracFormaPrikaziDugme(d2);


    }
    crtajIgracFormaPrikaziPodaci(host){
        let p = document.createElement("div");
        p.innerHTML = "Prikazi sve igrace koji imaju vise od ";
        host.appendChild(p);

        let u = document.createElement("input");
        u.type = "number";
        u.className = "IgracFormaPrikaziPodaciBroj";
        host.appendChild(u);

        let slct = document.createElement("select");
        slct.className= "IgracFormaPrikaziPodaciPretraga"
        host.appendChild(slct);
        let n = ["broja bodova","osvojenih turnira"];
        n.forEach((el,indeks) => {
            let op = document.createElement("option");
            op.innerHTML = el;
            op.value = indeks;
            slct.appendChild(op);
        })

    }
    crtajIgracFormaPrikaziDugme(host){
        let d = ["Prikazi"];
        this.crtajDugmice(d,host);

        let roditelj= document.querySelector(".IgracFormaPrikaziDugme");
        let dugme = roditelj.firstChild;
        let broj = document.querySelector(".IgracFormaPrikaziPodaciBroj");

        dugme.onclick=(ev)=>this.prikaziIgrace(broj.value);
    }
    //--------------------------------------------------Prikazi igrace 
    prikaziIgrace(broj){
        if(broj===null || broj===""){
            alert("Unesite broj");
        }
        let pretraga = document.querySelector(".IgracFormaPrikaziPodaciPretraga");
        let vr = pretraga.options[pretraga.selectedIndex].value;
        if(vr==0){
            // po broju bodova
            fetch("https://localhost:5001/Igrac/PrikazPoBrojuBodova/"+broj,{
                method :"GET"
            }).then(s => {
                if(s.ok){
                    this.obrisiTabelu();
                    this.napraviTabeluBodovi();
                    s.json().then(data => {
                        data.forEach(i => {
                            let igrac = new Igrac(i.ime,i.prezime,i.bodovi);
                            igrac.popuniBodove();
                            
                        })
                    })
                }
            })
        }
        else{
            //po broju osvojenih turnira
            fetch("https://localhost:5001/Igrac/PrikazPoBrojuTurnira/"+broj,{
                method:"GET"
            }).then(s => {
                if(s.ok){
                    this.obrisiTabelu();
                    this.napraviTabeluTurniri();
                    s.json().then(data => {
                        data.forEach(i => {
                            let igrac = new IgracTurniriPrikaz(i.ime,i.prezime,i.bodovi,i.osvojeni);
                            igrac.popuniTurnire();
                        })
                    })
                }
            })
        }
    }
    obrisiTabelu(){
        let r  =document.querySelector(".IgracPodaci");
        let d = r.firstChild;
        r.removeChild(d);
        
    }
    napraviTabeluBodovi(){
        let div = document.querySelector(".IgracPodaci");

        let t = document.createElement("table");
        div.appendChild(t);

        let th = document.createElement("thead");
        t.appendChild(th);

        let tb = document.createElement("tbody");
        tb.className = "BodoviBody";
        t.appendChild(tb);

        let tr = document.createElement("tr");
        th.appendChild(tr);

        let td = document.createElement("td");
        td.innerHTML = "Ime";
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "Prezime";
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "Broj bodova";
        tr.appendChild(td);
    }
    
    napraviTabeluTurniri(){
        let div = document.querySelector(".IgracPodaci");

        let t = document.createElement("table");
        div.appendChild(t);

        let th = document.createElement("thead");
        t.appendChild(th);

        let tb = document.createElement("tbody");
        tb.className = "TurniriBody";
        t.appendChild(tb);

        let tr = document.createElement("tr");
        th.appendChild(tr);

        let td = document.createElement("td");
        td.innerHTML = "Ime";
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "Prezime";
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "Broj bodova";
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "Broj turnira";
        tr.appendChild(td);

    }
    //--------------------------------------------------------------------------------KLUB------------------------------------------------------------------------------------
    //CRTANJE DELA ZA KLUBOVE
    crtajKlub(host){
        let d = document.createElement("div");
        d.className = "KlubNaziv";
        d.innerHTML = "Klub";
        host.appendChild(d);

        d=document.createElement("div");
        d.className = "KlubForma";
        host.appendChild(d);

        d=document.createElement("div");
        d.className="KlubPodaci";
        host.appendChild(d);

        let t = document.createElement("t");
        d.appendChild(t);

        let divKlubForma = document.querySelector(".KlubForma");

        this.crtajKlubForma(divKlubForma);
    }
    crtajKlubForma(host){
        let nizFormi = ["KlubFormaDodajKlub","KlubFormaDodajIgraca","KlubFormaPrikazi"];
        nizFormi.forEach(el => {
            let l = document.createElement("div");
            l.className = el;
            host.appendChild(l);
        }) 

        let d1 = document.querySelector(".KlubFormaDodajKlub");
        let d2 = document.querySelector(".KlubFormaDodajIgraca");
        let d3 = document.querySelector(".KlubFormaPrikazi");

        this.crtajKlubFormaDodajKlub(d1);
        this.crtajKlubFormaDodajIgraca(d2);
        this.crtajKlubFormaPrikazi(d3);
    }
    crtajKlubFormaDodajKlub(host){
        let niz = ["KlubFormaDodajKlubPodaci", "KlubFormaDodajKlubDugme"];
        niz.forEach(el => {
            let l = document.createElement("div");
            l.className=el;
            host.appendChild(l);
        })
        
        let d1 = document.querySelector(".KlubFormaDodajKlubPodaci");
        let d2 = document.querySelector(".KlubFormaDodajKlubDugme");

        this.crtajKlubFormaDodajKlubPodaci(d1);
        this.crtajKlubFormaDodajKlubDugme(d2);
    }
    crtajKlubFormaDodajKlubPodaci(host){
        let niz = ["KlubFormaDodajKlubPodaciLabela","KlubFormaDodajKlubPodaciUpis"];
        niz.forEach(el => {
            let l = document.createElement("div");
            l.className = el;
            host.appendChild(l);
        })

        let d1 = document.querySelector(".KlubFormaDodajKlubPodaciLabela");
        let d2 = document.querySelector(".KlubFormaDodajKlubPodaciUpis");

        this.crtajKlubFormaDodajKlubPodaciLabela(d1);
        this.crtajKlubFormaDodajKlubPodaciUpis(d2);
    }
    crtajKlubFormaDodajKlubPodaciLabela(host){
        let labele = ["Ime","Sajt","Mail","Mesto"];
        labele.forEach(el => {
            let l = document.createElement("label");
            l.innerHTML = el;
            host.appendChild(l);
        })
    }
    crtajKlubFormaDodajKlubPodaciUpis(host){
        let klase = ["KlubDodajIme","KlubDodajSajt","KlubDodajMail","KlubDodajMesto"]
        for(let i=0;i<4;i++){
            let u = document.createElement("input");
            u.type = "text";
            u.className = klase[i];
            host.appendChild(u);
        }
    }

    crtajKlubFormaDodajKlubDugme(host){
        let d = ["Dodaj"];
        this.crtajDugmice(d,host);

        let ime = document.querySelector(".KlubDodajIme");
        let sajt = document.querySelector(".KlubDodajSajt");
        let mail = document.querySelector(".KlubDodajMail");
        let mesto = document.querySelector(".KlubDodajMesto");

        let r = document.querySelector(".KlubFormaDodajKlubDugme");
        let dugme = r.firstChild;
        dugme.onclick=(ev)=>this.dodajKlub(ime.value,sajt.value,mail.value,mesto.value);
    }
    //-------------------------------------------------Dodaj klub
    dodajKlub(ime,sajt,mail,mesto)
    {
        if(ime==="" || ime===null){
            alert("Unesite ime");
        }
        if(sajt==="" || sajt===null){
            alert("Unesite sajt");
        }
        if(mail==="" || mail===null){
            alert("Unesite mail");
        }
        if(mesto==="" || mesto===null){
            alert("Unesite mesto");
        }
        fetch("https://localhost:5001/Klub/DodavanjeKluba/"+ime+"/"+sajt+"/"+mail+"/"+mesto,{
            method:"POST"
        }).then(s => {
            if(s.ok){
                alert("Uspeno dodat klub " + ime);
            }
            else{
                alert("Neuspesno uneti podaci");
            }
        })
    }

    crtajKlubFormaDodajIgraca(host){
        let niz = ["KlubFormaDodajIgracaPodaci","KlubFormaDodajIgracaDugme"];
        niz.forEach(el => {
            let l = document.createElement("div");
            l.className = el;
            host.appendChild(l);
        })
        let d1 = document.querySelector(".KlubFormaDodajIgracaPodaci");
        let d2 = document.querySelector(".KlubFormaDodajIgracaDugme");

        this.crtajKlubFormaDodajIgracaPodaci(d1);
        this.crtajKlubFormaDodajIgracaDugme(d2);
    }
    crtajKlubFormaDodajIgracaPodaci(host){
        let n = ["KlubFormaDodajIgracaPodaciLabela","KlubFormaDodajIgracaPodaciUpis"];
        n.forEach(el => {
            let l = document.createElement("div");
            l.className = el;
            host.appendChild(l);
        })
        let d1 = document.querySelector(".KlubFormaDodajIgracaPodaciLabela");
        let d2 = document.querySelector(".KlubFormaDodajIgracaPodaciUpis");

        this.crtajKlubFormaDodajIgracaPodaciLabela(d1);
        this.crtajKlubFormaDodajIgracaPodaciUpis(d2);
    }
    crtajKlubFormaDodajIgracaPodaciLabela(host){
        let labele = ["Klub","Broj registracije igraca"];
        labele.forEach(el => {
            let l = document.createElement("label");
            l.innerHTML = el;
            host.appendChild(l);
        })
    }
    crtajKlubFormaDodajIgracaPodaciUpis(host){
        let klase = ["KlubDodajIgracaKlub","KlubDodajIgracaBrojRegistracijeIgraca"];
        for(let i =0;i<2;i++){
            let l =document.createElement("input");
            if(i==0){
                l.type="text";    
            }
            else{
                l.type="number";
            }
            l.className=klase[i];
            host.appendChild(l);
        }
    }
    crtajKlubFormaDodajIgracaDugme(host){
        let d = document.createElement("button");
        d.innerHTML="Dodaj igraca";
        d.className = "Dugme";
        host.appendChild(d);
        
        let imeKluba= document.querySelector(".KlubDodajIgracaKlub");
        let IdIgraca = document.querySelector(".KlubDodajIgracaBrojRegistracijeIgraca");

        let r = document.querySelector(".KlubFormaDodajIgracaDugme");
        let dugme = r.firstChild;
        dugme.onclick=(ev)=>this.dodajUKlub(imeKluba.value,IdIgraca.value);
    }
    //--------------------------------------------------Dodaj igraca u klub
    dodajUKlub(klub,igrac){
        if(klub==="" || klub===null){
            alert("Unesite ime");
        }
        if(igrac==="" || igrac===null){
            alert("Unesite sajt");
        }
        fetch("https://localhost:5001/Klub/DodavanjeIgracaUKlub/"+igrac+"/"+klub,{
            method:"POST"
        }).then(s => {
            if(s.ok){
                alert("Igrac sa brojem registracije : "+igrac+" dodat u klub "+klub );
            }
            else{
                alert("Neuspesno dodavanje igraca u klub");
            }
        })
    }
    crtajKlubFormaPrikazi(host){
        let l = ["KlubFormaPrikaziPodaci","KlubFormaPrikaziDugme"];
        l.forEach(el => {
            let d = document.createElement("div");
            d.className = el;
            host.appendChild(d);
        })
        let d1 = document.querySelector(".KlubFormaPrikaziPodaci");
        let d2 = document.querySelector(".KlubFormaPrikaziDugme");

        this.crtajKlubFormaPrikaziPodaci(d1);
        this.crtajKlubFormaPrikaziDugme(d2);
    }
    crtajKlubFormaPrikaziPodaci(host){
        let niz = ["KlubFormaPrikaziPodaciLabela","KlubFormaPrikaziPodaciUpis"];
        niz.forEach(el => {
            let d =document.createElement("div");
            d.className=el;
            host.appendChild(d);
        })
        let d1 = document.querySelector(".KlubFormaPrikaziPodaciLabela");
        let d2 = document.querySelector(".KlubFormaPrikaziPodaciUpis");

        this.crtajKlubFormaPrikaziPodaciLabela(d1);
        this.crtajKlubFormaPrikaziPodaciUpis(d2);
    }
    crtajKlubFormaPrikaziPodaciLabela(host){
        let l = document.createElement("label");
        l.innerHTML = "Klub";
        host.appendChild(l);

    }
    crtajKlubFormaPrikaziPodaciUpis(host){
        let l = document.createElement("input");
        l.type = "text";
        l.className = "KlubInfo";
        host.appendChild(l);

    }
    crtajKlubFormaPrikaziDugme(host){
        let dugmici = ["Prikazi info o klubu"];
        dugmici.forEach((el,ind) => {
            let b = document.createElement("button");
            b.innerHTML=el;
            b.className ="Dugme";
            b.id = "dugme"+ind;
            host.appendChild(b);
        })
        let naziv = document.querySelector(".KlubInfo");
        let d1= document.getElementById("dugme0");
        
        d1.onclick=(ev)=>this.prikaziInfoOKlubu(naziv.value);
        
        

    }
    prikaziInfoOKlubu(klub){
        if(klub==="" || klub===null){
            alert("Unesite ime");
        }
        fetch("https://localhost:5001/Klub/PrikaziKlub/"+klub,{
            method:"GET"
        }).then(s => {
            this.obrisiKlubTabelu();
            this.napraviTabeluInfoOKlubu();
            if(s.status==200){
                s.json().then(data => {
                    data.forEach(k => {
                        let klub = new Klub(k.ime,k.mail,k.mesto,k.clanovi);
                        klub.popuni();
                    })
                })
            }
            else{
                alert("Ne postoji klub sa unetim imenom");
            }
        })
        
    }
    obrisiKlubTabelu(){
        let rod = document.querySelector(".KlubPodaci");
        let dete = rod.firstChild;
        rod.removeChild(dete);
    }
    napraviTabeluInfoOKlubu(){
        let div = document.querySelector(".KlubPodaci");

        let t = document.createElement("table");
        div.appendChild(t);

        let th = document.createElement("thead");
        t.appendChild(th);

        let tb = document.createElement("tbody");
        tb.className = "InfoOKlubu";
        t.appendChild(tb);

        let tr = document.createElement("tr");
        th.appendChild(tr);

        let td = document.createElement("td");
        td.innerHTML = "Ime kluba";
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "Mail";
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "Mesto";
        tr.appendChild(td);
        
        
    }
    //----------------------------------------------------------------------------TURNIR----------------------------------------------------------------------------------
    //CRTANJE DELA ZA TURNIRE
    crtajTurnir(host){
        let n = ["TurnirNaziv","TurnirForma","TurnirPodaci"];
        this.crtajDivove(n,host);

        let d1 = document.querySelector(".TurnirNaziv");
        d1.innerHTML="Turnir";

        d1 = document.querySelector(".TurnirForma");
        
        let d2 = document.querySelector(".TurnirPodaci");
        let t = document.createElement("t");
        d2.appendChild(t);

        this.crtajTurnirForma(d1);
    }
    crtajTurnirForma(host){
        let n = ["TurnirFormaDodajTurnir","TurnirFormaDodaj","TurnirFormaPrikazi"];
        this.crtajDivove(n,host);

        let d1 =document.querySelector(".TurnirFormaDodajTurnir");
        let d2 =document.querySelector(".TurnirFormaDodaj");
        let d3 =document.querySelector(".TurnirFormaPrikazi");

        this.crtajTurnirFormaDodajTurnir(d1);
        this.crtajTurnirFormaDodaj(d2);
        this.crtajTurnirFormaPrikazi(d3);
    }
    crtajTurnirFormaDodajTurnir(host){
        let n = ["TurnirFormaDodajTurnirPodaci","TurnirFormaDodajTurnirDugme"];
        this.crtajDivove(n,host);

        let d1 = document.querySelector(".TurnirFormaDodajTurnirPodaci");
        let d2 = document.querySelector(".TurnirFormaDodajTurnirDugme");

        this.crtajTurnirFormaDodajTurnirPodaci(d1);
        this.crtajTurnirFormaDodajTurnirDugme(d2);

    }
    crtajTurnirFormaDodajTurnirPodaci(host){
        let n = ["TurnirFormaDodajTurnirPodaciLabela","TurnirFormaDodajTurnirPodaciUpis"];
        this.crtajDivove(n,host);

        let d1 = document.querySelector(".TurnirFormaDodajTurnirPodaciLabela");
        let d2 = document.querySelector(".TurnirFormaDodajTurnirPodaciUpis");

        this.crtajTurnirFormaDodajTurnirPodaciLabela(d1);
        this.crtajTurnirFormaDodajTurnirPodaciUpis(d2);

    }
    crtajTurnirFormaDodajTurnirPodaciLabela(host){
        let lbl = ["Naziv","Grad","Broj bodova","Nagradni fond","Datum odrzavanja"];
        this.crtajLabele(lbl,host);
    }
    crtajTurnirFormaDodajTurnirPodaciUpis(host){
        
        for(let i=0;i<5;i++){
            let klase = ["TurnirFormaDodajTurnirNaziv","TurnirFormaDodajTurnirGrad","TurnirFormaDodajTurnirBrojBodova","TurnirFormaDodajTurnirFond","TurnirFormaDodajTurnirDatum"];
            let d = document.createElement("input");
            if(i<2){
                d.type = "text";
            }
            else if(i===2 || i===3){
                d.type = "number"
            }
            else{
                d.type = "date";
            }
            d.className=klase[i];
            host.appendChild(d);
        }
    }
    crtajTurnirFormaDodajTurnirDugme(host){
        let d = ["Dodaj turnir"];
        this.crtajDugmice(d,host);

        let rod= document.querySelector(".TurnirFormaDodajTurnirDugme");
        let dete = rod.firstChild;
        let naziv = document.querySelector(".TurnirFormaDodajTurnirNaziv");
        let grad = document.querySelector(".TurnirFormaDodajTurnirGrad");
        let bodovi = document.querySelector(".TurnirFormaDodajTurnirBrojBodova");
        let fond = document.querySelector(".TurnirFormaDodajTurnirFond");
        let datum =document.querySelector(".TurnirFormaDodajTurnirDatum");
        dete.onclick=(ev)=>this.dodajTurnir(naziv.value,grad.value,bodovi.value,fond.value,datum.value);
    }
    dodajTurnir(naziv,grad,bodovi,fond,datum){
        if(naziv==="" || naziv===null){
            alert("Unesite naziv");
        }
        if(grad==="" || grad===null){
            alert("Unesite grad");
        }
        if(bodovi==="" || bodovi===null){
            alert("Unesite broj bodova");
        }
        if(fond==="" || fond===null){
            alert("Unesite nagradni fond");
        }
        if(datum==="" || datum===null){
            alert("Unesite datum");
        }
        fetch("https://localhost:5001/Turnir/DodavanjeTurnira/"+naziv+"/"+grad+"/"+bodovi+"/"+datum+"/"+fond,{
            method:"POST"
        }).then(s=> {
            if(s.status==200){
                alert("Dodat turnir "+ naziv+" cije je mesto odrzavanja " + grad );
            }
            else{
                alert("Neki od podataka nije validan , proverite i pokusajte ponovo");
            }
        })

    }
    crtajTurnirFormaDodaj(host){
        let n = ["TurnirFormaDodajPodaci","TurnirFormaDodajDugmici"];
        this.crtajDivove(n,host);

        let d1 = document.querySelector(".TurnirFormaDodajPodaci");
        let d2 = document.querySelector(".TurnirFormaDodajDugmici");

        this.crtajTurnirFormaDodajPodaci(d1);
        this.crtajTurnirFormaDodajDugmici(d2);

    }
    crtajTurnirFormaDodajPodaci(host){
        let n = ["TurnirFormaDodajPodaciLabela","TurnirFormaDodajPodaciUpis"];
        this.crtajDivove(n,host);

        let d1 = document.querySelector(".TurnirFormaDodajPodaciLabela");
        let d2 = document.querySelector(".TurnirFormaDodajPodaciUpis");

        
        this.crtajTurnirFormaDodajPodaciLabela(d1);
        this.crtajTurnirFormaDodajPodaciUpis(d2);

    }
    crtajTurnirFormaDodajPodaciLabela(host){
        let l = ["Naziv","Naziv kluba","Registracija pobednika"];
        this.crtajLabele(l,host);
    }
    crtajTurnirFormaDodajPodaciUpis(host){
        let klase = ["TurnirDodajNaziv","TurnirDodajKlub","TurnirDodajPobednik"]
        for(let i=0;i<3;i++){
            let u = document.createElement("input");
            if(i<2){
                u.type="text";
            }
            else{
                u.type = "number";
            }
            u.className = klase[i];
            host.appendChild(u);
        }
    }
    crtajTurnirFormaDodajDugmici(host){
        let dugmici = ["Dodaj organizatora","Dodaj pobednika"];
        dugmici.forEach((el,ind) => {
            let b = document.createElement("button");
            b.innerHTML=el;
            b.className ="Dugme";
            b.id = "d"+ind;
            host.appendChild(b);
        })

        let d1 = document.getElementById("d0");
        let d2 = document.getElementById("d1");

        let ime = document.querySelector(".TurnirDodajNaziv");
        let id = document.querySelector(".TurnirDodajPobednik");
        let klub = document.querySelector(".TurnirDodajKlub");

        d1.onclick=(ev)=>this.dodajOrganizatora(ime.value,klub.value);
        d2.onclick=(ev)=>this.dodajPobednika(ime.value,id.value);
    }
    dodajOrganizatora(ime,klub){
        if(ime===null || ime===""){
            alert("Unesite ime");
        }
        if(klub===null || klub===""){
            alert("Unesite ime");
        }
        fetch("https://localhost:5001/Turnir/DodavanjeOrganozatoraTurnira/"+ime+"/"+klub,{
            method : "PUT"
        }).then(s => {
            if(s.status==200){
                alert("Uspesno dodat organizator turnira " + ime);
            }
            else{
                alert("Greska prilikom unosenja podataka, pokusajte ponovo");
            }
        })
    }
    dodajPobednika(ime,id){
        if(ime===null || ime===""){
            alert("Unesite ime");
        }
        if(id===null || id===""){
            alert("Unesite ime");
        }
        fetch("https://localhost:5001/Turnir/DodavanjePobednikaTurnira/"+ime+"/"+id,{
            method: "PUT"
        }).then(s => {
            if(s.status==200){
                alert("Uspesno dodat pobednik turnira : " + ime);
            }
            else{
                alert("Greska prilikom unosenja podataka, pokusajte ponovo");
            }
        })
    }
    crtajTurnirFormaPrikazi(host){
        let n = ["TurnirFormaPrikaziPodaci","TurnirFormaPrikaziDugme"];
        this.crtajDivove(n,host);

        let d1 = document.querySelector(".TurnirFormaPrikaziPodaci");
        let d2 = document.querySelector(".TurnirFormaPrikaziDugme");

        this.crtajTurnirFormaPrikaziPodaci(d1);
        this.crtajTurnirFormaPrikaziDugme(d2);

    }
    crtajTurnirFormaPrikaziPodaci(host){
        let p = document.createElement("div");
        p.innerHTML = "Prikazi sve turnire koji imaju vise od ";
        host.appendChild(p);

        p = document.createElement("input");
        p.type = "number";
        p.className="KlubPrikaziBroj";
        host.appendChild(p);

        let n = ["broja bodova","nagradnog fonda"]
        n.forEach((el,ind) => {
            p = document.createElement("input");
            p.type = "radio";
            p.name = "Kriterijum"
            p.value = ind;
            host.appendChild(p);
            p = document.createElement("label");
            p.innerHTML = el;
            host.appendChild(p);
        })
    }
    crtajTurnirFormaPrikaziDugme(host){
        let d = ["Prikazi"];
        this.crtajDugmice(d,host);

        let rod = document.querySelector(".TurnirFormaPrikaziDugme");
        let dugme = rod.firstChild;

        let vrednost = document.querySelector(".KlubPrikaziBroj");

        dugme.onclick=(ev)=>this.prikaziTurnire(vrednost.value);
    }
    prikaziTurnire(vrednost){
        let kriterijum = document.querySelector('input[name="Kriterijum"]:checked').value;
        if(vrednost===null || vrednost===""){
            alert("Unesite broj");
        }
        if(kriterijum===null || kriterijum===""){
            alert("Izbaerite kriterijum");
        }
        if(kriterijum==0){
            //PO broju bodova
            fetch("https://localhost:5001/Turnir/PrikazPoBrojuBodova/"+vrednost,{
                method: "GET"
            }).then(s => {
                if(s.status==200){
                    this.obrisiTurnirTabelu();
                    this.napraviTurnirTabelu();
                    s.json().then(data => {
                        data.forEach(t => {
                            let turnir = new Turnir(t.naziv,t.grad,t.brojBodova,t.datum,t.pobednik);
                            turnir.popuniTurnir();
                        })
                    })
                }
                else{
                    alert("Neispravno uneti podaci, pokusajte ponovo");
                }
            })
        }
        else{
            //Po nagradnom fondu
            fetch("https://localhost:5001/Turnir/PrikazPoNagradnomFondu/"+vrednost,{
                method: "GET"
            }).then(s => {
                if(s.status==200){
                    this.obrisiTurnirTabelu();
                    this.napraviTurnirTabelu();
                    s.json().then(data => {
                        data.forEach(t => {
                            let turnir = new Turnir(t.naziv,t.grad,t.brojBodova,t.datum,t.pobednik);
                            turnir.popuniTurnir();
                        })
                    })
                }
                else{
                    alert("Neispravno uneti podaci, pokusajte ponovo");
                }
            })
        }
    }
    obrisiTurnirTabelu(){
        let r = document.querySelector(".TurnirPodaci");
        let dete = r.firstChild;
        r.removeChild(dete);
    }
    napraviTurnirTabelu(){
        let div = document.querySelector(".TurnirPodaci");

        let t = document.createElement("table");
        div.appendChild(t);

        let th = document.createElement("thead");
        t.appendChild(th);

        let tb = document.createElement("tbody");
        tb.className = "TurnirBody";
        t.appendChild(tb);

        let tr = document.createElement("tr");
        th.appendChild(tr);

        let td = document.createElement("td");
        td.innerHTML = "Naziv turnira";
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "Grad";
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "Broj bodova";
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "Datum";
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "Pobednik";
        tr.appendChild(td);
    }
    //--------------------------------------------------------------------------------MEC-----------------------------------------------------------------------------------
    //CRTANJE DELA ZA MECEVE
    crtajMec(host){
        let d = ["MecNaziv","MecForma","MecPrikaz"];
        this.crtajDivove(d,host);

        d= document.querySelector(".MecNaziv");
        d.innerHTML = "Mec";

        d= document.querySelector(".MecForma");
        this.crtajMecForma(d);

        let rod = document.querySelector(".MecPrikaz");
        let t = document.createElement("t");
        rod.appendChild(t);
    }
    crtajMecForma(host){
        let d = ["MecFormaDodaj","MecFormaPregledaj"];
        this.crtajDivove(d,host);

        d = document.querySelector(".MecFormaDodaj");
        let d1 = document.querySelector(".MecFormaPregledaj");

        this.crtajMecFormaDodaj(d);
        this.crtajMecFormaPregledaj(d1);
    }
    crtajMecFormaDodaj(host){
        let d = ["MecFormaDodajPodaci","MecFormaDodajDugme"];
        this.crtajDivove(d,host);
        
        let d1 = document.querySelector(".MecFormaDodajPodaci");
        let d2 = document.querySelector(".MecFormaDodajDugme");

        this.crtajMecFormaDodajPodaci(d1);
        this.crtajMecFormaDodajDugme(d2);

    }
    crtajMecFormaDodajPodaci(host){
        let d = ["MecFormaDodajPodaciLabela","MecFormaDodajPodaciUpis"];
        this.crtajDivove(d,host);

        let d1 = document.querySelector(".MecFormaDodajPodaciLabela");
        let d2 = document.querySelector(".MecFormaDodajPodaciUpis");

        this.crtajMecFormaDodajPodaciLabela(d1);
        this.crtajMecFormaDodajPodaciUpis(d2);

    }
    crtajMecFormaDodajPodaciLabela(host){
        let l = ["Faza","Kategorija","Turnir","Broj licence sudije","Registarski broj-igrac1","Registarski broj-igrac2"];
        this.crtajLabele(l,host);

    }
    crtajMecFormaDodajPodaciUpis(host){
        let slct = document.createElement("select");
        slct.className = "Faza"
        host.appendChild(slct);

        let faze = ["Cetvrtfinale","Polufinale","Finale"];
        faze.forEach((el,ind)=> {
            let op =document.createElement("option");
            op.innerHTML = el;
            op.value = ind;
            slct.appendChild(op);
        })
        let divkat = document.createElement("div");
        divkat.className = "Kategorije";
        host.appendChild(divkat);

        let kat = ["301","501"];
        kat.forEach((el,ind) => {
            let o = document.createElement("input");
            o.type = "radio";
            o.name = "Kategorija";
            o.value=ind;
            let l = document.createElement("label");
            l.innerHTML = el;
            divkat.appendChild(l);
            divkat.appendChild(o);
            })
        let klase = ["MecDodajTurnir","MecDodajSudija","MecDodajIgrac1","MecDodajIgrac2"];
        for(let i=0;i<4;i++){
            let u = document.createElement("input");
            if(i==0){
                u.type= "text";
            }
            else{
                u.type = "number";
            }
            u.className=klase[i];
            host.appendChild(u);
        }

    }
    crtajMecFormaDodajDugme(host){
        let d=["Dodaj"];
        this.crtajDugmice(d,host);

        let rod = document.querySelector(".MecFormaDodajDugme");
        let dete = rod.firstChild;


        let turnir = document.querySelector(".MecDodajTurnir");
        let sudija = document.querySelector(".MecDodajSudija");
        let igrac1 = document.querySelector(".MecDodajIgrac1");
        let igrac2 = document.querySelector(".MecDodajIgrac2");

        dete.onclick=(ev)=>this.dodajMec(turnir.value,sudija.value,igrac1.value,igrac2.value);
    }
    dodajMec(turnir,sudija,igrac1,igrac2){
        let kriterijum = document.querySelector('input[name="Kategorija"]:checked').value; // 0-301 1-501
        let b = document.querySelector(".Faza");
        let kat;
        let vr = b.options[b.selectedIndex].innerHTML;  // cetvrtfinale-0 polufinale-1 finale-1
        if(kriterijum===0){
            kat="501";
        }
        else{
            kat="301";
        }
        if(turnir===null || turnir===""){
            alert("Unesite ime turnira");
        }
        if(sudija===null || sudija===""){
            alert("Unesite broj licence sudije");
        }
        if(igrac1===null || igrac1===""){
            alert("Unesite broj registracije prvog igraca");
        }
        if(igrac2===null || igrac2===""){
            alert("Unesite broj registracije drugog igraca");
        }
        if(kat===null || kat===""){
            alert("Unesite ime turnira");
        }
        if(vr===null || vr===""){
            alert("Unesite ime turnira");
        }
        fetch("https://localhost:5001/Mec/DodajMecNaTurniru/"+vr+"/"+kat+"/"+turnir+"/"+sudija+"/"+igrac1+"/"+igrac2,{
            method : "POST"
        }).then(s => {
            if(s.status==200){
                alert("Uspesno dodat mec na turniru " + turnir);
            }
            else{
                alert("Pogresno uneti podaci, pokusajte ponovo");
            }
        })
    }
    crtajMecFormaPregledaj(host){
        let d = ["MecFormaPregledajPodaci","MecFormaPregledajDugme"];
        this.crtajDivove(d,host);

        let d1 = document.querySelector(".MecFormaPregledajPodaci");
        let d2 = document.querySelector(".MecFormaPregledajDugme");

        this.crtajMecFormaPregledajPodaci(d1);
        this.crtajMecFormaPregledajDugme(d2);

    }
    crtajMecFormaPregledajPodaci(host){
        let p = document.createElement("div");
        p.innerHTML = "Pregledaj meceve ";
        host.appendChild(p);

        p = document.createElement("h4");
        p.innerHTML = "Faza :";
        host.appendChild(p);
        let faza = ["Cetvrtfinale","Polufinale","Finale"];
        faza.forEach((el,ind) => {
            let l = document.createElement("label");
            l.innerHTML = el;
            host.appendChild(l);
            l=document.createElement("input");
            l.type = "radio";
            l.name = "Faza";
            l.value=ind;
            host.appendChild(l);
        })
        p = document.createElement("h4");
        p.innerHTML = "Kateogrija :";
        host.appendChild(p);
        let kat = ["301","501"];
        kat.forEach((el,ind) => {
            let l = document.createElement("label");
            l.innerHTML = el;
            host.appendChild(l);
            l=document.createElement("input");
            l.type = "radio";
            l.name ="Kateogrija";
            l.value=ind;
            host.appendChild(l);
        })
    }
    crtajMecFormaPregledajDugme(host){
        let d = ["Pregledaj"];
        this.crtajDugmice(d,host);

        let rod = document.querySelector(".MecFormaPregledajDugme");
        let dete = rod.firstChild;

        dete.onclick=(ev)=>this.pregledajMeceve();
    }
    pregledajMeceve(){
        let faza = document.querySelector('input[name="Faza"]:checked').value;// 0-cetvrtfinale 1-polufinale 2-finale
        let kategorija = document.querySelector('input[name="Kateogrija"]:checked').value; // 0-301 1-501
        let f,k;
        if(kategorija==0){
            k="301";
        }
        else{
            k="501";
        }
        if(faza==0){
            f="Cetvrtfinale";
        }
        else if(faza==1){
            f="Polufinale";
        }
        else{
            f="Finale";
        }
        fetch("https://localhost:5001/Mec/PregledMecevaPoKategorijiFazi/"+k+"/"+f,{
             method : "GET"
        }).then(s => {
            if(s.status===200){
                this.obrisiMecTabelu();
                this.napraviMecTabelu();
                s.json().then(data => {
                        data.forEach(m => {
                        let mec = new Mec(m.faza,m.kategorija,m.sudija,m.turnir)
                        mec.popuniTabelu();
                    })
                })
            }
            else{
                alert("Grska pri unosu kategorije, pokusajte ponovo");
            }
        })
    }
    obrisiMecTabelu(){
        let rod = document.querySelector(".MecPrikaz");
        let dete =rod.firstChild;
        rod.removeChild(dete);
    }
    napraviMecTabelu(){
        let div = document.querySelector(".MecPrikaz");

        let t = document.createElement("table");
        div.appendChild(t);

        let th = document.createElement("thead");
        t.appendChild(th);

        let tb = document.createElement("tbody");
        tb.className = "MeceviBody";
        t.appendChild(tb);

        let tr = document.createElement("tr");
        th.appendChild(tr);

        let td = document.createElement("td");
        td.innerHTML = "Faza";
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "Kategorija";
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "Sudija";
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = "Turnir";
        tr.appendChild(td);


    }
    //---------------------------------------------------------------------------------------SUDIJA------------------------------------------------------------------------------------
    //CRTANJE DELA ZA SUDIJE
    crtajSudija(host){
        let d = ["SudijaNaziv","SudijaForma","SudijaPodaci"];
        this.crtajDivove(d,host);

        d = document.querySelector(".SudijaNaziv");
        d.innerHTML = "Sudija";

        d = document.querySelector(".SudijaForma");
        this.crtajSudijaForma(d);
    }
    crtajSudijaForma(host){
        let d = ["SudijaFormaDodaj","SudijaFormaPromeni"];
        this.crtajDivove(d,host);

        let d1 = document.querySelector(".SudijaFormaDodaj");
        let d3 = document.querySelector(".SudijaFormaPromeni");

        this.crtajSudijaFormaDodaj(d1);
        this.crtajSudijaFormaPromeni(d3);
    }
    crtajSudijaFormaDodaj(host){
        let d = ["SudijaFormaDodajPodaci","SudijaFormaDodajDugme"];
        this.crtajDivove(d,host);

        let d1 = document.querySelector(".SudijaFormaDodajPodaci");
        let d2 = document.querySelector(".SudijaFormaDodajDugme");

        this.crtajSudijaFormaDodajPodaci(d1);
        this.crtajSudijaFormaDodajDugme(d2);

    }
    crtajSudijaFormaDodajPodaci(host){
        let d = ["SudijaFormaDodajPodaciLabela","SudijaFormaDodajPodaciUpis"];
        this.crtajDivove(d,host);

        let d1 = document.querySelector(".SudijaFormaDodajPodaciLabela");
        let d2 = document.querySelector(".SudijaFormaDodajPodaciUpis");

        this.crtajSudijaFormaDodajPodaciLabela(d1);
        this.crtajSudijaFormaDodajPodaciUpis(d2);
    }
    crtajSudijaFormaDodajPodaciLabela(host){
        let l = ["Broj licence","Ime","Prezime","Mail"];
        this.crtajLabele(l,host);
    }
    crtajSudijaFormaDodajPodaciUpis(host){
        let klase = ["SudijaDodajLicenca","SudijaDodajIme","SudijaDodajPrezime","SudijaDodajMail"];
        for(let i=0;i<4;i++){
            let u = document.createElement("input");
            if(i==0){
                u.type="number";
            }
            else{
                u.type = "text";    
            }
            u.className=klase[i];
            host.appendChild(u);
        }
    }
    crtajSudijaFormaDodajDugme(host){
        var d = ["Dodaj"];
        this.crtajDugmice(d,host);

        let rod = document.querySelector(".SudijaFormaDodajDugme");
        let dete = rod.firstChild;

        let licenca = document.querySelector(".SudijaDodajLicenca");
        let ime = document.querySelector(".SudijaDodajIme");
        let prezime = document.querySelector(".SudijaDodajPrezime");
        let mail = document.querySelector(".SudijaDodajMail");

        dete.onclick=(ev)=>this.dodajSudiju(licenca.value,ime.value,prezime.value,mail.value);

    }
    dodajSudiju(licenca,ime,prezime,mail){
        if(licenca===null || licenca===""){
            alert("Unesite broj licence");
        }
        if(ime===null || ime===""){
            alert("Unesite ime");
        }
        if(prezime===null || prezime===""){
            alert("Unesite prezime");
        }
        if(mail===null || mail===""){
            alert("Unesite mail");
        }
        fetch("https://localhost:5001/Sudija/DodavanjeSudije/"+licenca+"/"+ime+"/"+prezime+"/"+mail,{
            method : "POST"
        }).then(s => {
            if(s.status===200){
                alert("Sudija "+ime+ " " + prezime + " uspesno dodat");
            }
            else{
                alert("Nevalidno uneti podaci pokusajte ponovo");
            }
        })
    }  
    crtajSudijaFormaPromeni(host){
        let d = ["SudijaFormaPromeniPodaci","SudijaFormaPromeniDugme"];
        this.crtajDivove(d,host);

        let d1 = document.querySelector(".SudijaFormaPromeniPodaci");
        let d2 = document.querySelector(".SudijaFormaPromeniDugme");

        this.crtajSudijaFormaPromeniPodaci(d1);
        this.crtajSudijaFormaPromeniDugme(d2);
    }
    crtajSudijaFormaPromeniPodaci(host){
        let d = ["SudijaFormaPromeniPodaciLabela","SudijaFormaPromeniPodaciUpis"];
        this.crtajDivove(d,host);

        let d1 = document.querySelector(".SudijaFormaPromeniPodaciLabela");
        let d2 = document.querySelector(".SudijaFormaPromeniPodaciUpis");

        this.crtajSudijaFormaPromeniPodaciLabela(d1);
        this.crtajSudijaFormaPromeniPodaciUpis(d2);
    }
    crtajSudijaFormaPromeniPodaciLabela(host){
        let l = ["Broj licence","Novi mail"];
        this.crtajLabele(l,host);
    }
    crtajSudijaFormaPromeniPodaciUpis(host){
        let klase =["SudijaPromeniId","SudijaPromeniMail"];
        for(let i=0;i<2;i++){
            let u = document.createElement("input");
            if(i==0){
                u.type = "number";
            }
            else{
                u.type="text";
            }
            u.className=klase[i];
            host.appendChild(u);
        }
    }
    crtajSudijaFormaPromeniDugme(host){
        let dugmici = ["Promeni","Obrisi sudiju"];
        dugmici.forEach((el,ind) => {
            let b = document.createElement("button");
            b.innerHTML=el;
            b.className ="Dugme";
            b.id = "sudija"+ind;
            host.appendChild(b);
        })
        let d1 = document.getElementById("sudija0");
        let d2 = document.getElementById("sudija1");

        
        let id = document.querySelector(".SudijaPromeniId");
        let mail = document.querySelector(".SudijaPromeniMail");

        d1.onclick=(ev)=>this.promeniSudiju(id.value,mail.value);
        d2.onclick=(ev)=>this.obrisiSudiju(id.value);
    }
    promeniSudiju(id,mail){
        if(id===null || id===""){
            alert("Unesite broj licence sudije");
        }
        if(mail===null || mail===""){
            alert("Unesite novi mail sudije");
        }
        fetch("https://localhost:5001/Sudija/IzmeniMailSudije/"+id+"/"+mail,{
            method:"PUT"
        }).then(s=> {
            if(s.status===200){
                alert("Uspesno promenjen mail");
            }
            else{
                alert("Neispravno uneti podaci, pokusajte ponovo");
            }
        })
    }
    obrisiSudiju(licenca){
        if(licenca===null || licenca===""){
            alert("Unesite broj licence");
        }
        fetch("https://localhost:5001/Sudija/ObrisiSudiju/"+licenca,{
            method:"DELETE"
        }).then(s => {
            if(s.status===200){
                alert("Sudija uspesno obrisan");
            }
            else{
                alert("Greska prilikom brisanja, pokusajte ponovo");
            }
        })
    }
}
