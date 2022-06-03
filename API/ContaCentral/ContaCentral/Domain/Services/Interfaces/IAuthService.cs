using ContaCentral.Domain.Models;
using ContaCentral.Domain.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Services.Interfaces
{
    public interface IAuthService
    {
        Task<List<ApplicationUser>> ListUsers();
        Task<ApplicationUser> GetUserById(Guid userId);
        Task<int> UpdateUser(ApplicationUser user);
        Task<bool> DeleteUser(Guid userId);
        Task<bool> SignUp(SignUpDTO signUpDTO);
        Task<SsoDTO> SignIn(SignInDTO signInDTO);
        Task<ApplicationUser> GetCurrentUser();
    }
}
