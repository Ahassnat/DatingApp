using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dots
{
    public class UserForLoginDto
    {
          [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="User Name or Password Not right")] 
        public string Password { get; set; }
    }
}