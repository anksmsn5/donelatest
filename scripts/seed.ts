import { NewUser, insertUser } from "@/lib/db";

async function main() {
  const newUser: NewUser = {
    email: "foo@example.com",
    image: "some image url",
    first_name: "foo",  // Change 'name' to 'first_name'
    last_name: "bar",   // Add 'last_name'
  };
  
  const res = await insertUser(newUser);
  console.log("insert user success", res);
  process.exit();
}

main();
