describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "Davorko",
      name: "Davor Komusanac",
      password: "lozinka555",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("log in to application");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
    cy.get("#username").type("Davorko");
    cy.get("#password").type("lozinka555");
    cy.get("#login-button").click();

    cy.contains("Davor Komusanac logged in");
  });

  it("login fails with wrong password", function () {
    //cy.contains("login").click();
    cy.get("#username").type("Davorko");
    cy.get("#password").type("lozinka5555");
    cy.get("#login-button").click();

    cy.contains("invalid username or password");
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "Davorko", password: "lozinka555" });
    });

    it("a new blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Test Title");
      cy.get("#author").type("Some Author");
      cy.get("#url").type("www.url.com");
      cy.get("#create-blog-button").click();
      cy.contains("Test Title Some Author");
    });

    describe("When a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Another Test Title",
          author: "Another Some Author",
          url: "www.anotherurl.com",
        });
      });

      it("it can be liked", function () {
        cy.contains("Another Test Title Another Some Author")
          .contains("view")
          .click();

        cy.get("#like").click();
        cy.contains("likes 1");
      });

      it("it can be deleted", function () {
        cy.contains("Another Test Title Another Some Author")
          .contains("view")
          .click();

        cy.get("#delete").click();
        cy.contains("Another Test Title Another Some Author").should(
          "not.exist"
        );
      });

      it("blog with highest likes is sorted first", function () {
        cy.createBlog({
          title: "Maximum Test Title",
          author: "Another Some Author",
          url: "www.anotherurl.com",
        });

        cy.get(".blog")
          .eq(0)
          .should("contain", "Another Test Title Another Some Author");
        cy.get(".blog")
          .eq(1)
          .should("contain", "Maximum Test Title Another Some Author");

        cy.contains("Another Test Title Another Some Author")
          .contains("view")
          .click();

        cy.contains("Another Test Title Another Some Author")
          .parent()
          .find("#like")
          .as("firstButton");

        cy.get("@firstButton").click();
        cy.wait(300);
        cy.get("@firstButton").click();

        //Like the second blog
        cy.contains("Maximum Test Title Another Some Author")
          .contains("view")
          .click();

        cy.contains("Maximum Test Title Another Some Author")
          .parent()
          .find("#like")
          .as("secondButton");

        cy.get("@secondButton").click();
        cy.wait(300);
        cy.get("@secondButton").click();
        cy.wait(300);

        cy.get("@secondButton").click();
        cy.wait(300);
        cy.get("@secondButton").click();

        cy.reload();

        cy.get(".blog")
          .eq(0)
          .should("contain", "Maximum Test Title Another Some Author");
        cy.get(".blog")
          .eq(1)
          .should("contain", "Another Test Title Another Some Author");
      });
    });
  });
});
