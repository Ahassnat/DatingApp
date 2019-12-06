using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> Options) : base(Options){}
        
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<Photo> Photos { get; set; }
        public DbSet<Like> Likes { get; set; }

        // override the Like Mode To make the Proprarty of(LikerId+LikeeId) as Primay Key
        // we use this function with the (Many-to-Many) Relationship
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Like>()
                .HasKey(k => new {k.LikerId, k.LikeeId}); // to make primary key

            builder.Entity<Like>()
                .HasOne(u => u.Likee) // being liked from other
                .WithMany(u => u.Likers) // the likers
                .HasForeignKey(u => u.LikeeId) // save in the LikeeId Cloum in Db as FK
                .OnDelete(DeleteBehavior.Restrict); // Restricit becase we dont want when the user delete the like delete also the user

            builder.Entity<Like>()
                .HasOne(u => u.Liker)
                .WithMany(u => u.Likees)
                .HasForeignKey(u => u.LikerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}