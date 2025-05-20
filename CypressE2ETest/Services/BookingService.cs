using CypressE2ETest.Data;
using CypressE2ETest.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class BookingService
{
    private readonly ApplicationDbContext _context;

    public BookingService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> CreateBookingAsync(string username, DateTime startDate, DateTime endDate, int guests)
    {
        if (string.IsNullOrWhiteSpace(username) || guests <= 0 || endDate < startDate)
            return false;

        var booking = new Booking
        {
            Username = username,
            StartDate = startDate,
            EndDate = endDate,
            NumberOfGuests = guests,
            CreatedAt = DateTime.Now
        };

        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<List<Booking>> GetUserBookingsAsync(string username)
    {
        return await _context.Bookings
            .AsNoTracking()
            .Where(b => b.Username == username)
            .ToListAsync();
    }
}
