import {Sto} from "./sto.js";
import {Porudzbina} from "./porudzbina.js";

export class Picerija {

    constructor (id, naziv, adresa, kapacitet)
    {
        this.id = id;
        this.naziv = naziv;
        this.adresa = adresa;
        this.kapacitet = kapacitet;  //tj. broj stolova

        this.stolovi = [];
        this.porudzbine = [];

        this.kontejner = null;
    }

    dodajPorudzbinu(por)
    {
        this.porudzbine.push(por);
    }

    dodajSto(sto)
    {
        this.stolovi.push(sto);
    }

    crtajPiceriju (host)
    {
        if (!host)
            throw new Exception ("Roditeljski element ne postoji");


        this.crtajNaslov (host);

        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kontejner");
        host.appendChild(this.kontejner);    

        this.crtajFormu(this.kontejner);
        this.crtajStolove(this.kontejner);

    }

    crtajNaslov (host)
    {
        var prvo = document.createElement ("div");
        prvo.className = "prvo"
        host.appendChild (prvo);

        var veci = document.createElement ("h1");
        veci.className = "naslovVeci";
        veci.innerHTML = this.naziv;
        prvo.appendChild (veci);

        var manji = document.createElement("h3");
        manji.className = "naslovManji"
        manji.innerHTML = this.adresa;
        prvo.appendChild (manji);

    }

