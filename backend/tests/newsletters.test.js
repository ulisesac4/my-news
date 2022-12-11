const NewsletterService = require("../services/newsletters");

describe("Tests for newsletters", () => {
  let newsletter;
  test("Can create nesletter", async () => {
    const testName = "a test newsletter";
    newsletter = await NewsletterService.create(testName);

    expect(newsletter.name).toBe(testName);
  });

  test("Can show all nesletters", async () => {
    const newsletters = await NewsletterService.showAll();

    expect(newsletters.length).toBeGreaterThan(0);
  });

  test("Can can update a newsletter", async () => {
    const updatedName = "an updated name";
    result = await NewsletterService.update(newsletter.id, updatedName);

    expect(result[0]).toBe(1);
  });

  test("Can delete a newsletter", async () => {
    result = await NewsletterService.destroy(newsletter.id);

    expect(result).toBe(1);
  });
});
