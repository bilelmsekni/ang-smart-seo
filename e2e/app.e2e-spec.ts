import { AngSmartSeoPage } from './app.po';

describe('ang-smart-seo App', () => {
  let page: AngSmartSeoPage;

  beforeEach(() => {
    page = new AngSmartSeoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
