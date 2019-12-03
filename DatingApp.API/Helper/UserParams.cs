namespace DatingApp.API.Helper
{
    // info send back from client to server by this class 
    // will we use it with Controller & Reposetry
    public class UserParams
    {
        private const int MaxPageSize =50;
        public int PageNumber { get; set; } = 1; // always request the first page 
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value ;}
        }

        public int UserId { get; set; }
        public string Gender { get; set; }
        public int minAge { get; set; } = 18;
        public int maxAge { get; set; } = 99;
        public string OrderBy { get; set; }
    }
}