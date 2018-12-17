import { Everis.SimpleProject.FrontPage } from './app.po';

describe('everis.simple-project.front App', () => {
  let page: Everis.SimpleProject.FrontPage;

  beforeEach(() => {
    page = new Everis.SimpleProject.FrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
