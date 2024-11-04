export const msg_click_element = (selector) => `Clicked on element ${selector}`;
export const msg_verify_element = (selector) => `Verified on element ${selector}`;
export const msg_visible_element = (selector) => `This element is visible: ${selector}`;
export const msg_fill_data = (selector) => `Filled data into ${selector}`;

export const exception_error_click_element = (selector, error) => `Error clicking element ${selector}: ${error.message}`;
export const exception_error_verify_element = (selector, error) => `Error checking visibility for ${selector}: ${error.message}`;
export const exception_error_visible_element = (selector, error) => `Error: Element visibility check for ${selector} failed: ${error.message}`;
export const exception_error_fill_data = (selector, error) => `Error filling data in ${selector}: ${error.message}`;
