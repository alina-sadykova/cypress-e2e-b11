import { format } from "date-fns";

class ProjectPage {
  // locators

  getTripTypeRadioBtnByLabel(label) {
    return cy.contains(".radio", label).find("input");
  }

  getAllLabels() {
    return cy.get(".field > .label");
  }

  getAllDropdowns() {
    return cy.get(".select select");
  }

  getDropdownByLabel(label) {
    return cy.contains(label).parent().find("select");
  }

  getAllDatepickers() {
    return cy.get('[class*="react"]>input');
  }

  getDatePickerByLabel(label) {
    return cy.contains(label).parent().find("input");
  }

  getBookBtn() {
    return cy.get('[type="submit"]');
  }

  /*
        cabinClass: 'Business',
        from: 'Illinois',
        to: 'Florida',
        numberOfPassengers: '1',
        passerger1: 'Senior (65+)'
    */
  fillBookingDropdowns(options) {
    Object.values(options).forEach((option, index) => {
      this.getAllDropdowns().eq(index).select(option);
    });
  }

  fillTripTypeRadioBtn(labelOption) {
    this.getTripTypeRadioBtnByLabel(labelOption).check();
  }

  getFutureDate(days) {
    let futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    return futureDate;
  }

  formatDateByAmericanDate(date) {
    return format(date, "MM/dd/yyyy");
  }

  formatDateToShortDate(date) {
    return format(date, "eee MMM dd yyyy");
  }

  stateAbbreviations = {
    Illinois: "IL",
    Florida: "FL",
  };

  getAbbreviationForState(state) {
    return this.stateAbbreviations[state];
  }

  getTravelInfoDepart() {
    return cy.get(".ml-3 .field>div").children();
  }
}
export default ProjectPage;
