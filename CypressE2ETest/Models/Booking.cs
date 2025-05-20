using System;
using System.ComponentModel.DataAnnotations;

namespace CypressE2ETest.Models
{
    public class Booking
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required(ErrorMessage = "Startdato er påkrævet")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "Slutdato er påkrævet")]
        public DateTime EndDate { get; set; }

        [Required]
        [Range(1, 100, ErrorMessage = "Antal gæster skal være mellem 1 og 100")]
        public int? NumberOfGuests { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
