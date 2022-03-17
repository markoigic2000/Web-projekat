using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Sudija
    {
        [Key]
        public int IDSudije { get; set; }
        
        [Required]
        public int brojLicence { get; set; }

        [MaxLength(50)]
        [Required]
        public String Ime { get; set; }

        [MaxLength(50)]
        [Required]
        public String Prezime { get; set; }

        [MaxLength(50)]
        [Required]
        public String  Mejl { get; set; }

        [JsonIgnore]
        public List<Mec> sudjeniMecevi { get; set; }
    }
}