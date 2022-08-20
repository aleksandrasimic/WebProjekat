import {Porudzbina} from "./porudzbina.js";

export class Sto {

    constructor (brojStola, stanjeStola, maxKapacitetStola, ime, prezime)
    {
        this.brojStola = brojStola;
        this.stanjeStola = stanjeStola;
        this.maxKapacitetStola = maxKapacitetStola;  
        this.trenutniKapacitetStola = 0;
        this.ime = ime;
        this.prezime = prezime;

        this.kontejnerSto = null;
    }


    vratiBoju()
    {
        if (this.stanjeStola == "SLOBODAN")

            return "rgb(229, 177, 177)" ;

        else

            return "rgb(165, 59, 59)";
    }

    crtajSto(host)
    {
        if(!host)
            throw new Exception ("Roditeljski element ne postoji");

            
        this.kontejnerSto = document.createElement("div");
        this.kontejnerSto.className = "sto";
        this.kontejnerSto.innerHTML = this.brojStola + " SLOBODAN";
        this.kontejnerSto.style.backgroundColor = this.vratiBoju();
        host.appendChild(this.kontejnerSto);        
    }

    zauzmiSto(brStola, trKapacitet)
    {
       if (this.stanjeStola === "ZAUZET")
            alert("Nije moguće zauzeti sto!");
        else 
        {
            this.brojStola = brStola;
            this.stanjeStola = "ZAUZET";
            this.maxKapacitetStola = 10;
            this.trenutniKapacitetStola = trKapacitet;
            this.kontejnerSto.innerHTML = this.brojStola + " ZAUZET";
            this.kontejnerSto.style.backgroundColor = this.vratiBoju();            
        }
        
    }

    naruci (por)
    {
        if (this.stanjeStola === "SLOBODAN")
            alert("Nije moguće naručiti!");

        else
        {
            let dugmeInfo = document.createElement("button");
            dugmeInfo.className = "dugmeInfo";
            dugmeInfo.innerHTML = "Info";
            this.kontejnerSto.appendChild(dugmeInfo);
            dugmeInfo.onclick = (ev) => {
                alert ("Porudžbina broj " + por.vratiId() + "\nJelovnik: " + por.vratiJelovnik() + " \nNapici: " + por.vratiNapitak());
            } 

        }

    }

    oslobodiSto (br)
    {
        this.stanjeStola = "SLOBODAN";
        this.trenutniKapacitet = 0;
        this.kontejnerSto.innerHTML = br + " SLOBODAN";
        this.kontejnerSto.style.backgroundColor = this.vratiBoju();   

    }

    izmeniSto (ime, prez, trKap)
    {
        if (this.maxKapacitetStola < trKap)
            alert("Nije moguće izmeniti sto!");
        else 
        {
            this.ime = ime;
            this.prezime = prez;
            this.trenutniKapacitetStola = trKap;        
        }
    }

}