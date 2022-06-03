namespace ContaCentral.Domain.Models.DTOs
{
    public class SearchDTO
    {
        public string SearchString { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }

}
