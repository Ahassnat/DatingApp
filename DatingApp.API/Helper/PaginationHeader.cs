namespace DatingApp.API.Helper
{
    // the information we pass to Http respose Header
    public class PaginationHeader
    {
        public int CurrentPage { get; set; }
        public int ItemPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }

        // the data will send in the header
        public PaginationHeader (int currentPage, int itemPerPage, int totalItems, int totalPages)
        {
            this.CurrentPage =currentPage;
            this.ItemPerPage = itemPerPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
        }
    }
}