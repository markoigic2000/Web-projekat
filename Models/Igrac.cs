using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Igrac
    {
        [Key]
        public int IDIgraca { get; set; }
        
        [Required]
        public int brojRegistracije { get; set; }

        [MaxLength(50)]
        [Required]
        public String Ime { get; set; }

        [MaxLength(50)]
        [Required]
        public String Prezime { get; set; }

        [MaxLength(50)]
        [Required]
        public String Mail { get; set; }

        [Required]
        public DateTime datumRodjenja { get; set; }

        
        public int osvojeniTurniri { get; set; }

        public int osvojeniBodovi { get; set; }

        [JsonIgnore]
        public Klub klubIgraca { get; set; }
        [JsonIgnore]
        public List<Turnir> turniriIgraca { get; set; }

        [JsonIgnore]
        public List<Mec> meceviIgraca { get; set; }
        
    }
}