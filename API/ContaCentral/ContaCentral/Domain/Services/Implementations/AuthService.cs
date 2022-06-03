﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ContaCentral.Domain.Models.DTOs;
using ContaCentral.Domain.Models;
using ContaCentral.Infrastructure.Data.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ContaCentral.Domain.Services.Interfaces;
using ContaCentral.Infrastructure.Helper;
using System.Text.RegularExpressions;

namespace ContaCentral.Domain.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly UserRepository _userRepository;
        private readonly CarteiraRepository _carteiraRepository;

        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthService(CarteiraRepository carteiraRepository, UserRepository userRepository, IConfiguration configuration, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _carteiraRepository = carteiraRepository;

            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<List<ApplicationUser>> ListUsers()
        {
            List<ApplicationUser> listUsers = await _userRepository.ListUsers();

            return listUsers;
        }

        public async Task<ApplicationUser> GetUserById(Guid userId)
        {
            ApplicationUser user = await _userRepository.GetByIdAsync(userId);

            if (user == null)
                throw new ArgumentException("Usuário não existe!");

            return user;
        }

        public async Task<int> UpdateUser(ApplicationUser user)
        {
            ApplicationUser findUser = await _userRepository.GetByIdAsync(user.Id);
            if (findUser == null)
                throw new ArgumentException("Usuário não encontrado");

            findUser.Email = user.Email;
            findUser.UserName = user.UserName;

            return await _userRepository.UpdateAsync(findUser);
        }

        public async Task<bool> DeleteUser(Guid userId)
        {
            ApplicationUser findUser = await _userRepository.GetByIdAsync(userId);
            if (findUser == null)
                throw new ArgumentException("Usuário não encontrado");

            await _userRepository.DeleteAsync(findUser);

            return true;
        }

        public async Task<bool> SignUp(SignUpDTO signUpDTO)
        {
            var userExists = await _userManager.FindByNameAsync(signUpDTO.Username);
            if (userExists != null)
                throw new ArgumentException("Username already exists!");

            userExists = await _userManager.FindByEmailAsync(signUpDTO.Email);
            if (userExists != null)
                throw new ArgumentException("Email already exists!");

            signUpDTO.CPF = signUpDTO.CPF.Replace(".", "");
            signUpDTO.CPF = signUpDTO.CPF.Replace(" ", "");
            signUpDTO.CPF = signUpDTO.CPF.Replace("-", "");

            if (UtilsHelper.IsCpf(signUpDTO.CPF) == false)
                throw new ArgumentException("CPF inválido! Digite um cpf válido");


            userExists = await _userRepository.GetByCPFAsync(signUpDTO.CPF);
            if (userExists != null)
                throw new ArgumentException("CPF already exists!");

            ApplicationUser user;

            user = new ApplicationUser()
            {
                Email = signUpDTO.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = signUpDTO.Username,
                CPF = signUpDTO.CPF,
                Cep = signUpDTO.Cep,
                Endereco = signUpDTO.Endereco,
                Endereco2 = signUpDTO.Endereco2,
                DataNascimento = signUpDTO.DataNascimento,
                NomeCompleto = signUpDTO.NomeCompleto,
                PhoneNumber = signUpDTO.PhoneNumber
            };

            var result = await _userManager.CreateAsync(user, signUpDTO.Password);
            
            if (!result.Succeeded)
                if (result.Errors.ToList().Count > 0)
                    throw new ArgumentException(result.Errors.ToList()[0].Description);
                else
                    throw new ArgumentException("Cadastro do usuário falhou.");

            Carteira novaCarteira = new Carteira
            {
                Nome = "Carteira de " + user.UserName,
                Saldo = 0,
                UserId = user.Id,
                Ativo = true,
                Principal = true
            };

            await _carteiraRepository.CreateAsync(novaCarteira);

            return true;
        }

        public async Task<SsoDTO> SignIn(SignInDTO signInDTO)
        {
            var user = await _userManager.FindByNameAsync(signInDTO.Username);
            if (user == null)
                throw new ArgumentException("Usuário não encontrado.");

            if (!await _userManager.CheckPasswordAsync(user, signInDTO.Password))
                throw new ArgumentException("Senha inválida.");

            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return new SsoDTO(new JwtSecurityTokenHandler().WriteToken(token), token.ValidTo, user);
        }

        public async Task<ApplicationUser> GetCurrentUser()
        {
            var userId = _userManager.GetUserId(_httpContextAccessor.HttpContext.User); // Get user id:

            ApplicationUser user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);

            return user;
        }

    }
}