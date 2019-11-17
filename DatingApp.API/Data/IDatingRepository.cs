using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
        // T mean Type Of the Class here we mean User Or Photo Class
        // we use Add,Delete Function To over Write More Method to Every Class will may be Class of User Or Class Of Photo
         void Add<T>(T entity)  where T: class; 
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
    }
}