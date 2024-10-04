// app/api/update/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../../lib/db';
import { users } from '../../../lib/schema';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@/lib/constants';

export async function PATCH(req: NextRequest) {
  const logError = debug('app:error');
  const body = await req.json();
  const token=localStorage.getItem('token');
  
  let decoded;
  try {
    decoded = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
  
  const userId = decoded.id; 
  const { email, password, first_name, last_name, grade_level, location, birthday, gender, sport, team, position, number, image } = body;

  if (!userId) {
    return NextResponse.json({ message: 'Token Expired.' }, { status: 400 });
  }
  if (req.method === 'PUT') {
  try {
   
   
    const updatedUser = await db
      .update(users)
      .set({
        first_name: first_name || null,
        last_name: last_name || null,
        grade_level: grade_level || null,
        location: location || null,
        birthday: birthday || null,
        gender: gender || null,
        sport: sport || null,
        team: team || null,
        position: position || null,
        number: number || null,
        image: image || null
        
      })
    
      .where(users.id.eq(userId)) // Update by email
      .returning();

    // Respond with the updated user data or a success message
    return NextResponse.json({ message: 'User updated successfully', user: updatedUser }, { status: 200 });
  } catch (error) {
    logError('Error updating user: %O', error);
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
  }
}
}
