import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../../lib/db';
import { coaches } from '../../../lib/schema'
import debug from 'debug';
import { eq } from 'drizzle-orm';
import { promises as fs } from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import next from 'next';
import { SECRET_KEY } from '@/lib/constants';


  export async function POST(req: NextRequest) {
    const { slug } = await req.json();
    
    try {
      // Using 'like' with lower case for case-insensitive search
      const coachlist = await db
        .select()
        .from(coaches)
        .where(
          eq(coaches.slug,slug)
        )
        .limit(1) 
        .execute();
        const payload = {
            firstName: coachlist[0].firstName,
            lastName: coachlist[0].lastName,
            id: coachlist[0].id,
            expectedCharge: coachlist[0].expectedCharge,
            createdAt: coachlist[0].createdAt,
            slug: coachlist[0].slug,
            
            image:coachlist[0].image
          };
  
      return NextResponse.json(payload);
    } catch (error) {
      const err = error as any;
      console.error('Error fetching coaches:', error);
      return NextResponse.json({ message: 'Failed to fetch coaches' }, { status: 500 });
    }
  }