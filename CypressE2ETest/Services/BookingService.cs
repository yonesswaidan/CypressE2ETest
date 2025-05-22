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
            StartDate = startDate.Date,
            EndDate = endDate.Date,
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
    public async Task<bool> AreDatesAvailableAsync(DateTime startDate, DateTime endDate)
    {
        var overlaps = await _context.Bookings
            .AsNoTracking()
            .Where(b => (startDate.Date <= b.EndDate.Date && endDate.Date >= b.StartDate.Date))
            .ToListAsync();

        Console.WriteLine($"Checking overlaps from {startDate.Date} to {endDate.Date}. Overlaps found: {overlaps.Count}");

        return overlaps.Count == 0;
    }
}
