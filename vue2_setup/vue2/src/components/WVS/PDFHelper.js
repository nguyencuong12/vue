// import {} from '../../foxit-lib';

export const PDFHelper = {
  deviceRectToPageRect: async (pageRender, rect, scale) => {
    var page = await pageRender.getPDFPage();
    return await page.reverseDeviceRect(rect, scale || pageRender.getScale());
  },
  toDeviceRect: async (pageRender, rect, scale) => {
    var page = await pageRender.getPDFPage();
    return await page.getDeviceRect(rect, scale || pageRender.getScale());
  },
};
