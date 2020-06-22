///<reference types='cypress' />

describe('Should be able register a comment', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should be create coment', () => {
    const comment = 'Meu primeiro comentário criado com um teste';
    const rate = '4';
    cy.get('#inComment').type(comment).should('have.value', comment);

    cy.get('#inRate').select(rate).should('have.value', rate);

    cy.get('#sender').click();

    cy.get('#ulComments li:last-child > .col-11').should('have.text', comment);

    cy.get('#ulComments li:last-child > .ml-3').should('have.text', rate);
  });

  it('Should be increment number of commentaries', () => {
    cy.get('#count')
      .invoke('text')
      .then((count1) => {
        cy.get('#inComment')
          .type('Aumentando o número de comentários!')
          .should('have.value', 'Aumentando o número de comentários!');

        cy.get('#inRate').select('5').should('have.value', '5');

        cy.get('#sender').click();

        let result = parseInt(count1);

        result++;

        cy.get('#count')
          .invoke('text')
          .should((count2) => {
            expect(`${result}`).be.equal(count2);
          });
      });
  });
});
