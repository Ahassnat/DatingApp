using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dots
{
    public class UserForLoginDto
    {
          [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="You must spacify password between 4 to 8")] 
        public string Password { get; set; }
    }
}