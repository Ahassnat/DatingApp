using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Dots
{
    // What we Send to API 
    public class PhotoForCreationDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; } // IFromFile : its the Photo were will be Uploaded
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; } // what we get back from Cloudinary

        public PhotoForCreationDto()
        {
            DateAdded = DateTime.Now;
        }
   
    }
}