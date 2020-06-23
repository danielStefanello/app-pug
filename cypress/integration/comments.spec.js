///<reference types='cypress' />

describe('Should be able register a comment', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should be create coment', function () {
    cy.fixture('commentsData')
      .as('comments')
      .then(() => {
        this.comments.forEach((item) => {
          cy.get('[data-cy=input-commentary]')
            .type(item.comment)
            .should('have.value', item.comment);

          cy.get('[data-cy=input-rate]')
            .select(item.rate)
            .should('have.value', item.rate);

          cy.get('[data-cy=send-commentary]').click();

          cy.get('#ulComments li:last-child > [data-cy=comment-text]').should(
            'have.text',
            item.comment
          );

          cy.get('#ulComments li:last-child > [data-cy=comment-rate]').should(
            'have.text',
            item.rate
          );
        });
      });
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
