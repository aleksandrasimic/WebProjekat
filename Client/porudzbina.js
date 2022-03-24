import {Picerija} from "./picerija.js";
import {Sto} from "./sto.js";

export class Porudzbina {

    constructor (id, jelovnik, napici)
    {
        this.id = id;
        this.jelovnik = jelovnik;
        this.napici = napici;
        this.kontejnerPor = null;
    }

    vratiId ()
    {
        return this.id;
    }

    vratiJelovnik ()
    {
        return this.jelovnik;
    }

    vratiNapitak ()
    {
        return this.napici;
    }

}