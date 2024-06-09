describe("template spec", () => {
  it("should load podcasts", () => {
    cy.intercept({ url: /.toppodcasts./ }).as("podcastList");
    //cy.intercept("*/lookup/*").as("episodeList");
    cy.visit("http://localhost:5173/");
    cy.wait(["@podcastList"]);
    cy.get("h1").should("contain", "Podcaster");
    cy.get("span").should("contain", "100");
    cy.get("input").should("contain", "");
    cy.get("#podcast-list").should("contain.html", "a");
    cy.get("#podcast-list>a").should("have.length", 100);
    cy.get("input").type("ru");
    cy.get("#podcast-list>a").should("have.length.at.least", 2);
    cy.get("input").type("ruma");
    cy.get("#no-podcasts").should("contain", "no podcasts found");
  });
});
