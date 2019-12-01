
// this code its Available in asp.net Core2.2 , and not added to asp.net core2.1



using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace DatingApp.API.Helper
 {
     public static class Extensions
     {
         public static void AddApplictionError(this HttpResponse response, string message)
         {
             response.Headers.Add("Appliction-Error", message);
             response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
             response.Headers.Add("Access-Control-Allow-Origin","*");
         }

         public static void AddPagination(this HttpResponse response,
                                         int currentPage, int itemPerPage, int totalItems, int totalPages)
         {
             var paginationHeader = new PaginationHeader(currentPage,itemPerPage,totalItems,totalPages);
             response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader));
             response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
         }
         public static int CalculateAge(this DateTime theDateTime)
         {
            var age = DateTime.Today.Year - theDateTime.Year;
            if(theDateTime.AddYears(age)>DateTime.Today)
            {
                age--;
            }
            return age;
         }
     }
 }