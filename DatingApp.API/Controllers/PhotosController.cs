using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Dots;
using DatingApp.API.Helper;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinay;

        public PhotosController(IDatingRepository repo, IMapper mapper,
        IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            // make Account From CloudinaryDotNet Package
            // that 3 setting call it from appsetting.json 
            Account acc = new Account(
                cloudinaryConfig.Value.CloudName,
                cloudinaryConfig.Value.ApiKey,
                cloudinaryConfig.Value.ApiSecret
            );

            _cloudinay = new Cloudinary(acc);

        }
        [HttpGet("{id}", Name ="GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);
            
            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);

        }

        [HttpPost]
                                                    //we user [FromForm] becuse we use it in the post man 
        public async Task<IActionResult> AddPhotoForUser(int userId,[FromForm]PhotoForCreationDto photoForCreationDto)
        {   
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);

            var file = photoForCreationDto.File; // create file 

            var uploadResulet = new ImageUploadResult(); // store reselt will come back from cloudinary

            if(file.Length > 0) // Check if its impty file
            {
                // becuse its file stream we use => using - to desposed the method from memory after finish 
                using(var stream = file.OpenReadStream()) // OpenReadStream() => read our uploaded file in the memory
                {
                    var uploadParams = new ImageUploadParams() 
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResulet = _cloudinay.Upload(uploadParams);
                }
            }
            photoForCreationDto.Url = uploadResulet.Uri.ToString();
            photoForCreationDto.PublicId = uploadResulet.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if(!userFromRepo.Photos.Any(u => u.IsMain))
                photo.IsMain = true;
                
            userFromRepo.Photos.Add(photo);

            if(await _repo.SaveAll())
            {
                var photoToReturn =_mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto",new {id = photo.Id}, photoToReturn);
            }

                
            return BadRequest("Could not add the Photo");

        }
}
}