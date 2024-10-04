// @ts-ignore
import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  uniqueIndex,
  date,
  decimal,
  integer
} from "drizzle-orm/pg-core";

// Users table
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    first_name: varchar("first_name"),
    last_name: varchar("last_name"),
    grade_level: varchar("grade_level"),
    location: varchar("location"),
    birthday: date("birthday"),
    gender: varchar("gender"),
    sport: varchar("sport"),
    team: varchar("team"),
    position: varchar("position"),
    number: varchar("number"),
    email: varchar("email").notNull().unique(),
    image: text("image"),
    password: text("password").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("users_unique_idx").on(users.email), // Renamed index for users
    };
  }
);

// Coaches table
 

export const coaches = pgTable(
  "coaches",
  {
    id: serial("id").primaryKey(),
    firstName: varchar("firstName"),
    lastName: varchar("lastName"),
    email: varchar("email"),
    phoneNumber: varchar("phoneNumber"),
    gender: varchar("gender"),  // Using the enum for gender
    location: varchar("location"),
    sport: varchar("sport"),
    clubName: varchar("clubName"),
    qualifications: text("qualifications"),
    expectedCharge: decimal("expectedCharge", { precision: 10, scale: 2 }), // Decimal type with precision and scale
    image: text("image"),
    slug: text("slug"),
    password: text("password").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (coaches) => {
    return {
      uniqueIdx: uniqueIndex("coaches_unique_idx").on(coaches.email), // Renamed index for coaches
    };
  }
);

export const playerEvaluation = pgTable(
  "player_evaluation",
  {
    id: serial("id").primaryKey(),
    player_id: integer("player_id").notNull(), 
    coach_id: integer("coach_id").notNull(), 
    review_title: varchar("review_title").notNull(), // Title of the review
    primary_video_link: text("primary_video_link").notNull(), // Primary video link
    video_link_two: text("video_link_two"), // Optional second video link
    video_link_three: text("video_link_three"), // Optional third video link
    video_description: text("video_description").notNull(), // Description of the video
    evaluation_status: varchar("evaluation_status").default("Requested").notNull(), // Default value
    payment_status: varchar("payment_status"), // Payment status, can be NULL if not set
    created_at: timestamp("created_at").defaultNow().notNull(), // Automatically set current timestamp
    updated_at: timestamp("updated_at").defaultNow().notNull(), // Automatically set current timestamp
  },
  (playerEvaluation) => {
    return {
      uniqueIdx: uniqueIndex("player_evaluation_unique_idx").on(playerEvaluation.player_id, playerEvaluation.review_title), // Unique index on player_id and review_title
    };
  }
);


export const payments = pgTable(
  "payments",
  {
    id: serial("id").primaryKey(), // Unique identifier for each payment
    player_id: varchar("player_id").notNull(), // Reference to the player's unique identifier
    coach_id: varchar("coach_id").notNull(), // Reference to the coach's unique identifier
    evaluation_id: varchar("evaluation_id").notNull(), // Reference to the evaluation's unique identifier
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(), // Payment amount with precision and scale
    status: varchar("status").notNull(), // Status of the payment (e.g., completed, pending)
    payment_info: text("payment_info"), // Additional payment-related information (nullable)
    created_at: timestamp("created_at").defaultNow().notNull(), // Automatically set current timestamp
    description: text("description"), // Optional description for the payment (nullable)
  },
  (payments) => {
    return {
      uniqueIdx: uniqueIndex("payments_unique_idx").on(payments.player_id, payments.coach_id, payments.evaluation_id), // Unique index for player_id, coach_id, and evaluation_id
    };
  }
);