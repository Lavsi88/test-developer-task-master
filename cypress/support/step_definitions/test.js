import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given('user is on home page', () => {
    Cypress.on("uncaught:exception", () => {
        return false
    })
    cy.visit("http://localhost:3000/#")
})

When('user click on the add assets', () => {
    cy.get('a[testid="add-asset"]')
        .should("be.visible")
        .click({ force: true })
})

And('enter {string} and click on send button', (assetID) => {
    cy.get('input[testid="asset-name"]')
        .should("be.visible")
        .type(assetID)
    cy.intercept({ method: 'POST', url: 'http://localhost:3000/addAsset/' + assetID }).as('addAsset')
    cy.get('button[data-test="button"][type="submit"]')
        .should("be.visible")
        .click({ force: true })
    cy.wait('@addAsset').then(interception => {
        cy.wrap(interception.response.statusCode).should("match", /201|409/)
    })
})

Then('validate that the asset is successfully added', () => {
    cy.get('h4[class="modal-title"]')
        .should("be.visible")
        .should("have.text", "Sucssess")
})

Then('validate that the asset is already added message appear', () => {
    cy.get('h4[class="modal-title"]')
        .should("be.visible")
        .should("have.text", "Asset alredy exist")
})

When('user click on the existing assets', () => {
    cy.get('a[class="item"]')
        .should("be.visible")
        .contains('Existing Assets')
        .click({ force: true })
})

And('enter {string}', (assetID) => {
    cy.get('input[aria-label="Search"]')
        .should("be.visible")
        .type(assetID)
})

Then('validate that the asset table display the existing assest {string}', (assetID) => {
    cy.get('div[data-test="datatable-table"] td')
        .should("be.visible")
        .should("contain", assetID)
})

Then('enter {string} and click on send button and validate format the error message displayed', (assetID) => {
    cy.get('input[testid="asset-name"]')
        .should("be.visible")
        .type(assetID)
    cy.get('button[data-test="button"][type="submit"]')
        .should("be.visible")
        .click({ force: true })
    cy.get('input[testid="asset-name"]').then(($input) => {
        if ($input[0].validationMessage !== '') {
            expect($input[0].validationMessage).to.include("Please match the requested format.")
        }
    })

})

And('user click on filter', () => {
    cy.get('th[class^="sorting"]')
        .should("be.visible")
        .click({ force: true })
})

Then('validate that the table is filtered out', () => {
    cy.get('th[class^="sorting"]')
        .should("be.visible")
        .invoke('attr', 'class')
        .should("contain", "asc")
})
