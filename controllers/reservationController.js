import Reservation from '../models/Reservation.js';

export const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, specialRequests } = req.body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    const reservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      guests,
      specialRequests,
    });

    await reservation.save();
    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while creating reservation' });
  }
};
