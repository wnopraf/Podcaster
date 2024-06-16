describe("podcaster app", () => {
  it("should load podscats list view", () => {
    cy.intercept({ url: /.+toppodcasts.+/ }).as("podcastList");
    //cy.intercept("*/lookup/*").as("episodeList");
    cy.visit("http://localhost:5173/");
    cy.wait(["@podcastList"]);
    cy.get("h1").should("contain", "Podcaster");
    cy.get("span").should("contain", "100");
    cy.get("input").should("be.visible");
    cy.get("#podcast-list").should("contain.html", "a");
    cy.get("#podcast-list>a").should("have.length", 100);
    cy.get("input").type("ru");
    cy.get("#podcast-list>a").should("have.length.at.least", 2);
    cy.get("input").type("ruma");
    cy.get("#no-podcasts").should("contain", "no podcasts found");
  });

  it("should load podcast-detail view & go back to home", () => {
    cy.intercept({ url: /.+toppodcasts.+/ }).as("podcastList");
    cy.intercept({ url: /.+lookup.+/ }).as("episodeList");
    cy.visit("http://localhost:5173/");
    cy.wait(["@podcastList"]);

    cy.get("#podcast-list>a").contains("Drink Champs").click();
    cy.wait(["@episodeList"]);
    cy.get("aside").should("be.visible");
    cy.get("h1").contains("Episodes:").should("be.visible");
    cy.get("table").should("be.visible");
    cy.get("table").find("td>a").contains("will.i.am").click();
    cy.get("figure>audio").should("be.visible");
    cy.get("a").find("img").click();
    cy.get("table").should("be.visible");
    cy.get("a").contains("Podcaster").click();
    cy.get("input").should("be.visible");
    cy.get("#podcast-list").should("contain.html", "a");
  });
});
