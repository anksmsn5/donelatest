// app/api/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '../../../lib/db';
import { users, coaches } from '../../../lib/schema'
import debug from 'debug';
import { eq } from 'drizzle-orm';
import { promises as fs } from 'fs';
import path from 'path';

import jwt from 'jsonwebtoken';
import next from 'next';
const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(req: NextRequest) {

  const logError = debug('app:error');


  const { email, password,loginAs  } = await req.json();

  if(loginAs=='coach')
  {
    const coach = await db.select().from(coaches).where(eq(coaches.email, email)).execute();
    if (coach.length === 0 || !(await bcrypt.compare(password, coach[0].password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    else{
      const payload = {
        name: coach[0].firstName,
        id: coach[0].id,
        type:'coach',
        image:coach[0].image
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
      return NextResponse.json({ token:token,type:'coach' });
    }
  }
  if(loginAs=='player')
    {
      const user = await db.select().from(users).where(eq(users.email, email)).execute();

      if (user.length === 0 || !(await bcrypt.compare(password, user[0].password))) {
        
        
    
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
      else{
        const payload = {
          name: user[0].first_name,
          id: user[0].id,
          type:'player',
          image:user[0].image
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
        return NextResponse.json({ token:token,type:'player' });
      }
    }
  
 

  


}



