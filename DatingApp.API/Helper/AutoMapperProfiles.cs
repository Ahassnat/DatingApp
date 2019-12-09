using System.Linq;
using AutoMapper;
using DatingApp.API.Dots;
using DatingApp.API.Models;

namespace DatingApp.API.Helper
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles ()
        {
            CreateMap<User,UserForListDto>()
            .ForMember(dest=>dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
             .ForMember(dest => dest.Age, opt => {
                 opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
             });
            CreateMap<User,UserForDetailedDto>()
                .ForMember(dest=>dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
             .ForMember(dest => dest.Age, opt => {
                 opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
             });
            CreateMap<Photo,PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto,User>(); // for Editing users Detailes

            CreateMap<Photo,PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto,Photo>();

            CreateMap<UserForRegisterDto,User>(); // for registration Form After Expanding the form
           
            CreateMap<MessageForCreationDto, Message>().ReverseMap(); // to Create a new message

        }
    }
}