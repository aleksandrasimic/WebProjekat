import {Picerija} from "./picerija.js";
import {Sto} from "./sto.js";
import {Porudzbina} from "./porudzbina.js";

fetch("https://localhost:5001/Picerija/PreuzmiPiceriju").then(p => {
p.json().then ( data=> {

    data.forEach( pic =>
        {    
            const p = new Picerija (pic.idPicerije, pic.naziv, pic.adresa, pic.kapacitetPicerije);

            p.crtajPiceriju(document.body);
            console.log(pic.idPicerije);

            pic.stolovi.forEach (s=> {
                var stoo=p.stolovi[s.brojStola];
                var porr=p.porudzbine[s.brojStola];

                stoo.zauzmiSto(s.brojStola);
                stoo.naruci(porr);
            })
    
        });

    });

});
