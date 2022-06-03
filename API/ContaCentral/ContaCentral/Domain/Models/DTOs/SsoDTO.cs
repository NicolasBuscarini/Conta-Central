using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Models.DTOs
{
    public class SsoDTO
    {
        public string access_token { get; set; }
        public DateTime expiration { get; set; }
        public ApplicationUser user { get; set; }

        public SsoDTO(string access_token, DateTime expiration, ApplicationUser user)
        {
            this.access_token = access_token;
            this.expiration = expiration;
            this.user = user;
        }
    }
}
