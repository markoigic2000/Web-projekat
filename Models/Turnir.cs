using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
public class Turnir
{
        [Key]
        public int ID { get; set; }

        [MaxLength(20)]
        [Required]
        public String Grad { get; set; }

        [Range(10,500)]
        [Required]
        public int brojBodova { get; set; }

        [MaxLength(100)]
        [Required]
        public String Naziv { get; set; }

        public DateTime datumOdrzavanja { get; set; }

        [Range(10000,500000)]
        [Required]
        public int nagradniFond { get; set; }

        [JsonIgnore]
        public Igrac Pobednik { get; set; }

        [JsonIgnore]
        public Klub organizatorTurnira { get; set; }
        [JsonIgnore]
        public List<Mec> meceviNaTurniru { get; set; }
    }
}