    crtajFormu(host)
    {
        //PRVA FORMA

        var kontForma = document.createElement ("div");
        kontForma.className = "klasa"
        host.appendChild (kontForma);

        var kontForma1 = document.createElement ("div");
        kontForma.appendChild (kontForma1);
        kontForma1.className = "kontForma";   

        //naslov
        var naslov = document.createElement ("h3");
        naslov.innerHTML = "Rezervišite sto";
        naslov.className = "naslov";  
        kontForma1.appendChild (naslov);

        //br. stola
        var labela = document.createElement ("label");
        labela.innerHTML = "Broj stola";
        labela.className = "labele"; 
        kontForma1.appendChild (labela);

        let unos = document.createElement ("input");
        unos.className= "broj";   
        kontForma1.appendChild (unos);

        //ime
        labela = document.createElement ("label");
        labela.innerHTML = "Ime";
        labela.className = "labele";  
        kontForma1.appendChild (labela);

        unos = document.createElement ("input");
        unos.className = "ime";   
        kontForma1.appendChild (unos);

        //prezime
        labela = document.createElement("label");
        labela.innerHTML = "Prezime"
        labela.className = "labele";  
        kontForma1.appendChild (labela);

        unos = document.createElement ("input");
        unos.className = "prezime";   
        kontForma1.appendChild (unos);

        //broj ljudi
        labela = document.createElement ("label");
        labela.innerHTML = "Broj ljudi"
        labela.className = "labele";  
        kontForma1.appendChild (labela);

        unos = document.createElement ("input");
        unos.className= "brojLjudi"; 
        kontForma1.appendChild (unos);

        //DRUGA FORMA

        var kontForma2 = document.createElement ("div");
        kontForma.appendChild (kontForma2);
        kontForma2.className = "kontForma";   

        //naslov
        naslov = document.createElement ("h3");
        naslov.innerHTML = "Poručite";
        naslov.className = "naslov";    
        kontForma2.appendChild (naslov);

        //br. stola
        labela = document.createElement("label");
        labela.innerHTML = "Broj stola"
        labela.className = "labele"; 
        kontForma2.appendChild (labela);

        unos = document.createElement ("input");
        unos.className = "brooj";   
        kontForma2.appendChild (unos);

        //jelovnik i napici

        let jelovnik = ["","Margarita", "Kaprićoza", "Vezuvio", "Fungi", "Sicilijana", "Napolitana"];
        let napici = ["", "Voda", "Sok","Limunada", "Kafa", "Topla čokolada"];

        let selJ = document.createElement ("select");
        selJ.className = "selekt";

        labela = document.createElement ("label");
        labela.innerHTML = "Jelovnik";
        labela.className = "labele"

        kontForma2.appendChild (labela);
        kontForma2.appendChild (selJ);

        for (let i = 0; i < 7; i++)
        {
            let opcija = document.createElement ("option");
            opcija.innerHTML = jelovnik[i];
            opcija.value= jelovnik[i];
            selJ.appendChild (opcija);
        }

        let selN = document.createElement ("select");
        selN.className = "selekt";

        labela = document.createElement ("label");
        labela.innerHTML = "Napici";
        labela.className = "labele"

        kontForma2.appendChild(labela);
        kontForma2.appendChild(selN);

        for(let i = 0; i < 6; i++)
        {
            let opcija = document.createElement ("option");
            
            opcija.innerHTML = napici[i];
            opcija.value = napici[i];
            selN.appendChild (opcija);
        }

        //dugmići:

        //za rezervaciju
           
        dugme = document.createElement ("button");
        dugme.innerHTML = "Zauzmi sto";
        dugme.className = "dugme";
        kontForma1.appendChild(dugme);

        dugme.onclick = (ev) => {

            const ime = kontForma1.querySelector(".ime").value;       
            console.log (ime);

            const prezime = kontForma1.querySelector(".prezime").value;
            console.log (prezime);

            const bro = kontForma1.querySelector(".broj").value;               
            console.log (bro);

            const brLjudi = kontForma1.querySelector(".brojLjudi").value;
            console.log (brLjudi);

            console.log(this.id);


           if (bro > this.kapacitet)
               alert ("Sto sa tim brojem ne postoji!");

          else
          {

            fetch("https://localhost:5001/Picerija/ZauzmiSto/" + this.id,{

                method:"POST",

                headers:
                {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify ({

                    brojStola:bro,
                    stanjeStola:"ZAUZET",
                    trenutniKapacitetStola:brLjudi,
                    maxKapacitetStola: 10,
                    ime:ime,
                    prezime:prezime
                    
                })
            
             }).then( p => {
                if (p.ok)
                {
                  
                   this.stolovi[bro].zauzmiSto(bro, brLjudi);    
                   console.log(this.stolovi[bro]);                       
                    
                }
         
                })

            }

            
        }


        //za brisanje

        dugme = document.createElement("button");
        dugme.innerHTML = "Oslobodi sto";
        dugme.className = "dugme"
        kontForma1.appendChild (dugme);

        dugme.onclick = (ev) => {

            const bro = kontForma1.querySelector(".broj").value;               
            console.log(bro);            
            
            fetch("https://localhost:5001/Picerija/OslobodiSto/" + bro + "/" + this.id,{

                        method: "DELETE"

                    }).then( resp => {
                        if(resp.ok){

                            this.stolovi[bro].oslobodiSto(bro);
                            console.log(this.stolovi[bro]);
                                              
                        }

                    }).catch ( err => {
                        console.log (err);
                 });         
            
        }

        //za izmenu

        dugme = document.createElement ("button");
        dugme.innerHTML = "Izmeni rezervaciju";
        dugme.className = "dugme"
        kontForma1.appendChild(dugme);

        dugme.onclick = (ev) => {

            const ime = kontForma1.querySelector(".ime").value;       
            console.log(ime);

            const prezime = kontForma1.querySelector(".prezime").value;
            console.log(prezime);

            const bro = kontForma1.querySelector(".broj").value;               
            console.log(bro);

            const brLjudi = kontForma1.querySelector(".brojLjudi").value;
            console.log (brLjudi);

            fetch("https://localhost:5001/Picerija/IzmeniSto/"+ bro + "/" + ime + "/" + prezime + "/" + brLjudi,{

                method: "PUT"

            }).then(resp=>{

                if(resp.ok){

                    this.stolovi[bro].izmeniSto(ime, prezime, brLjudi);
                    console.log(this.stolovi[bro]);
                }

             }).catch( err => {
                  console.log(err);
             });

        }

        //za porucivanje

        var dugme = document.createElement ("button");
        dugme.innerHTML = "Poruči";
        dugme.className = "dugme"
        kontForma2.appendChild(dugme);

        dugme.onclick = (ev) => {

            const br = kontForma2.querySelector(".brooj").value;               
            console.log (br);

            const jeloovnik = selJ.value;       
            console.log (jeloovnik);

            const naapici = selN.value;
            console.log (naapici);

            let por = new Porudzbina (br, jeloovnik, naapici)


           if (br > this.kapacitet)

               alert("Sto sa tim brojem ne postoji!");

            else{

                fetch("https://localhost:5001/Picerija/DodajPorudzbinu/" + this.id,{

                        method:"POST",

                        headers:{
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify({

                            id:br,
                            jelovnik:jeloovnik,
                            napici:naapici,
                            
                        })

                        }).then(p=>{
                            if(p.ok)
                            {
                                console.log(this.stolovi[br]);
                                this.stolovi[br].naruci(por);
                        
                            }

                        }) 



            }
        
           
            
        }        

    }

    crtajStolove(host)
    {
        console.log(this.kapacitet);
        const kontStolovi = document.createElement("div");
        kontStolovi.className = "kontStolovi";
        host.appendChild(kontStolovi);

        let stoll;
        let por;

        for(let i = 0; i < this.kapacitet; i++)
        {

            stoll = new Sto(i, "SLOBODAN", " "," ");
            this.dodajSto(stoll);

            por = new Porudzbina(i, "", "");
            this.dodajPorudzbinu(por);
            
            stoll.crtajSto(kontStolovi);                   
        }

    }   

}