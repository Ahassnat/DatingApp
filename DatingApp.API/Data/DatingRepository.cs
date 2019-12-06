using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Helper;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            return await _context.Likes.FirstOrDefaultAsync(u => 
                u.LikerId == userId && u.LikeeId == recipientId );
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var Photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return Photo;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p=>p.Photos).FirstOrDefaultAsync(u=>u.Id==id);
            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users= _context.Users.Include(p=>p.Photos).OrderByDescending(u => u.LastActive).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId); // check the logedin user and retuen all the ather users 
            users = users.Where(u => u.Gender == userParams.Gender); // fillter on Gender proparity

            if (userParams.minAge != 18 || userParams.maxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.maxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.minAge);

                users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob); // filltering in dateOfBirth proparity
            }
            if(!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                         users = users.OrderByDescending(u => u.Created);
                         break;
                    default:
                         users = users.OrderByDescending(u => u.LastActive);
                         break;
                }
            }
          
            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync()>0;
        }
    }
}