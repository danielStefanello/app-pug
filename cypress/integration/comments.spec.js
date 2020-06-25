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

          cy.get('[data-cy=comment-text]:last').should(
            'have.text',
            item.comment
          );

          cy.get('[data-cy=comment-rate]:last').should('have.text', item.rate);
        });
      });
  });

  it('Should be increment number of commentaries', () => {
    cy.get('[data-cy=count]')
      .invoke('text')
      .then((count1) => {
        cy.get('[data-cy=input-commentary]')
          .type('Aumentando o número de comentários!')
          .should('have.value', 'Aumentando o número de comentários!');

        cy.get('[data-cy=input-rate]').select('5').should('have.value', '5');

        cy.get('[data-cy=send-commentary]').click();

        let result = parseInt(count1);

        result++;

        cy.get('[data-cy=count]')
          .invoke('text')
          .should((count2) => {
            expect(`${result}`).be.equal(count2);
          });
      });
  });

  it('Should be average correctly value', () => {
    let sun = 0;

    cy.get('[data-cy=comment-rate]')
      .each((item) => {
        cy.get(item)
          .invoke('text')
          .then((value) => (sun += parseInt(value)));
      })
      .then((result) => {
        cy.get('[data-cy=average]')
          .invoke('text')
          .then((value) => {
            expect(value).eq((sun / result.length).toFixed(1));
          });
      });
  });
});
