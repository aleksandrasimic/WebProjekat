using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Sto")]
    public class Sto
    {
        [Key]
        [Column("ID")]
        public int IDStola {get; set;}

        [Column("Broj")]
        public int BrojStola {get; set;}

        [Column("Stanje")]
        [MaxLength(20)]
        public string StanjeStola {get; set;}

        [Column("TrenutniKapacitet")]
        public int TrenutniKapacitetStola {get; set;}

        [Column("MaxKapacitet")]
        [Range(2, 10)]
        public int MaxKapacitetStola {get; set;}

        [Column("Ime")]
        [MaxLength(50)]
        public string Ime {get; set;}

        [Column("Prezime")]
        [MaxLength(50)]
        public string Prezime {get; set;}        
        
        [JsonIgnore]
        public Picerija Picerija {get; set;}

    }
}