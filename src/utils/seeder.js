import mongoose from 'mongoose';
import School from '../models/school-model.js'; // Adjust path
import Activities from '../models/activities-model.js'; // Adjust path
import Alumni from '../models/alumni-model.js'; // Adjust path
import Amenities from '../models/amenities-model.js'; // Adjust path
import { schools, activities, alumni, amenities } from './data.js'; // Adjust path

export const seedDatabase = async () => {
  try {
    //Optional: Delete existing data
    await School.deleteMany({});
    await Activities.deleteMany({});
    await Alumni.deleteMany({});
    await Amenities.deleteMany({});

    // Insert new data
    await School.insertMany(schools);
    await Activities.insertMany(activities);
    await Alumni.insertMany(alumni);
    await Amenities.insertMany(amenities);

    console.log('Database seeded successfully! 🌱');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};