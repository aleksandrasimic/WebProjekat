using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Porudzbina")]
    public class Porudzbina 
    {
        [Key]
        [Column("ID")]
        public int IDPorudzine {get; set;}

        [Column("Jelovnik")]
        [MaxLength(50)]
        public string Jelovnik {get; set;}

        [Column("Napici")]
        [MaxLength(50)]
        public string Napici {get; set;}

        [JsonIgnore]
        public Picerija Picerija {get; set;}

    }
}