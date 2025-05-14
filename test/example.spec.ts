import { expect, it } from "vitest";
import { User } from "../src/models/User.js";

it("should be added", async() => {
  console.log("should be added");

  const user = User.create({
    firstName: "Timber",
    lastName: "Saw",
    age: 25,
  });

  await expect(user.save()).resolves.toBeDefined();
  await expect(User.count()).resolves.toBe(1);
})

it("should be updated", async () => {
  console.log("should be updated");

  const user = User.create({
    firstName: "Timber",
    lastName: "Saw",
    age: 25,
  })
  await user.save();

  const updateUser = await User.findOneBy({ id: user.id });

  updateUser.firstName = "John";

  await expect(updateUser.save()).resolves.toBeDefined();
  await expect(User.count()).resolves.toBe(1);
})
