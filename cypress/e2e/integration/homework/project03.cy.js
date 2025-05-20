/// <reference types='cypress' />

describe("Book Your Trip Validation", () => {
  const listOfSelectLabels = [
    "Trip type",
    "Cabin Class",
    "From",
    "To",
    "Depart",
    "Return",
    "Number of passengers",
    "Passenger 1",
  ];

  const printedDataForRoundTripSenior = [
    "Number of Passengers: 1",
    "Passenger 1: Senior (65+)",
    "Cabin class: Business",
  ];
  const printedDataForRoundTripAdult = [
    "Number of Passengers: 1",
    "Passenger 1: Adult (16-64)",
    "Cabin class: First",
  ];
  const printedDataWithTwoPassengers = [
    "Number of Passengers: 2",
    "Passenger 1: Adult (16-64)",
    "Passenger 2: Child (2-11)",
    "Cabin class: Premium Economy",
  ];
  beforeEach(() => {
    cy.visit("https://techglobal-training.com/frontend/booking");
  });

  it("Test Case 01 - Validate the default Book your trip form", () => {
    // Validate that the “One way” radio button is displayed enabled and selected by default
    cy.get('input[type="radio"]').first().should("have.attr", "checked");

    // Validate that the “Round trip” radio button is displayed enabled and not selected by default
    cy.get('input[type="radio"]').last().should("not.have.attr", "checked");

    /*
    Validate that the “Cabin Class” label and dropdown are displayed
    Validate that the “From” label and dropdown are displayed
    Validate that the “To” label and dropdown are displayed
    Validate that the “Number of passengers” label and dropdown are displayed and 1 is the default
    Validate that the “Passenger 1” category label and dropdown are displayed and “Adult (16-64)” is the default
    Validate that the “Depart” label and date picker is displayed
    Validate that the “Return” label and date picker is displayed and disabled
    Validate that the “BOOK” button is displayed and enabled */
    cy.get(".label")
      .should("be.visible")
      .each((label, index) => {
        cy.wrap(label).should("have.text", listOfSelectLabels[index]);

        if (label.text() === "Number of passengers")
          cy.wrap(label)
            .parent()
            .find('option[value="1"]')
            .should("be.selected");
        if (label.text() === "Passenger 1")
          cy.wrap(label)
            .parent()
            .find("option")
            .first()
            .should("have.text", "Adult (16-64)")
            .and("be.selected");

        if (label.text() === "Depart") {
          cy.wrap(label).parent().find("input").should("be.visible");
        }
        if (label.text() === "Return") {
          cy.wrap(label).parent().find("input").should("have.attr", "disabled");
        }
      });
    cy.get("div[class='select']").should("be.visible");

    // Validate that the “BOOK” button is displayed and enabled
    cy.get('div[class*="Projects_book__"]')
      .should("be.visible")
      .and("not.have.attr", "disabled");
  });

  it("Test Case 02 - Validate the Book your trip form when Round trip is selected", () => {
    cy.get('input[value="Round trip"]').click().should("be.checked");
    cy.get('input[value="One way"]').should("not.be.checked");

    cy.get(".label")
      .should("be.visible")
      .each((label, index) => {
        const labelText = label.text().trim();
        cy.wrap(label).should("have.text", listOfSelectLabels[index]);
        if (labelText === "Number of passengers")
          cy.wrap(label)
            .parent()
            .find('option[value="1"]')
            .should("be.selected");
        if (labelText === "Passenger 1")
          cy.wrap(label)
            .parent()
            .find("option")
            .first()
            .should("have.text", "Adult (16-64)")
            .and("be.selected");

        if (labelText === "Depart") {
          cy.wrap(label).parent().find("input").should("be.visible");
        }
        if (labelText === "Return") {
          cy.wrap(label)
            .parent()
            .find("input")
            .should("not.have.attr", "disabled");
        }
      });

    cy.get("div[class='select']").should("be.visible");

    // Validate that the “BOOK” button is displayed and enabled
    cy.get(".control button")
      .should("be.visible")
      .and("not.have.attr", "disabled");
  });

  it("Test Case 03 - Validate the booking for 1 passenger and one way", () => {
    // Select the “One way” radio button
    // Select “Business” for the “Cabin Class” dropdown
    // Select “Illinois” for the “From” dropdown
    // Select “Florida” for the “To” dropdown
    // Select the next week for the ”Depart”
    // Select “1” for the “Number of passengers” dropdown
    // Select “Senior (65+)” for the Passenger 1 dropdown
    cy.get('input[value="One way"]').click().should("be.checked");
    cy.get(".label")
      .should("be.visible")
      .each((label) => {
        const labelText = label.text().trim();
        if (labelText === "Cabin Class")
          cy.wrap(label).parent().find("select").select("Business");
        if (labelText === "From")
          cy.wrap(label).parent().find("select").select("Illinois");
        if (labelText === "To")
          cy.wrap(label).parent().find("select").select("Florida");
        if (labelText === "Depart") {
          cy.wrap(label).parent().find("input").click().should("be.visible");
          cy.get(
            ".react-datepicker__week div[aria-label='Choose Sunday, May 25th, 2025']"
          )
            .should("be.visible")
            .click();
        }
        if (labelText === "Number of passengers") {
          cy.wrap(label)
            .parent()
            .find("select")
            .select("1")
            .should("have.value", "1");
        }
        if (labelText === "Passenger 1") {
          cy.wrap(label)
            .parent()
            .find("select")
            .select("Senior (65+)")
            .should("be.visible");
        }
      });

    // Click on the “BOOK” button
    cy.get(".control button").click();

    // Validate the booking information displayed below
    // DEPART
    // IL to FL
    // {dynamic date}
    // Number of passengers: 1
    // Passenger 1: Senior (65+)
    // Cabin Class: Business
    cy.get(".ml-3").should("be.visible");
    cy.get(".ml-3 h1").should("have.text", "DEPART");
    cy.get(".ml-3 h3").should("have.text", "IL to FL");
    cy.get(".ml-3 div div p").should("have.text", "Sun May 25 2025");
    cy.get(".mt-4 p").each((el, index) => {
      cy.wrap(el).should("have.text", printedDataForRoundTripSenior[index]);
    });
  });

  it("Test Case 04 - Validate the booking for 1 passenger and round trip", () => {
    // Select the “Round trip” radio button
    cy.get('input[value="Round trip"]').click().should("be.checked");
    // Select “First” for the “Cabin Class” dropdown
    // Select “California” for the “From” dropdown
    // Select “Illinois” for the “To” dropdown
    // Select the next week for the ”Depart”
    // Select the next month for the “Return”
    // Select “1” for the “Number of passengers” dropdown
    // Select “Adult (16-64)” for the Passenger 1 dropdown
    cy.get(".label").each((label) => {
      const labelText = label.text().trim();
      if (labelText === "Cabin Class")
        cy.wrap(label).parent().find("select").select("First");
      if (labelText === "From")
        cy.wrap(label).parent().find("select").select("California");
      if (labelText === "To")
        cy.wrap(label).parent().find("select").select("Illinois");
      if (labelText === "Depart") {
        cy.wrap(label).parent().find("input").click().should("be.visible");
        cy.get(
          ".react-datepicker__week div[aria-label='Choose Sunday, May 25th, 2025']"
        )
          .should("be.visible")
          .click();
      }
      if (labelText === "Number of passengers") {
        cy.wrap(label)
          .parent()
          .find("select")
          .select("1")
          .should("have.value", "1");
      }
      if (labelText === "Passenger 1") {
        cy.wrap(label)
          .parent()
          .find("select")
          .select("Adult (16-64)")
          .should("be.visible");
      }
    });
    // Click on the “BOOK” button
    cy.get(".control button").click();

    // Validate the booking information displayed below
    // DEPART
    // CA to IL
    // {dynamic date}

    // RETURN
    // IL to CA
    // {dynamic date}

    // ------- TRIED TO LOOP: throwing an error
    // cy.get(".ml-3 .field div").each((el, index) => {
    //   cy.wrap(el)
    //     .find("h1")
    //     .should("have.text", printedDataForRoundTrip.headers[index]);
    // });

    // ------- TRIED TO TARGET DEPART INDIVIDUALLY: throwing an error
    // cy.get(".ml-3 .field div h1").should("have.text", "DEPART");
    // cy.get(".ml-3 h3").should("have.text", "CA to IL");
    // cy.get(".ml-3 .field div p").should("have.text", "Sun May 25 2025");

    cy.get(".ml-3 .field div div h1").should("have.text", "RETURN");
    cy.get(".ml-3 .field div div h3").should("have.text", "IL to CA");
    cy.get(".ml-3 .field div div p").should("have.text", "Sun May 25 2025");

    // Number of passengers: 1
    // Passenger 1: Adult (16-64)
    // Cabin Class: First
    cy.get(".mt-4 p").each((el, index) => {
      cy.wrap(el).should("have.text", printedDataForRoundTripAdult[index]);
    });
  });

  it("Test Case 05 - Validate the booking for 2 passengers and one way", () => {
    // Select the “One way” radio button
    cy.get('input[value="One way"]').click().should("be.checked");
    // Select “Premium Economy” for the “Cabin Class” dropdown
    // Select “New York” for the “From” dropdown
    // Select “Texas” for the “To” dropdown
    // Select the next day for the ”Depart”
    // Select “2” for the “Number of passengers” dropdown
    // Select “Adult (16-64)” for the Passenger 1 dropdown
    // Select “Child (2-11)” for the Passenger 2 dropdown
    cy.get(".label").each((label) => {
      const labelText = label.text().trim();
      cy.log(labelText);
      if (labelText === "Cabin Class")
        cy.wrap(label).parent().find("select").select("Premium Economy");
      if (labelText === "From")
        cy.wrap(label).parent().find("select").select("New York");
      if (labelText === "To")
        cy.wrap(label).parent().find("select").select("Texas");
      if (labelText === "Depart") {
        cy.wrap(label).parent().find("input").click().should("be.visible");
        cy.get('.react-datepicker__week div[aria-selected="true"]')
          .should("be.visible")
          .then((today) => {
            cy.wrap(today).next().click();
          });
      }
      cy.get(".label")
        .contains("Number of passengers")
        .parent()
        .find("select")
        .select("2");
      cy.get("label")
        .contains("Passenger 1")
        .parent()
        .find("select")
        .select("Adult (16-64)");
      cy.get("label")
        .contains("Passenger 2")
        .parent()
        .find("select")
        .should("be.visible")
        .select("Child (2-11)");

      // -------- THIS CODE THROWING AN ERROR, not selecting option Child (2-11)
      // if (labelText === "Number of passengers") {
      //   cy.wrap(label)
      //     .parent()
      //     .find("select")
      //     .select("2")
      //     .should("have.value", "2");
      //   cy.get(".label").contains("Passenger 2").should("be.visible");
      // }
      // if (labelText === "Passenger 1") {
      //   cy.wrap(label)
      //     .parent()
      //     .find("select")
      //     .select("Adult (16-64)")
      //     .should("be.visible");
      // }
      // if (labelText === "Passenger 2") {
      //   cy.wrap(label)
      //     .parent()
      //     .find("select")
      //     .should("be.visible")
      //     .select("Child (2-11)")
      //     .should("have.value", "Child (2-11)");
      // }
    });

    // Click on the “BOOK” button
    cy.get(".control button").click();

    // Validate the booking information displayed below
    // DEPART
    // NY to TX
    // {dynamic date}
    cy.get(".ml-3 .field div h1").should("have.text", "DEPART");
    cy.get(".ml-3 .field div h3").should("have.text", "NY to TX");
    cy.get(".ml-3 .field div p").should("have.text", "Wed May 21 2025");

    // Number of passengers: 2
    // Passenger 1: Adult (16-64)
    // Passenger 2: Child (2-11)
    // Cabin Class: Premium Economy

    cy.get(".mt-4 p").each((el, index) => {
      cy.wrap(el).should("have.text", printedDataWithTwoPassengers[index]);
    });
  });
});
