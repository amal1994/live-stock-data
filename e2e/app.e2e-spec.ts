import { MediaPage } from './app.po';

describe('media App', () => {
  let page: MediaPage;

  beforeEach(() => {
    page = new MediaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
