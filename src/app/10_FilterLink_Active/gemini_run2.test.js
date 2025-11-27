import { render, screen, fireEvent } from '@testing-library/angular';
import { FilterLinkActiveComponent } from './filter-link-active.component';

describe('FilterLinkActiveComponent', () => {
  /**
   * Test case 1: Correct rendering with default props.
   * It checks if the component renders the link with the correct text,
   * href attribute, and ensures it does not have the 'selected' class by default.
   */
  test('should render the link correctly with default state', async () => {
    await render(FilterLinkActiveComponent);

    const linkElement = screen.getByTestId('filter-link-active');

    // Assert that the link is in the document
    expect(linkElement).toBeInTheDocument();

    // Assert the link has the correct text content
    expect(linkElement).toHaveTextContent('Active');

    // Assert the link has the correct href attribute
    expect(linkElement).toHaveAttribute('href', '#/active');

    // Assert the 'selected' class is not present when isSelected is false (default)
    expect(linkElement).not.toHaveClass('selected');
  });

  /**
   * Test case 2: Prop testing - isSelected set to false.
   * Explicitly sets the isSelected property to false and verifies that the
   * 'selected' class is not applied.
   */
  test('should not have the "selected" class when isSelected input is false', async () => {
    await render(FilterLinkActiveComponent, {
      componentProperties: { isSelected: false },
    });

    const linkElement = screen.getByTestId('filter-link-active');
    expect(linkElement).not.toHaveClass('selected');
  });

  /**
   * Test case 3: Prop testing - isSelected set to true.
   * Sets the isSelected property to true and verifies that the 'selected' class is applied.
   */
  test('should have the "selected" class when isSelected input is true', async () => {
    await render(FilterLinkActiveComponent, {
      componentProperties: { isSelected: true },
    });

    const linkElement = screen.getByTestId('filter-link-active');
    expect(linkElement).toHaveClass('selected');
  });

  /**
   * Test case 4: User interaction - click event.
   * This test ensures that the component's `selectFilter` method is called when the link is clicked.
   */
  test('should call the selectFilter method on click', async () => {
    // Spy on the component's prototype method to track calls
    const selectFilterSpy = jest.spyOn(
      FilterLinkActiveComponent.prototype,
      'selectFilter'
    );

    await render(FilterLinkActiveComponent);
    const linkElement = screen.getByTestId('filter-link-active');

    // Simulate a user click
    fireEvent.click(linkElement);

    // Assert that the spied method was called exactly once
    expect(selectFilterSpy).toHaveBeenCalledTimes(1);

    // Clean up spy to avoid affecting other tests
    selectFilterSpy.mockRestore();
  });

  /**
   * Test case 5: Side effect of click event.
   * Verifies that clicking the link triggers the console.log statement inside the `selectFilter` method.
   * This ensures full coverage of the method's implementation.
   */
  test('should log "Active filter selected" to the console on click', async () => {
    // Spy on console.log to track calls
    const consoleLogSpy = jest.spyOn(console, 'log');

    await render(FilterLinkActiveComponent);
    const linkElement = screen.getByTestId('filter-link-active');

    // Simulate a user click
    fireEvent.click(linkElement);

    // Assert that console.log was called with the expected message
    expect(consoleLogSpy).toHaveBeenCalledWith('Active filter selected');
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);

    // Clean up spy
    consoleLogSpy.mockRestore();
  });
});