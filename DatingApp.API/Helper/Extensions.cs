
// this code its Available in asp.net Core2.2 , and not added to asp.net core2.1



using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

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

         // will send this data by header response to clinet side 
         public static void AddPagination(this HttpResponse response,
                     int currentPage, int itemPerPage, int totalItems, int totalPages)
         {
             var paginationHeader = new PaginationHeader(currentPage,itemPerPage,totalItems,totalPages); // Constractor from class PaginationHeader 
             
             // camelCaseFormatter this function is simple its just to change the format for parameter 
             // from (title formal) => like this TitleFormat to (camel Format) =>  like this camelFormat 
             var camelCaseFormatter = new JsonSerializerSettings();
             camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();

             response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
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