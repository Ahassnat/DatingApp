using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Helper
{
    //List for paging information 
    public class PagedList<T>: List<T>
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            TotalCount = count;
            PageSize = pageSize;
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            this.AddRange(items); //AddRange its function of List return An object that acts as a read-only wrapper around the current List 
        }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, // IQueryable => its  Create Exeprssion Tree and some function like Skip,Take
         int pageNumber, int pageSize) 
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageNumber -1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items,count,pageNumber,pageSize);
        } 

    }
}