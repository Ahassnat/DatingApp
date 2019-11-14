
// this code its Available in asp.net Core2.2 , and not added to asp.net core2.1



 using Microsoft.AspNetCore.Http;

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
     }
 }