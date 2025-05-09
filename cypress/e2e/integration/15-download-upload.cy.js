/// <reference types="cypress"/>
import fs from "fs";
import path from "path";

describe("File Download & File Upload", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend");
    cy.clickCard("File Download & Upload");
  });

  const fileName = "SampleText.txt";
  const wrongExtensionFile = "wrongExtensionFile.webp";
  const fileNameDownloadPath = path.join("cypress/downloads", fileName);
  const wrongExtensionFileDownloadPath = path.join(
    "cypress/downloads",
    wrongExtensionFile
  );

  it("File Download", () => {
    cy.get("#file_download").click();

    cy.readFile(fileNameDownloadPath);

    // ways to read file
    // fs.readSync()
    // cy.fixture()
    // fs.unlink('cypress/downloads/SampleText.txt')
  });

  /**
   * Go to https://techglobal-training.com/frontend/
   * Click on the "File Upload" card
   * Send the path of the file as keys to the "Choose File" input box
   * Click on the "UPLOAD" button
   * Validate the result message equals "You Uploaded 'SampleText.txt'"
   */
  it("File Upload", () => {
    // .selectFile('pathOfFile')

    // Uploading multiple files
    // cy.get("#file_upload").selectFile(["path1/file.txt", "path2/file.txt"]);

    // Uploading with drag and drop
    // cy.get("#file_upload").selectFile(downloadPath, { action: "drag-drop" });

    cy.get("#file_upload").selectFile(fileNameDownloadPath);
    cy.get("#file_submit").realClick();
    cy.get("#result")
      .should("be.visible")
      .should("have.text", `You uploaded ${fileName}`);
  });

  it("Validate error handling if no file uploaded ", () => {
    cy.get("#file_submit").realClick();
    cy.get("#result")
      .should("be.visible")
      .should("have.text", `Please select a file!`);
  });

  it("Validate error handling if an attempt to upload a file with wrong extension", () => {
    cy.get("#file_upload").selectFile(wrongExtensionFileDownloadPath);
    cy.get("#file_submit").realClick();
    cy.get("#result")
      .should("be.visible")
      .should(
        "have.text",
        `This file type is not allowed. You can try one of the .pdf .txt .pptx .docx .png .jpeg .jpg file types to upload.`
      );
  });
});
