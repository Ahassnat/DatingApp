using System;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x=>x.Username==username);
            if(user==null) return null;

            if(!VerifyPasswordHash(password,user.PasswordSalt,user.PasswordHash))
            return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordSalt, byte[] passwordHash)
        {
            using(var hmac=new System.Security.Cryptography.HMACSHA512(passwordSalt)){
                var ComputeHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));//Change password from string to array of byte
                for (int i = 0; i < ComputeHash.Length; i++)
                {
                    if(ComputeHash[i]!=passwordHash[i]) return false;
                }
               
            }
             return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash,passwordSalt;
            //الداله هاد لصنع الهاش والسولت هتاخد الباسوورد وتخرج الهاش والسولت 
            //out --> mean we have an output from the function
            CreatePasswordHash(password,out passwordHash,out passwordSalt);
            user.PasswordSalt=passwordSalt;
            user.PasswordHash=passwordHash;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            #region  expane the using
            //using 
            // استخدمنها لانو لو رحنا للدفنيشن تاع الهاش512 هنلاقي انها بترث من 
            //Disposed
            //وهاد معناه انو لازم نستخدم 
            //using 
            //عشان نضل داخل السكوب تاعها 
         #endregion
            using(var hmac=new System.Security.Cryptography.HMACSHA512()){
                passwordSalt=hmac.Key;//randomly generated key.
                passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));//Change password from string to array of byte

            }
            
        }

        public async Task<bool> UserExists(string username)
        {
            if(await _context.Users.AnyAsync(x=>x.Username==username))return true;
            return false;
        }
    }
}