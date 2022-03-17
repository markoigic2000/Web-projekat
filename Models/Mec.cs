using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Mec
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(30)]
        public String Faza { get; set; }
        [Required]
        [MaxLength(30)]
        public String  Kategorija { get; set; }

        [JsonIgnore]
        public List<Igrac> igraciMeca { get; set; }
        [JsonIgnore]
        public Sudija sudijaNaMecu { get; set; }
        [JsonIgnore]
        public Turnir mecNaTurniru { get; set; }
    }
}