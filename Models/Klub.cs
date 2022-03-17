using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Klub
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(50)]
        [Required]
        public String Ime { get; set; }

        [Required]
        [MaxLength(50)]
        public String Sajt { get; set; }


        [MaxLength(50)]
        [Required]
        public String Mejl { get; set; }

        [MaxLength(50)]
        [Required]
        public String Mesto { get; set; }

        [JsonIgnore]
        public List<Igrac> igraciKluba { get; set; }
        [JsonIgnore]
        public List<Turnir> organizovaniTurniri { get; set; }
        
    }
}