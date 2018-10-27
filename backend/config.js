const playlists = {
  rock: [
    '7KMtxb9kh3TtVvJTdLtJ2K',
    '4QzSmUQnOrJhmTHY2OgC1I',
    '1kBwzTImF0Gmb6vMv4G64s',
    '0JukVz9G0359k19WouJ5qZ'
  ],
  rock_argentino: [
    '20bT1rEyFRiwNL2njM53pa',
    '62aimwaktady1KHFUiL9Ry',
    '497X7Qwo7tkzk3q7hQKyeL',
    '37i9dQZF1DWTMU14XJYy0g'
  ],
  top_argentino: ['3rZxxXCtmadQUjaUe9VGIw', '37i9dQZEVXbMMy2roB9myp'],
  top_global: ['37i9dQZEVXbMDoHDwVN2tF', '37i9dQZF1DXcBWIGoYBM5M'],
  pop: [
    '5tIkO3qnEYSRYnEs1jgP8x',
    '2YRe7HRKNRvXdJBp9nXFza',
    '251QjcN3palsj5z8GTdCdL',
    '6W0Zrtc9pUiXk32Fb0ZMyU'
  ],
  mix: ['6QAKnenuZoowNqxRzZbeRg']
};

const artists = {
  rock: [
    '2DaxqgrOhkeH0fpeiQq2f4',
    '1dfeR4HaWDbWqFHLkxsg1d',
    '7jy3rLJdDQY21OgRLCZ9sD',
    '7Ey4PD4MYsKc5I2dolUwbH',
    '58lV9VcRSjABbAbfWS6skp',
    '0oSGxfWSnnOXhD2fKuz2Gy',
    '22bE4uQ6baNwSHPVcDxLCe',
    '51Blml2LZPmy7TTiAg47vQ',
    '1w5Kfo2jwwIPruYS2UWh56',
    '7MhMgCo0Bl0Kukl93PZbYS',
    '4Z8W4fKeB5YxbusRsdQVPb',
    '3qm84nBOXUEQ2vnTfUTTFC',
    '36QJpDe2go2KgaRleHCDTp',
    '5NGO30tJxFlKixkPSgXcFE',
    '711MCceyCBcFnzjGY4Q7Un',
    '3WrFJ7ztbogyGnTHbHJFl2',
    '0k17h0D3J5VfsdmQ1iZtE9',
    '74ASZWbe4lXaubB36ztrGX',
    '0L8ExT028jH3ddEcZwqJJ5'
  ],
  rock_argentino: [
    '3jO7X5KupvwmWTHGtHgcgo', // Charly
    '1MuQ2m2tg7naeRGAOxYZer', // Spinetta
    '30fEdZPXgWfC4sNttcyB3C', // La renga,
    '4VgvR7eu3k2T20mo6mXhXF', // Intoxicados,
    '1QOmebWGB6FdFtW7Bo3F0W', // Cerati
    '6ZIgPKHzpcswB8zh7sRIhx', // Divididos
    '2F9pvj94b52wGKs0OqiNi2', // Babasónicos
    '3tAICgiSR5PfYY4B8qsoAU', // Calamaro
    '1bZNv4q3OxYq7mmnLha7Tu', // Fito
    '0Zncosr79q01riJYbSBNA1', // Turf
    '1Qv4E1VgZOGnOYd99Kp5Bs', // Las pelotas
    '0Dy32zfSrQ332Bz8wsthKJ', // La beriso
    '2osoVujXgV0PA8lhqDKYFw', // Callejeros
    '1a1v0OJC5GqtsLwzoqJm7j', // Ud senalemelo
    '6nVcjUJemqpJjc1WevwTvL', // La vela puerca
    '4ZDoy7AWNgQVmX7T0u0B1j', // NTVG
    '6jRUKVZllu1wtgXHbqvUmT', // El kuelgue
    '2ryBOCbEFFebwOSDmgl6rh', // El indio
    '2MLiASzGQHVMyORIApRGsp', // Kapanga
    '5rI6C5mJm6GYXbGHhpHTu9', // A77
    '6MxyNXnnmwQwdW2PD0gXYO', // Bersuit
    '5R6YR0pasdxlynyq0Abq7x', // Fabi cantilo
    '059ysTnWcrm4yFwTr0NDjc', // Catupecu
    '7FnZWGw9lwOr7WzieTKEPR', // Los pericos
    '0SnyKkoyBaB2fG8IJH4xmU', // Los piojos
    '4TK1gDgb7QKoPFlzRrBRgR', // Enanitos verdes
    '0D5U7oXEE4dut2DPyUDLca' // LPDA
  ],
  pop: [
    '6M2wZ9GZgrQXHCFfjv46we', // Dua Lipa
    '26VFTg2z8YR0cCuwLzESi2', // Halsey
    '3TVXtAsR1Inumwj472S9r4', // Drake
    '4q3ewBCX7sLwd24euuV69X', // Bad bunny
    '0C8ZW7ezQVs4URX5aX7Kqx', // Selena Gomez
    '1HY2Jd0NmPuamShAr6KMms', // Lady Gaga
    '0X2BH1fck6amBIoJhDVmmJ', // Ellie goulding
    '0hCNtLu0JehylgoiP8L4Gh', // Nicky minaj
    '1Cs0zKBU1kc0i8ypK3B9ai', // Guetta
    '7CajNmpbOovFoOoasH2HaY', // Calvin harris
    '2wY79sveU1sp5g7SokKOiI', // Sam smith
    '53XhwfbYqKCa1cC15pYq2q', // Imagine dragons
    '3YQKmKGau1PzlVlkL1iodx', // 21 pilots
    '04gDigrS5kc9YWfZHwBETP', // Maroon 5
    '1i8SpTcr7yvPOmcqrbnVXY', // Ozuna
    '1uNFoZAHBGtllmzznpCI3s', // Justin bieber
    '6eUKZXaKkcviH0Ku9w2n3V', // Ed sheeran
    '4gzpq5DPGxSnKTe4SA8HAU', // Coldplay
    '5WUlDfRSoLAfcVSX1WnrxN', // Sia
    '5pKCCKE2ajJHZ9KAiaK11H', // Rihanna
    '06HL4z0CvFAxyc27GXpf02', // Taylor Swift
    '6vWDO969PvNqNYHIOW5v0m' // Beyonce
  ]
};

module.exports = {
  playlists,
  artists
};
