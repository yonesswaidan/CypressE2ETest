using CypressE2ETest.Data;
using CypressE2ETest.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

public class UserService
{
    private readonly ApplicationDbContext _context;

    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> RegisterUserAsync(string username, string password)
    {
        if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            return false;

        bool userExists = await _context.Users.AnyAsync(u => u.Username == username);
        if (userExists)
            return false;

        var user = new User
        {
            Username = username,
            PasswordHash = ComputeSha256Hash(password),
            CreatedAt = DateTime.Now
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ValidateUserAsync(string username, string password)
    {
        if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            return false;

        var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == username);
        if (user == null)
            return false;

        var hashedInputPassword = ComputeSha256Hash(password);
        return user.PasswordHash == hashedInputPassword;
    }

    private string ComputeSha256Hash(string rawData)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(rawData));
        return Convert.ToHexString(bytes);
    }
}
