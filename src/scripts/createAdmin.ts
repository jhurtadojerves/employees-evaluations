import User, { UserRole } from '../models/User';

import bcrypt from 'bcryptjs';
import config from '../config';
import mongoose from 'mongoose';

const createAdmin = async () => {
  try {
    const [, , email, password] = process.argv;

    if (!email || !email) {
      console.error('❌ Usage: npm run create:admin -- <email> <password>');
      process.exit(1);
    }

    await mongoose.connect(config.db.url);
    const existing = await User.findOne({ email });

    if (existing) {
      console.log('❌ Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      name: 'Admin User',
      email,
      password: hashedPassword,
      role: UserRole.ADMIN,
    });
    await admin.save();

    console.log(`✅ Admin user created: ${email}`);
  } catch (err) {
    console.error('❌ Error creating admin user:', err);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin().catch((e) => {
  console.log(e);
});
