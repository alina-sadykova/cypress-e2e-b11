import ProjectPage from "../../../pages/project03/ProjectPage";

describe("Project - 03 Solution", () => {
  beforeEach(() => {
    cy.visit("https://techglobal-training.com/frontend/booking");
  });

  const project03Page = new ProjectPage();
  /**
   * Navigate to https://techglobal-training.com/frontend/project-3
   * Validate that the "One way" radio button is displayed enabled and selected by default
   * Validate that the "Round trip" radio button is displayed enabled and not selected by default
   * Validate that the "Cabin Class" label and dropdown are displayed
   * Validate that the "From" label and dropdown are displayed
   * Validate that the "To" label and dropdown are displayed
   * Validate that the "Depart" label and date picker is displayed
   * Validate that the "Return" label and date picker is displayed and disabled
   * Validate that the "Number of passengers" label and dropdown are displayed and 1 is the default
   * Validate that the "Passenger 1" category label and dropdown are displayed and "Adult (16-64)" is the default
   * Validate that the "BOOK" button is displayed and enabled
   */

  it("Test Case 01 - Validate the default Book your trip form", () => {
    project03Page
      .getTripTypeRadioBtnByLabel("One way")
      .should("be.visible")
      .and("be.enabled")
      .and("be.checked");
    project03Page
      .getTripTypeRadioBtnByLabel("Round trip")
      .should("be.visible")
      .and("be.enabled")
      .and("not.be.checked");

    project03Page.getAllLabels().each((ele) => {
      cy.wrap(ele).should("be.visible");
    });

    project03Page.getAllDropdowns().each((ele) => {
      cy.wrap(ele).should("be.visible");
    });

    project03Page.getAllDatepickers().each((ele) => {
      cy.wrap(ele).should("be.visible");
    });

    project03Page.getAllDatepickers().last().should("be.disabled");

    project03Page
      .getDropdownByLabel("Number of passengers")
      .should("have.value", "1");
    project03Page
      .getDropdownByLabel("Passenger 1")
      .should("have.value", "Adult (16-64)");

    project03Page.getBookBtn().should("be.visible").and("be.enabled");
  });

  /**
   * Navigate to https://techglobal-training.com/frontend/project-3
   * Click on the "Round trip" radio button and validate it is selected
   * Validate that the "One way" radio button is not selected
   * Validate that the "Cabin Class" label and dropdown are displayed
   * Validate that the "From" label and dropdown are displayed
   * Validate that the "To" label and dropdown are displayed
   * Validate that the "Depart" label and date picker is displayed
   * Validate that the "Return" label and date picker is displayed
   * Validate that the "Number of passengers" label and dropdown are displayed and 1 is the default
   * Validate that the "Passenger 1" label and dropdown are displayed and "Adult (16–64)" is the default
   * Validate that the "BOOK" button is displayed and enabled
   */

  it("Test Case 02 - Validate the Book your trip form when Round trip is selected", () => {
    project03Page
      .getTripTypeRadioBtnByLabel("Round trip")
      .check()
      .should("be.checked");

    project03Page
      .getTripTypeRadioBtnByLabel("One way")
      .should("not.be.checked");
  });

  /**
   * Navigate to https://techglobal-training.com/frontend/project-3
   * Select the "One way" radio button
   * Select "Business" for the "Cabin Class" dropdown
   * Select "Illinois" for the "From" dropdown
   * Select "Florida" for the "To" dropdown
   * Select the next week for the "Depart"
   * Select "1" for the "Number of passengers" dropdown
   * Select "Senior (65+)" for the Passenger 1 dropdown
   * Click on the "BOOK" button
   * Validate the booking information displayed below
   *
   * DEPART
   * IL to FL
   * {dynamic date}
   * Number of passengers: 1
   * Passenger 1: Senior (65+)
   * Cabin Class: Business
   */

  it("Test Case 03 – Validate the Book your trip form when Round trip is selected", () => {
    const options = {
      cabinClass: "Business",
      from: "Illinois",
      to: "Florida",
      numberOfPassengers: "1",
      passerger1: "Senior (65+)",
    };
    const departDate = project03Page.getFutureDate(7);

    project03Page.fillTripTypeRadioBtn("One way");
    project03Page.fillBookingDropdowns(options);

    project03Page
      .getDatePickerByLabel("Depart")
      .clear()
      .type(`${project03Page.formatDateByAmericanDate(departDate)}{enter}`);

    project03Page.getBookBtn().click();

    const inf = [
      "DEPART",
      `${project03Page.getAbbreviationForState(
        options.from
      )} to ${project03Page.getAbbreviationForState(options.to)}`,
      project03Page.formatDateToShortDate(departDate),
    ];

    project03Page.getTravelInfoDepart().each(($el, index) => {
      cy.wrap($el).should("have.text", inf[index]);
    });
  });
});

/* it('Project', () => {


  cy.visit('https://www.techglobal-training.com/frontend/booking')


  cy.contains('.label', 'Number of passengers').next().children().select('2')

  const arr = ['First', 'Alaska', 'Arizona', '2', 'Adult (16-64)', 'Child (2-11)']

  cy.get('.field > .label + div select').each(($el, index) => {
    cy.wrap($el).select(arr[index])
  })
})*/
