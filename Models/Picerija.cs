using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Picerija")]
    public class Picerija 
    {
        [Key]
        [Column("ID")]
        public int IDPicerije {get; set;}

        [Column("Naziv")]
        [MaxLength(50)]
        public string Naziv {get; set;}

        [Column("Adresa")]
        public string Adresa {get; set;}

        [Column("Kapacitet")]
        public int KapacitetPicerije {get; set;}

        public virtual List<Sto> Stolovi {get; set;}
        public virtual List<Porudzbina> Porudzbine {get; set;}    

    }
}