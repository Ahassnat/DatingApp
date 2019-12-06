namespace DatingApp.API.Models
{
    public class Like
    {
        public int LikerId { get; set; } // user he likes the Other users
        public int LikeeId { get; set; } // user how being liked from other users
        public User Liker { get; set; }
        public User Likee { get; set; } 

    }
}